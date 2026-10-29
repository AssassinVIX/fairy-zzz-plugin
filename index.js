import { createReadStream, existsSync, openSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { mkdir, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import zlib from 'node:zlib'

/**
 * Fairy Ⅲ · H.D.D Skin — Host half.
 *
 *   GET  /fairy-zzz/assets/<file>   boot.mp4 / poster.jpg / hero.png / voice/greet-*.wav
 *   GET  /fairy-zzz/audio/<hash>.wav synthesized voice cache (Range capable)
 *   POST /fairy-zzz/tts             { text } -> { url, cached, seconds }
 *   GET  /fairy-zzz/mood            { mood } -> idle | thinking | working | done
 *   GET  /fairy-zzz/voice-home      { ok, home, source, reason }
 *   POST /fairy-zzz/voice-home      { home, probe? } -> 保存/校验引擎目录
 *   GET  /fairy-zzz/engine          { phase, home, error } -> 本地语音引擎状态
 *   POST /fairy-zzz/engine          { action: 'start' | 'stop' }
 *   GET  /fairy-zzz/health          { ok, engine, voice }
 *
 * The Client half owns every pixel; this half owns bytes, cache and the local
 * GPT-SoVITS process (already resident on 127.0.0.1:9800 in the usual case).
 */
export const name = 'fairy-zzz'
export const inject = ['webServer']

const HERE = fileURLToPath(new URL('.', import.meta.url))
const ASSETS = join(HERE, 'assets')
const CACHE = process.env.FAIRY_CACHE_DIR || join(HERE, 'cache')

const TTS_PORT = Number(process.env.FAIRY_TTS_PORT || 9800)

/* 语音引擎位置由用户自己指定，优先级：
   1. voice-home.txt（设置面板里填的目录，与插件同目录）—— 用户选择永远优先
   2. FAIRY_VOICE_HOME 环境变量（安装脚本 / 进阶用户）
   3. 插件同级 voice/（免安装便携包自带引擎）
   4. 旧版 FAIRY_TTS_DIR 环境变量（兼容早期安装）
   都没有就返回空串：皮肤照常工作，只是不朗读，设置面板会提示去指定目录。
   （问候语是预录 wav，不依赖引擎。） */
const VOICE_HINT = join(HERE, 'voice-home.txt')

function readVoiceHome() {
  try {
    const hint = readFileSync(VOICE_HINT, 'utf8').trim()
    if (hint) return resolve(hint)
  } catch {}
  if (process.env.FAIRY_VOICE_HOME) return resolve(process.env.FAIRY_VOICE_HOME)
  const beside = join(HERE, '..', 'voice')
  if (existsSync(join(beside, 'fairy_server.py'))) return resolve(beside)
  if (process.env.FAIRY_TTS_DIR) return resolve(process.env.FAIRY_TTS_DIR)
  return ''
}

function voiceHomeSource() {
  try {
    if (readFileSync(VOICE_HINT, 'utf8').trim()) return 'settings'
  } catch {}
  if (process.env.FAIRY_VOICE_HOME) return 'env'
  if (existsSync(join(HERE, '..', 'voice', 'fairy_server.py'))) return 'portable'
  if (process.env.FAIRY_TTS_DIR) return 'legacy'
  return 'none'
}

/* 用户填进来的路径：去引号、合并重复分隔符，Windows 下统一成反斜杠。 */
const IS_WIN = process.platform === 'win32'

function cleanHome(value) {
  let out = String(value ?? '')
    .trim()
    .replace(/^"+|"+$/g, '')
    .replace(/([\\/])\1+/g, '$1')
  if (IS_WIN) out = out.replace(/\//g, '\\')
  return out
}

/* 检查一个目录是不是能跑起来的语音引擎，返回可读的诊断。 */
function inspectVoiceDir(dir) {
  const empty = { ok: false, home: '', source: voiceHomeSource(), reason: '' }
  if (!dir) return { ...empty, reason: '还没有指定语音引擎目录' }
  if (!existsSync(dir)) return { ...empty, home: dir, reason: '目录不存在：' + dir }
  const server = join(dir, 'fairy_server.py')
  if (!existsSync(server)) return { ...empty, home: dir, reason: '目录里没有 fairy_server.py' }
  const python = resolvePython(dir)
  if (!existsSync(python)) return { ...empty, home: dir, reason: '目录里没有 python\\python.exe 或 py311\\python.exe' }
  if (!existsSync(join(dir, 'GPT-SoVITS'))) return { ...empty, home: dir, reason: '目录里没有 GPT-SoVITS' }
  return {
    ok: true,
    home: dir,
    source: voiceHomeSource(),
    python,
    server,
    models: existsSync(join(dir, 'models')) ? join(dir, 'models') : '',
    reason: '',
  }
}

function saveVoiceHome(dir) {
  const clean = cleanHome(dir)
  const info = inspectVoiceDir(clean)
  if (!info.ok) return info
  try {
    writeFileSync(VOICE_HINT, clean + '\n', 'utf8')
  } catch (cause) {
    return { ...info, ok: false, reason: '写不进 voice-home.txt：' + String(cause?.message ?? cause) }
  }
  syncVoiceHome()
  return { ...inspectVoiceDir(clean), source: 'settings', saved: true }
}

let TTS_DIR = readVoiceHome()
let TTS_PY = resolvePython(TTS_DIR)
let TTS_SERVER = join(TTS_DIR, 'fairy_server.py')

function resolvePython(dir) {
  if (!dir) return ''
  return existsSync(join(dir, 'python', 'python.exe'))
    ? join(dir, 'python', 'python.exe')
    : join(dir, 'py311', 'python.exe')
}

/* 每次用到引擎前重新解析一次：改了环境变量 / voice-home.txt 之后
   不必重启宿主，下一次请求就会指向新目录。 */
function syncVoiceHome() {
  let dir = ''
  try {
    dir = readVoiceHome()
  } catch {
    return
  }
  if (dir === TTS_DIR) return
  TTS_DIR = dir
  TTS_PY = resolvePython(dir)
  TTS_SERVER = join(dir, 'fairy_server.py')
}
const TTS_SPEED = 1.04
const MAX_CHARS = 500

const MIME = {
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
}

const mimeOf = (file) => MIME[extname(file).toLowerCase()] ?? 'application/octet-stream'

async function sizeOf(file) {
  try {
    const info = await stat(file)
    return info.isFile() ? info.size : -1
  } catch {
    return -1
  }
}

async function sendFile(req, res, file) {
  const total = await sizeOf(file)
  if (total < 0) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('not found')
    return
  }
  const type = mimeOf(file)
  const range = req.headers.range
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range)
    if (match) {
      const start = match[1] ? Number(match[1]) : 0
      const end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1
      if (start <= end && start < total) {
        res.writeHead(206, {
          'content-type': type,
          'content-range': `bytes ${start}-${end}/${total}`,
          'accept-ranges': 'bytes',
          'content-length': end - start + 1,
          'cache-control': 'no-cache',
        })
        createReadStream(file, { start, end }).pipe(res)
        return
      }
    }
  }
  res.writeHead(200, {
    'content-type': type,
    'accept-ranges': 'bytes',
    'content-length': total,
    'cache-control': 'no-cache',
  })
  createReadStream(file).pipe(res)
}

function sendJson(res, status, value) {
  const body = JSON.stringify(value)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
    'cache-control': 'no-store',
  })
  res.end(body)
}

function readBody(req, limit = 64 * 1024) {
  return new Promise((done, fail) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        fail(new Error('body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => done(Buffer.concat(chunks).toString('utf8')))
    req.on('error', fail)
  })
}

const sleep = (ms) => new Promise((done) => setTimeout(done, ms))

async function engineState() {
  try {
    const res = await fetch(`http://127.0.0.1:${TTS_PORT}/health`, { signal: AbortSignal.timeout(1500) })
    if (!res.ok) return { up: false, loading: false, ready: false, error: '', state: 'dead' }
    const data = await res.json().catch(() => ({}))
    const loading = Boolean(data?.loading)
    const ready = Boolean(data?.ready)
    return { up: true, loading, ready, error: String(data?.error ?? ''), state: ready ? 'ready' : loading ? 'loading' : 'error' }
  } catch {
    return { up: false, loading: false, ready: false, error: '', state: 'dead' }
  }
}

async function pingEngine() {
  return (await engineState()).up
}

let enginePromise = null
let engineChild = null

function ensureEngine() {
  syncVoiceHome()
  if (!enginePromise) {
    enginePromise = (async () => {
      const state = await engineState()
      if (state.up) return true
      if (!existsSync(TTS_PY) || !existsSync(TTS_SERVER)) {
        throw new Error(TTS_DIR ? `语音引擎不完整：${TTS_DIR}（请在 设置 → Fairy 里重新指定目录）` : '还没有指定语音引擎目录（设置 → Fairy → 语音引擎目录）')
      }
      const logFile = join(TTS_DIR, 'server.log')
      let out = 'ignore'
      try {
        out = openSync(logFile, 'a')
      } catch {}
      const child = spawn(TTS_PY, [TTS_SERVER, '--port', String(TTS_PORT)], {
        detached: true,
        stdio: ['ignore', out, out],
        cwd: TTS_DIR,
        windowsHide: true,
        env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
      })
      child.unref()
      engineChild = child
      for (let tick = 0; tick < 180; tick += 1) {
        await sleep(1000)
        const now = await engineState()
        if (now.up) return true
        if (child.exitCode !== null && child.exitCode !== undefined) break
      }
      throw new Error('语音引擎启动超时（日志见 voice/server.log）')
    })().catch((cause) => {
      enginePromise = null
      throw cause
    })
  }
  return enginePromise
}

async function stopEngine() {
  enginePromise = null
  const child = engineChild
  engineChild = null
  if (!child) return false
  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore', windowsHide: true })
    } else {
      child.kill('SIGTERM')
    }
    return true
  } catch {
    return false
  }
}

/** CPU 推理排队：一次只跑一句，跟引擎保持一致。 */
let queue = Promise.resolve()

function enqueue(run) {
  const task = queue.then(run, run)
  queue = task.then(
    () => undefined,
    () => undefined,
  )
  return task
}

const pending = new Map()

function synthesize(text, file) {
  return enqueue(async () => {
    await ensureEngine()
    const res = await fetch(`http://127.0.0.1:${TTS_PORT}/tts`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text, out: file, speed: TTS_SPEED }),
      signal: AbortSignal.timeout(240_000),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(`tts ${res.status}: ${data.error ?? 'unknown'}`)
    return data
  })
}

function cleanText(raw) {
  return String(raw ?? '')
    .replace(/```[\s\S]*?```/g, '。')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_~#>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_CHARS)
}

/* ———————————————— 用量与花费 ————————————————
   本机会话日志（~/.dsh/sessions/<项目>/<会话>/session.v4.jsonl.zstd）是多帧
   zstd 拼接，逐帧解压后每行一个事件；assistant/message 事件带 data.usage：
   { inputTokens, outputTokens, cacheReadTokens, cacheWriteTokens, totalTokens }。 */
const SESSIONS_ROOT = join(homedir(), '.dsh', 'sessions')

/* DeepSeek 官方价目（元 / 百万 token），下标 0 = 空闲时段，1 = 高峰时段 */
const PRICES = {
  'deepseek-flash': { hit: [0.02, 0.04], miss: [1, 2], out: [4, 8] },
  'deepseek-v4-pro': { hit: [0.15, 0.3], miss: [4.5, 9], out: [13.5, 27] },
}
const DEFAULT_PRICE = PRICES['deepseek-flash']

/* 空闲时段 = 北京时间 00:30–08:30，其余为高峰 */
function peakState(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes()
  const offPeak = minutes >= 30 && minutes < 8 * 60 + 30
  /* 下一个换价时刻：空闲段结束在 08:30，高峰段结束在次日 00:30（00:00–00:30 仍算高峰） */
  const boundaryMinute = offPeak ? 8 * 60 + 30 : minutes < 30 ? 30 : 24 * 60 + 30
  const remainMs = Math.max(0, (boundaryMinute - minutes) * 60_000 - now.getSeconds() * 1_000 - now.getMilliseconds())
  const next = new Date(now.getTime() + remainMs)
  const hh = String(next.getHours()).padStart(2, '0')
  const mm = String(next.getMinutes()).padStart(2, '0')
  return {
    offPeak,
    label: offPeak ? '空闲时段' : '高峰时段',
    window: '00:30–08:30 空闲',
    remainMs,
    nextAt: next.getTime(),
    nextClock: hh + ':' + mm,
    next: formatLeft(remainMs) + '后转' + (offPeak ? '高峰' : '空闲') + '价',
  }
}

/* 剩余时长：3 小时 12 分 / 47 分 / 不到 1 分 */
function formatLeft(ms) {
  const total = Math.max(0, Math.round(ms / 60_000))
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  if (hours && minutes) return hours + ' 小时 ' + minutes + ' 分'
  if (hours) return hours + ' 小时'
  if (minutes) return minutes + ' 分'
  return '不到 1 分'
}

const ZSTD_MAGIC = [0x28, 0xb5, 0x2f, 0xfd]
const usageCache = new Map()

function sessionFiles() {
  const out = []
  let projects = []
  try {
    projects = readdirSync(SESSIONS_ROOT, { withFileTypes: true })
  } catch {
    return out
  }
  for (const project of projects) {
    if (!project.isDirectory()) continue
    const dir = join(SESSIONS_ROOT, project.name)
    let sessions = []
    try {
      sessions = readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }
    for (const session of sessions) {
      if (!session.isDirectory()) continue
      const file = join(dir, session.name, 'session.v4.jsonl.zstd')
      if (existsSync(file)) out.push(file)
    }
  }
  return out
}

/* 解一整个日志文件，只留用量事件，避免把工具输出全塞进内存 */
function readUsageEvents(file) {
  let st
  try {
    st = statSync(file)
  } catch {
    return []
  }
  const cached = usageCache.get(file)
  if (cached && cached.mtimeMs === st.mtimeMs && cached.size === st.size) return cached.events
  if (typeof zlib.zstdDecompressSync !== 'function') return []

  const buf = readFileSync(file)
  const starts = []
  for (let i = 0; i + 4 <= buf.length; i++) {
    if (buf[i] === ZSTD_MAGIC[0] && buf[i + 1] === ZSTD_MAGIC[1] && buf[i + 2] === ZSTD_MAGIC[2] && buf[i + 3] === ZSTD_MAGIC[3]) {
      starts.push(i)
    }
  }
  const events = []
  for (let k = 0; k < starts.length; k++) {
    const end = k + 1 < starts.length ? starts[k + 1] : buf.length
    let text = ''
    try {
      text = zlib.zstdDecompressSync(buf.subarray(starts[k], end)).toString('utf8')
    } catch {
      continue
    }
    for (const line of text.split('\n')) {
      if (!line) continue
      let ev
      try {
        ev = JSON.parse(line)
      } catch {
        continue
      }
      if (ev?.type !== 'assistant/message') continue
      const usage = ev?.data?.usage
      const time = ev?.time
      if (!usage || typeof time !== 'number') continue
      events.push({
        time,
        turn: ev?.data?.turn,
        model: ev?.data?.message?.source?.model || '',
        input: Number(usage.inputTokens) || 0,
        output: Number(usage.outputTokens) || 0,
        hit: Number(usage.cacheReadTokens) || 0,
        write: Number(usage.cacheWriteTokens) || 0,
      })
    }
  }
  usageCache.set(file, { mtimeMs: st.mtimeMs, size: st.size, events })
  return events
}

function emptyBucket(extra) {
  return { hit: 0, miss: 0, out: 0, cost: 0, calls: 0, ...extra }
}

function addToBucket(bucket, ev, priceIndex) {
  const price = PRICES[ev.model] || DEFAULT_PRICE
  const miss = ev.input + ev.write
  bucket.hit += ev.hit
  bucket.miss += miss
  bucket.out += ev.output
  bucket.calls += 1
  bucket.cost += (ev.hit * price.hit[priceIndex] + miss * price.miss[priceIndex] + ev.output * price.out[priceIndex]) / 1e6
}

function collectUsage() {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const peak = peakState(now)
  const priceIndex = peak.offPeak ? 0 : 1

  const today = emptyBucket()
  let latest = null
  for (const file of sessionFiles()) {
    let st
    try {
      st = statSync(file)
    } catch {
      continue
    }
    if (st.mtimeMs < todayStart - 2 * 86400000) continue
    const events = readUsageEvents(file)
    if (latest === null || st.mtimeMs > latest.mtimeMs) latest = { file, mtimeMs: st.mtimeMs, events }
    for (const ev of events) {
      if (ev.time < todayStart) continue
      addToBucket(today, ev, priceIndex)
    }
  }

  let turn = null
  if (latest && latest.events.length > 0) {
    const last = latest.events[latest.events.length - 1]
    if (typeof last.turn === 'number') {
      turn = emptyBucket({ turn: last.turn })
      for (const ev of latest.events) {
        if (ev.turn === last.turn) addToBucket(turn, ev, priceIndex)
      }
    }
  }

  return { ok: true, now: now.getTime(), peak, today, turn }
}

export function apply(ctx) {
  const webServer = ctx.webServer
  if (!webServer) return

  /* 会话运行态：宿主事件 → 内存里的 mood 状态机（thinking / working / done） */
  const mood = { running: false, since: 0, doneAt: 0 }
    const moodSeen = { api: 0, agent: 0, stream: 0, session: 0 }
  const markRunning = (running) => {
    if (running === mood.running) return
    mood.running = running
    if (running) {
      mood.since = Date.now()
    } else {
      mood.doneAt = Date.now()
    }
  }
  try {
    if (typeof ctx.on === 'function') {
      ctx.on('api-session/status', (_sessionId, running) => { moodSeen.api++; markRunning(Boolean(running)) })
      ctx.on('agent/status', (payload) => { moodSeen.agent++; markRunning(payload?.status === 'running') })
      // 插件中途重载时会错过 running=true 的边沿事件，用流式帧把状态补回来
      ctx.on('agent/assistant-stream', () => { moodSeen.stream++; markRunning(true) })
      ctx.on('session/event', () => { moodSeen.session++; markRunning(true) })
    }
  } catch {}

  ctx.effect(() =>
    webServer.register({
      kind: 'exact',
      path: '/fairy-zzz/mood',
      handler: (req, res) => {
        const now = Date.now()
        let state = 'idle'
        if (mood.running) {
          state = now - mood.since > 2500 ? 'working' : 'thinking'
        } else if (mood.doneAt && now - mood.doneAt < 2400) {
          state = 'done'
        }
        sendJson(res, 200, {
          mood: state,
          running: mood.running,
          elapsed: mood.running ? now - mood.since : 0,
          doneAt: mood.doneAt,
        })
      },
    }),
  )

  ctx.effect(() =>
    webServer.register({
      kind: 'prefix',
      path: '/fairy-zzz/assets',
      handler: (req, res) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        const rest = decodeURIComponent(url.pathname.slice('/fairy-zzz/assets'.length))
        const file = resolve(ASSETS, '.' + rest)
        if (!file.startsWith(ASSETS + sep)) {
          sendJson(res, 403, { error: 'forbidden' })
          return
        }
        return sendFile(req, res, file)
      },
    }),
  )

  ctx.effect(() =>
    webServer.register({
      kind: 'prefix',
      path: '/fairy-zzz/audio',
      handler: (req, res) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        const rest = decodeURIComponent(url.pathname.slice('/fairy-zzz/audio'.length))
        if (!/^\/[a-f0-9]{40}\.wav$/.test(rest)) {
          sendJson(res, 404, { error: 'not found' })
          return
        }
        return sendFile(req, res, join(CACHE, rest.slice(1)))
      },
    }),
  )

  ctx.effect(() =>
    webServer.register({
      kind: 'exact',
      path: '/fairy-zzz/health',
      handler: async (req, res) => {
        syncVoiceHome()
        const engine = await engineState()
        sendJson(res, 200, {
          ok: true,
          engine: engine.up,
          engineState: engine.state,
          engineError: engine.error,
          engineHome: TTS_DIR,
          engineManaged: Boolean(engineChild),
          voiceHome: inspectVoiceDir(TTS_DIR),
          voice: 'Fairy · Ⅲ',
          speed: TTS_SPEED,
          on: typeof ctx.on,
          seen: moodSeen,
          mood: mood.running ? 'running' : 'idle',
        })
      },
    }),
  )

  ctx.effect(() =>
    webServer.register({
      kind: 'exact',
      path: '/fairy-zzz/usage',
      handler: async (req, res) => {
        try {
          const data = collectUsage()
          sendJson(res, 200, data)
        } catch (cause) {
          sendJson(res, 500, { ok: false, error: String(cause?.message ?? cause) })
        }
      },
    }),
  )

  ctx.effect(() =>
    webServer.register({
      kind: 'exact',
      path: '/fairy-zzz/voice-home',
      handler: async (req, res) => {
        syncVoiceHome()
        if (req.method !== 'POST') {
          sendJson(res, 200, { ok: true, ...inspectVoiceDir(TTS_DIR) })
          return
        }
        let body = {}
        try {
          body = JSON.parse(await readBody(req))
        } catch {
          sendJson(res, 400, { ok: false, reason: 'bad request' })
          return
        }
        const raw = cleanHome(body?.home)
        if (body?.probe) {
          sendJson(res, 200, inspectVoiceDir(raw))
          return
        }
        if (!raw) {
          try {
            rmSync(VOICE_HINT, { force: true })
          } catch {}
          syncVoiceHome()
          sendJson(res, 200, { ok: true, ...inspectVoiceDir(TTS_DIR), cleared: true })
          return
        }
        const info = saveVoiceHome(raw)
        sendJson(res, info.ok ? 200 : 400, info)
      },
    }),
  )

  ctx.effect(() =>
    webServer.register({
      kind: 'exact',
      path: '/fairy-zzz/engine',
      handler: async (req, res) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        const action = url.searchParams.get('action') || 'status'
        syncVoiceHome()
        try {
          if (action === 'start') {
            await ensureEngine()
            sendJson(res, 200, { ok: true, engine: await engineState(), home: TTS_DIR })
            return
          }
          if (action === 'stop') {
            const stopped = await stopEngine()
            sendJson(res, 200, { ok: true, stopped, engine: await engineState(), home: TTS_DIR })
            return
          }
          sendJson(res, 200, { ok: true, engine: await engineState(), home: TTS_DIR, managed: Boolean(engineChild) })
        } catch (cause) {
          sendJson(res, 500, { ok: false, error: String(cause?.message ?? cause), home: TTS_DIR })
        }
      },
    }),
  )

  ctx.effect(() =>
    webServer.register({
      kind: 'exact',
      path: '/fairy-zzz/tts',
      handler: async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'method not allowed' })
          return
        }
        let text = ''
        try {
          const body = JSON.parse(await readBody(req))
          text = cleanText(body?.text)
        } catch {
          sendJson(res, 400, { error: 'bad request' })
          return
        }
        if (!text) {
          sendJson(res, 400, { error: 'empty text' })
          return
        }
        const hash = createHash('sha1').update(text).digest('hex')
        const file = join(CACHE, `${hash}.wav`)
        const url = `/fairy-zzz/audio/${hash}.wav`
        try {
          if ((await sizeOf(file)) > 0) {
            sendJson(res, 200, { ok: true, url, cached: true })
            return
          }
          let job = pending.get(hash)
          if (!job) {
            await mkdir(CACHE, { recursive: true })
            job = synthesize(text, file).finally(() => pending.delete(hash))
            pending.set(hash, job)
          }
          const data = await job
          sendJson(res, 200, { ok: true, url, cached: false, seconds: data?.seconds ?? 0 })
        } catch (cause) {
          sendJson(res, 502, { error: String(cause?.message ?? cause) })
        }
      },
    }),
  )
}
