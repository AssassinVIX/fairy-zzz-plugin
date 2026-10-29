window.__ModuleLoader__.load({
  id: 'dsh-fairy-zzz',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useCallback, useEffect, useRef, useState } = React

    const NS = 'fairy-zzz'
    const PKG = 'dsh-fairy-zzz'
    const VOICE_KEY = 'fairy.zzz.voice'
    const SEEN_KEY = 'fairy.zzz.seen'
    const DRAG_KEY = 'fairy.zzz.drag'
    const POS_KEY = 'fairy.zzz.dock-pos'
    const greetSlot = () => {
      const hh = new Date().getHours()
      if (hh >= 5 && hh < 11) return 'morning'
      if (hh >= 11 && hh < 14) return 'noon'
      if (hh >= 14 && hh < 18) return 'afternoon'
      if (hh >= 18 && hh < 23) return 'evening'
      return 'night'
    }
    const GREETING = () => '/fairy-zzz/assets/voice/greet-' + greetSlot() + '.wav'

    /* Fairy 眼睛：Apache-2.0，改编自 Fairy-DSH（见 NOTICE-fairy-dsh.md） */
    const FAIRY_EYE_SVG = `<!-- SPDX-License-Identifier: Apache-2.0 Adapted from Fairy-DSH, Copyright 2026 Chengzhibense. Source commit d639887a386b0de6fef2e61c97dc268631854591: mascot-geometry.js / mascot-eye-svg.js (see ../NOTICE). MODIFIED for pi-fairy-animation: standalone SVG, padded canvas, named offline animation anchors, white outer halo in both themes, separate contrast edge; browser effects, states, scanlines and glitch clones removed. Generated PNGs and vector previews inherit this attribution; see ../NOTICE. --> <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="-1 -1 162 162"> <title>Fairy — selective Fairy-DSH idle adaptation (unofficial)</title> <desc>Transparent floating blue eye, white soft halos, rotating corners, independently breathing eye layers and a lower-right catchlight. No official bitmap.</desc> <defs> <linearGradient id="outer-gradient" x1=".2" y1="0" x2=".8" y2="1"> <stop stop-color="#3145d6"/> <stop offset=".54" stop-color="#2233b2"/> <stop offset="1" stop-color="#2b3cbc"/> </linearGradient> <!-- One static radial field replaces separate halo strokes, avoiding alpha seams. --> <radialGradient id="sclera-halo-gradient" gradientUnits="userSpaceOnUse" cx="80" cy="80" r="56" color-interpolation="linearRGB"> <stop offset=".82" stop-color="#ffffff" stop-opacity="0"/> <stop offset=".864" stop-color="#ffffff" stop-opacity=".22"/> <stop offset=".875" stop-color="#ffffff" stop-opacity=".28"/> <stop offset=".89" stop-color="#ffffff" stop-opacity=".19"/> <stop offset=".91" stop-color="#ffffff" stop-opacity=".11"/> <stop offset=".94" stop-color="#ffffff" stop-opacity=".07"/> <stop offset=".96" stop-color="#ffffff" stop-opacity=".035"/> <stop offset="1" stop-color="#ffffff" stop-opacity="0"/> </radialGradient> <radialGradient id="outer-halo-gradient" gradientUnits="userSpaceOnUse" cx="80" cy="80" r="79" color-interpolation="linearRGB"> <stop offset=".80" stop-color="#ffffff" stop-opacity="0"/> <stop offset=".84" stop-color="#ffffff" stop-opacity=".10"/> <stop offset=".868" stop-color="#ffffff" stop-opacity=".28"/> <stop offset=".90" stop-color="#ffffff" stop-opacity=".18"/> <stop offset=".95" stop-color="#ffffff" stop-opacity=".06"/> <stop offset=".99" stop-color="#ffffff" stop-opacity=".02"/> <stop offset="1" stop-color="#ffffff" stop-opacity="0"/> </radialGradient> <radialGradient id="highlight-halo-gradient" gradientUnits="userSpaceOnUse" cx="98" cy="100.5" r="18" color-interpolation="linearRGB"> <stop offset=".53" stop-color="#f5f8fd" stop-opacity="0"/> <stop offset=".56" stop-color="#f5f8fd" stop-opacity=".16"/> <stop offset=".611" stop-color="#f5f8fd" stop-opacity=".43"/> <stop offset=".72" stop-color="#f5f8fd" stop-opacity=".19"/> <stop offset=".77" stop-color="#f5f8fd" stop-opacity=".12"/> <stop offset=".83" stop-color="#f5f8fd" stop-opacity=".055"/> <stop offset=".89" stop-color="#f5f8fd" stop-opacity=".02"/> <stop offset=".96" stop-color="#f5f8fd" stop-opacity=".004"/> <stop offset="1" stop-color="#f5f8fd" stop-opacity="0"/> </radialGradient> <clipPath id="fz3-lid-cover-clip"><circle cx="80" cy="80" r="56"/></clipPath> </defs> <!-- 79-unit halo within an 81-unit half-canvas: padding with near-original apparent disc size. --> <g id="fairy"> <circle id="outer-halo" cx="80" cy="80" r="79" fill="url(#outer-halo-gradient)"/> <!-- Only this supporting edge changes with theme; white rim and halo stay white. --> <circle id="contrast-edge" cx="80" cy="80" r="68" fill="none" stroke="#dceaff" stroke-width="1.8"/> <circle id="outer-disc" cx="80" cy="80" r="68" fill="url(#outer-gradient)" stroke="#f2fbff" stroke-width="1.2"/> <g id="corners" transform="rotate(0 80 80)" fill="#1f2573"> <circle cx="80" cy="80" r="51.75"/> <rect x="37" y="37" width="86" height="86" rx="2" transform="rotate(3 80 80)"/> </g> <g id="eye-anatomy"><g id="sclera" transform="translate(80 80) scale(1) translate(-80 -80)"> <circle cx="80" cy="80" r="48" fill="#eef0f5"/> <circle id="sclera-halo" cx="80" cy="80" r="56" fill="url(#sclera-halo-gradient)"/> <circle cx="80" cy="80" r="48" fill="none" stroke="#ffffff" stroke-width=".8" stroke-opacity=".16"/> </g> <g id="iris-outer" transform="translate(80 80) scale(1) translate(-80 -80)"> <circle cx="80" cy="80" r="33" fill="#9daee0"/> </g> <g id="iris-blue" transform="translate(80 80) scale(1) translate(-80 -80)"> <circle cx="80" cy="80" r="24.15" fill="#eef0f5"/> <circle cx="80" cy="80" r="23.5" fill="#2f74c9"/> </g> <g id="pupil" transform="translate(80 80) scale(1) translate(-80 -80)"> <circle cx="80" cy="80" r="16.6" fill="none" stroke="#f5f8fd" stroke-width=".1"/> <circle cx="80" cy="80" r="16" fill="#2e2f78"/> </g> <!-- Same phase as blue iris, but painted last (above pupil), as in upstream. --> <g id="highlight" transform="translate(80 80) scale(1) translate(-80 -80)"> <circle id="highlight-halo" cx="98" cy="100.5" r="18" fill="url(#highlight-halo-gradient)"/> <circle id="catchlight-lower-right" cx="98" cy="100.5" r="11" fill="#f5f8fd"/> </g> </g> <g id="fz3-lid-cover" clip-path="url(#fz3-lid-cover-clip)"><path class="fz3-lid-shape" d="M20 60 Q80 90 140 60 V-40 H20 Z" fill="#1f2573"/></g> </g> </svg> `

    /* ------------------------------------------------------------------ *
     * ———————————— */
    const ZH = {
      'boot.kicker': 'H.D.D // BOOT SEQUENCE',
      'boot.version': 'FAIRY.OS 3.01',
      'boot.title': 'Ⅲ型总序式集成泛用人工智能',
      'boot.check1': 'CORE LINK',
      'boot.check2': 'VOICE MODULE',
      'boot.check3': 'HDD INTERFACE',
      'boot.skip': 'SKIP',
      'greet.kicker': 'H.D.D CORE // ONLINE',
      'greet.1': '主人，Fairy 已就位。',
      'greet.2': 'H.D.D 全链路自检通过，语音模块在线。',
      'greet.3': '今天的烂摊子，也请交给本系统。',
      'greet.sub': 'Ⅲ型总序式集成泛用人工智能 · VOICE LINK ACTIVE',
      'greet.tap': '点击任意处唤起声音',
      'dock.tag': 'FAIRY Ⅲ',
      'dock.tagsub': 'H.D.D / B4',
      'dock.title': 'FAIRY Ⅲ // H.D.D CORE',
      'dock.sub': 'Ⅲ型总序式集成泛用人工智能',
      'dock.autoVoice': '自动语音',
      'dock.engine': '语音引擎',
      'dock.ready': '就绪',
      'dock.idle': '待机',
      'dock.busy': '合成中',
      'dock.speaking': '发声',
      'dock.replayGreet': '重播问候',
      'dock.replayBoot': '重新开机',
      'dock.stop': '停止发声',
      'dock.test': '试听一句',
      'dock.foot': 'GPT-SoVITS · Fairy_e10_s870',
      'dock.error': '语音链路异常',
    }
    const EN = {
      'boot.kicker': 'H.D.D // BOOT SEQUENCE',
      'boot.version': 'FAIRY.OS 3.01',
      'boot.title': 'III-Type Omnibus Integrated General-Purpose AI',
      'boot.check1': 'CORE LINK',
      'boot.check2': 'VOICE MODULE',
      'boot.check3': 'HDD INTERFACE',
      'boot.skip': 'SKIP',
      'greet.kicker': 'H.D.D CORE // ONLINE',
      'greet.1': 'Master. Fairy is online.',
      'greet.2': 'H.D.D self-check passed. Voice module linked.',
      'greet.3': 'Your mess, as always, is mine to clean.',
      'greet.sub': 'III-Type Omnibus Integrated AI · VOICE LINK ACTIVE',
      'greet.tap': 'Tap anywhere to wake her voice',
      'dock.tag': 'FAIRY Ⅲ',
      'dock.tagsub': 'H.D.D',
      'dock.title': 'FAIRY Ⅲ // H.D.D CORE',
      'dock.sub': 'III-Type Omnibus Integrated General-Purpose AI',
      'dock.autoVoice': 'Auto voice',
      'dock.engine': 'Voice engine',
      'dock.ready': 'ready',
      'dock.idle': 'idle',
      'dock.busy': 'synth',
      'dock.speaking': 'speaking',
      'dock.replayGreet': 'Replay greeting',
      'dock.replayBoot': 'Reboot',
      'dock.stop': 'Stop',
      'dock.test': 'Test voice',
      'dock.foot': 'GPT-SoVITS · Fairy_e10_s870',
      'dock.error': 'voice link error',
    }
    let tr = null
    const t = (key) => {
      try {
        if (tr) {
          const value = tr(key)
          if (value && value !== key) return value
        }
      } catch {}
      return ZH[key] ?? key
    }

    /* ------------------------------------------------------------------ *
     * 声音状态 */
    const voice = { enabled: readBool(VOICE_KEY, true), busy: false, speaking: false, error: '' }
    const listeners = new Set()
    const emit = () => {
      for (const fn of [...listeners]) {
        try {
          fn()
        } catch {}
      }
    }
    const patchVoice = (next) => {
      Object.assign(voice, next)
      emit()
    }
    const useVoice = () => {
      const [, bump] = useState(0)
      useEffect(() => {
        const fn = () => bump((n) => n + 1)
        listeners.add(fn)
        return () => {
          listeners.delete(fn)
        }
      }, [])
      return voice
    }

    let player = null
    let playSeq = 0
    let autoArmAt = Date.now() + 30_000

    const pausePlayer = () => {
      if (player) {
        try {
          player.pause()
        } catch {}
        player = null
      }
    }

    const stopSpeech = () => {
      playSeq += 1
      pausePlayer()
      patchVoice({ busy: false, speaking: false })
    }

    function playClip(url, token) {
      return new Promise((done) => {
        if (token !== playSeq) {
          done()
          return
        }
        const audio = new Audio(url)
        let settled = false
        const finish = () => {
          if (settled) return
          settled = true
          if (player === audio) player = null
          done()
        }
        player = audio
        audio.onended = finish
        audio.onerror = finish
        audio.onpause = () => {
          if (!audio.ended) finish()
        }
        audio
          .play()
          .then(() => {
            if (token === playSeq) patchVoice({ speaking: true, busy: false, error: '' })
          })
          .catch(() => {
            if (token === playSeq) patchVoice({ error: t('dock.error') })
            finish()
          })
        setTimeout(finish, 240_000)
      })
    }

    async function fetchVoice(text) {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 240_000)
      try {
        const res = await fetch('/fairy-zzz/tts', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok || !data.url) throw new Error(data.error || 'tts failed')
        return data.url
      } finally {
        clearTimeout(timer)
      }
    }

    function cleanSpeakable(raw) {
      return String(raw ?? '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]*`/g, '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/[*_~#>|]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 420)
    }

    function chunkText(text, maxLength = 90, maxChunks = 8) {
      const pieces = text.split(/(?<=[。！？；\n])/).map((s) => s.trim()).filter(Boolean)
      const chunks = []
      let buffer = ''
      for (const piece of pieces) {
        if ((buffer + piece).length > maxLength && buffer) {
          chunks.push(buffer)
          buffer = piece
        } else {
          buffer += piece
        }
        if (chunks.length >= maxChunks) break
      }
      if (buffer && chunks.length < maxChunks) chunks.push(buffer)
      const out = chunks.filter((s) => s.length > 0)
      return out.length ? out : [text.slice(0, maxLength)]
    }

    async function speakText(raw, options = {}) {
      const force = options.force === true
      const text = cleanSpeakable(raw)
      if (!text) return
      if (!force && !voice.enabled) return
      stopSpeech()
      const token = ++playSeq
      const chunks = chunkText(text)
      patchVoice({ busy: true, speaking: false, error: '' })
      let next = fetchVoice(chunks[0])
      for (let index = 0; index < chunks.length; index += 1) {
        let url
        try {
          url = await next
        } catch (cause) {
          if (token === playSeq) patchVoice({ busy: false, error: String(cause?.message || cause) })
          return
        }
        if (token !== playSeq) return
        if (index + 1 < chunks.length) next = fetchVoice(chunks[index + 1])
        patchVoice({ busy: false, speaking: true })
        await playClip(url, token)
        if (token !== playSeq) return
      }
      if (token === playSeq) patchVoice({ busy: false, speaking: false })
    }

    function readStored(key, fallback) {
      try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : fallback
      } catch {
        return fallback
      }
    }
    function readBool(key, fallback) {
      const value = readStored(key, fallback)
      return typeof value === 'boolean' ? value : fallback
    }
    function writeStored(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {}
    }

    /* ———————————————————— */
    function stripChrome(node) {
      const drop = 'pre, code, button, svg, [data-turn-tail], [data-turn-process], [data-turn-usage-details], [data-message-attachments]'
      node.querySelectorAll(drop).forEach((item) => item.remove())
      return (node.innerText || node.textContent || '').trim()
    }

    function readMessageText(el) {
      if (!el || typeof el.closest !== 'function') return ''
      /* 只念「这一轮的最终回复」：DSH 把每条消息渲染成同一个 flow 里的独立条目，
         正文不在 actions 所在的那个条目里，所以要按 data-chat-turn 找到同一轮的答案条目。 */
      const own = el.closest('[data-chat-turn]')
      const turnId = own ? own.getAttribute('data-chat-turn') : null
      const scope =
        el.closest('[data-slot="conversation.chat.flow"]') ||
        el.closest('[data-conversation-scroll]') ||
        document.body
      let answer = null
      let step = null
      let other = null
      const items = scope.querySelectorAll('[data-chat-turn]')
      for (const item of items) {
        if (turnId !== null && item.getAttribute('data-chat-turn') !== turnId) continue
        const kind = item.getAttribute('data-chat-flow-kind')
        if (item.hasAttribute('data-turn-process-answer')) answer = item
        if (kind === 'assistant-step') step = item
        else if (kind !== 'user' && kind !== 'turn-tail' && kind !== 'turn-process' && kind !== 'boundary' && !item.querySelector('[data-turn-tail]')) other = item
      }
      const target = answer || step || other
      if (target) {
        const text = stripChrome(target.cloneNode(true))
        if (text.length > 2) return text
      }
      const tail = el.closest('[data-turn-tail]')
      const local = tail && tail.parentElement ? tail.parentElement : null
      return local ? stripChrome(local.cloneNode(true)) : ''
    }

    const seen = new Set(readStored(SEEN_KEY, []))
    const saveSeen = () => {
      try {
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seen].slice(-400)))
      } catch {}
    }
    let lastMountAt = 0
    function autoRead(el, messageId) {
      if (!el || !messageId) return
      const now = Date.now()
      const gap = now - lastMountAt
      lastMountAt = now
      if (seen.has(messageId)) return
      seen.add(messageId)
      saveSeen()
      if (now < autoArmAt || gap < 900 || !voice.enabled) return
      const text = readMessageText(el)
      if (text.length > 2) speakText(text)
    }

    /* ------------------------------------------------------------------ *
     * ———————————— */
    const baseTokens = {
      '--dsw-alias-bg-base': 'rgba(8,10,18,0.88)',
      '--dsw-alias-bg-layer-1': 'rgba(11,14,24,0.92)',
      '--dsw-alias-bg-layer-2': 'rgba(15,19,32,0.95)',
      '--dsw-alias-bg-overlay': 'rgba(4,5,12,0.98)',
      '--dsw-alias-border-l1': 'rgba(120,110,255,0.22)',
      '--dsw-alias-border-l2': 'rgba(58,68,140,0.32)',
      '--dsw-alias-brand-primary': '#3f6bff',
      '--dsw-alias-label-primary': '#eef0fa',
      '--dsw-alias-label-secondary': '#8b93b8',
      '--dsw-alias-state-error-primary': '#ff5d7a',
      '--dsw-alias-state-idle-primary': '#7078ac',
      '--dsw-alias-state-success-primary': '#3ef0b0',
      '--dsw-alias-state-warn-primary': '#ffc93c',
      '--dsw-specific-sidebar-fill': 'rgba(9,11,20,0.9)',
      '--dsw-specific-bubble': 'rgba(22,26,42,0.92)',
      '--dsw-alias-markdown-code-block': 'rgba(8,9,20,0.94)',
    }
    const TOKENS = {}
    for (const key of Object.keys(baseTokens)) TOKENS[key] = { light: baseTokens[key], dark: baseTokens[key] }

    /* ------------------------------------------------------------------ *
     * 用量气泡的数据源
     * ------------------------------------------------------------------ */
    const runtime = { ctx: null }

    async function fetchUsage() {
      try {
        const res = await fetch('/fairy-zzz/usage', { cache: 'no-store' })
        if (!res.ok) return null
        return await res.json()
      } catch {
        return null
      }
    }

    async function fetchBalance() {
      const ctx = runtime.ctx
      if (!ctx) return { ok: false, reason: '没有插件上下文' }
      let account
      let active
      try {
        /* 账户服务在 ctx.remote 上；没注入 remote.account 时 account 可能还没挂上 */
        account = (ctx.remote && ctx.remote.account) || (ctx['remote.account'] && ctx['remote.account'].account) || null
        active = ctx.locale && ctx.locale.getSnapshot ? ctx.locale.getSnapshot().active : undefined
      } catch (cause) {
        return { ok: false, reason: '账户服务不可用：' + (cause && cause.message ? cause.message : cause) }
      }
      if (!account || typeof account.getBalance !== 'function') return { ok: false, reason: '账户服务未就绪' }
      const version = (typeof globalThis.__DSH_CLIENT_VERSION__ === 'string' && globalThis.__DSH_CLIENT_VERSION__) || '0.2.1-rc.2'
      try {
        const res = await account.getBalance({
          version,
          locale: active || navigator.language || 'zh-CN',
          timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60,
        })
        if (!res) return { ok: false, reason: '余额接口没有返回' }
        if (!res.ok) return { ok: false, reason: '余额读取被拒绝：' + String(res.error?.code || res.error?.message || '未登录') }
        /* value 可能是钱包数组，也可能被包成 { wallets } / { value } / { bonusWallets } */
        const raw = res.value
        const pick = (list) => (Array.isArray(list) ? list.filter((item) => item && Number.isFinite(Number(item.balance))) : [])
        let wallets = pick(raw)
        if (!wallets.length && raw && !Array.isArray(raw)) {
          wallets = pick(raw.wallets)
          if (!wallets.length) wallets = pick(raw.value)
          if (!wallets.length) wallets = pick(raw.bonusWallets)
        }
        if (!wallets.length) {
          const shape = raw === null ? 'null' : Array.isArray(raw) ? 'array(' + raw.length + ')' : raw && typeof raw === 'object' ? 'object(' + Object.keys(raw).join(',') + ')' : typeof raw
          return { ok: false, reason: '账户里没有钱包（' + shape + '）' }
        }
        const cny = wallets.filter((item) => (item.currency || 'CNY') === 'CNY')
        const use = cny.length ? cny : wallets
        const amount = use.reduce((sum, item) => sum + Number(item.balance), 0)
        return { ok: true, amount, currency: use[0].currency || 'CNY' }
      } catch (cause) {
        return { ok: false, reason: '余额请求失败：' + (cause && cause.message ? cause.message : cause) }
      }
    }

    function yuan(value) {
      if (!Number.isFinite(value)) return '—'
      if (value === 0) return '¥0'
      if (value < 0.01) return '¥' + value.toFixed(4)
      if (value < 10) return '¥' + value.toFixed(3).replace(/0+$/, '')
      return '¥' + value.toFixed(2)
    }

    function tokensText(tokens) {
      const n = Number(tokens) || 0
      if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M'
      if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k'
      return String(n)
    }

    /* 峰谷剩余时长：3 小时 12 分 / 47 分 / 不到 1 分 */
    function leftText(ms) {
      const total = Math.max(0, Math.round(Math.max(0, ms) / 60_000))
      const hours = Math.floor(total / 60)
      const minutes = total % 60
      if (hours && minutes) return hours + ' 小时 ' + minutes + ' 分'
      if (hours) return hours + ' 小时'
      if (minutes) return minutes + ' 分'
      return '不到 1 分'
    }

    /* ------------------------------------------------------------------ *
     * 样式
     * ------------------------------------------------------------------ */
    const CSS = `
:root{
  --fz3-cyan:#8fb4ff;
  --fz3-blue:#3d5bf0;
  --fz3-violet:#6a5cff;
  --fz3-magenta:#ff3d8b;
  --fz3-amber:#ffc93c;
  --fz3-ink:#070818;
  --fz3-text:#e8f3ff;
  --fz3-mute:#9aa4d6;
  --fz3-line:rgba(110,130,255,.2);
  --fz3-font:"Bahnschrift","DIN Alternate","HarmonyOS Sans SC","Microsoft YaHei UI","PingFang SC","Noto Sans SC",system-ui,sans-serif;
  --fz3-dock-x:25vw;
  --fz3-dock-y:52vh;
  --fz3-dock-size:128px;
  /* 自适应：问候页的眼睛直径 / 眼睛中心高度 / 眼睛到文案的间距，全部随视口缩放 */
  --fz3-eye:clamp(132px,min(32vmin,34vh),330px);
  --fz3-eye-cy:42vh;
  --fz3-eye-gap:clamp(14px,3.4vh,54px);
  color-scheme:dark;
}
html,body{background:#080a12!important;color-scheme:dark;}
body{font-family:var(--fz3-font)!important;}
body::before{
  content:"";position:fixed;inset:-12%;z-index:-2;pointer-events:none;
  background:
    radial-gradient(42% 34% at 88% -6%,rgba(96,64,255,.30),transparent 68%),
    radial-gradient(34% 30% at 2% 4%,rgba(46,52,220,.26),transparent 70%),
    radial-gradient(48% 40% at 50% 118%,rgba(92,40,214,.22),transparent 66%),
    radial-gradient(28% 22% at 62% 38%,rgba(98,120,255,.08),transparent 74%),
    repeating-linear-gradient(-24deg,rgba(150,160,255,.045) 0 1px,transparent 1px 132px),
    linear-gradient(160deg,#0a0818 0%,#050410 52%,#080513 100%);
  animation:fz3-drift 40s ease-in-out infinite alternate;
}
body::after{
  content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
  background-image:
    linear-gradient(rgba(90,150,255,.055) 1px,transparent 1px),
    linear-gradient(90deg,rgba(90,150,255,.055) 1px,transparent 1px),
    repeating-linear-gradient(0deg,rgba(0,0,0,.16) 0 1px,transparent 1px 3px),
    radial-gradient(120% 86% at 50% -6%,transparent 38%,rgba(0,0,0,.62) 100%);
  background-size:76px 76px,76px 76px,100% 3px,100% 100%;
  -webkit-mask-image:radial-gradient(150% 110% at 50% 0%,#000 26%,transparent 94%);
  mask-image:radial-gradient(150% 110% at 50% 0%,#000 26%,transparent 94%);
}
@keyframes fz3-drift{
  from{transform:translate3d(-1.4%,-1%,0) scale(1.03)}
  to{transform:translate3d(1.6%,1.2%,0) scale(1.08)}
}
::selection{background:rgba(87,232,255,.30);color:#fff}
*::-webkit-scrollbar{width:9px;height:9px}
*::-webkit-scrollbar-track{background:transparent}
*::-webkit-scrollbar-thumb{
  background:linear-gradient(180deg,rgba(87,232,255,.42),rgba(123,92,255,.52));
  border-radius:9px;border:2px solid transparent;background-clip:padding-box;
}
*::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,rgba(87,232,255,.8),rgba(123,92,255,.9));background-clip:padding-box}
textarea,input{caret-color:var(--fz3-cyan);}
textarea:focus,input:focus{
  box-shadow:0 0 0 1px rgba(87,232,255,.5),0 0 28px -10px rgba(87,232,255,.85)!important;
}
a{color:var(--fz3-cyan);text-underline-offset:3px}
pre,code,kbd,samp{font-family:"Cascadia Code","JetBrains Mono","SFMono-Regular",Consolas,monospace!important}
button{transition:filter .16s ease,box-shadow .2s ease,background-color .2s ease,color .2s ease,border-color .2s ease}
button:not([disabled]):active{transform:translateY(1px)}
:focus-visible{outline:2px solid rgba(87,232,255,.7);outline-offset:2px}

/* ---------- 品牌 ---------- */
.fz3-brandmark{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px}
.fz3-brandmark-eye{width:100%;height:100%;display:block;filter:drop-shadow(0 0 6px rgba(80,140,255,.5))}
.fz3-brandmark-eye svg{width:100%;height:100%;display:block}
.fz3-brandname{display:flex;flex-direction:column;gap:2px;line-height:1.05;font-family:var(--fz3-font);min-width:0}
.fz3-brandname b{font-weight:700;font-size:14px;letter-spacing:.34em;color:#eaf7ff;text-shadow:0 0 14px rgba(87,232,255,.55)}
.fz3-brandname i{font-style:normal;font-size:8px;letter-spacing:.2em;color:rgba(122,188,240,.72);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* ---------- 图层 ---------- */
body::after{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;
  background-image:linear-gradient(rgba(120,150,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,255,.05) 1px,transparent 1px);
  background-size:48px 48px,48px 48px;mask-image:radial-gradient(120% 120% at 50% 30%,#000 40%,transparent 100%)}
.fz3-layer{position:fixed;inset:0;z-index:9000;pointer-events:none;font-family:var(--fz3-font);color:var(--fz3-text);-webkit-font-smoothing:antialiased}
.fz3-screen{position:absolute;inset:0;pointer-events:auto;transition:opacity 1.25s ease,filter 1.25s ease;overflow:hidden;background:#02050d}
.fz3-layer[data-phase="dock"] .fz3-screen{opacity:0;pointer-events:none;filter:blur(7px)}
.fz3-bg{position:absolute;inset:0;background:
  radial-gradient(56% 52% at 50% 44%,rgba(26,38,110,.5),transparent 74%),
  radial-gradient(42% 38% at 84% 6%,rgba(88,60,235,.26),transparent 72%),
  #030409;}
.fz3-hero{
  position:absolute;inset:0;background:url('/fairy-zzz/assets/hero.png') center/cover no-repeat;
  opacity:0;transform:scale(1.04);mix-blend-mode:screen;
  filter:saturate(1.35) brightness(1.08) contrast(1.05);
  -webkit-mask-image:radial-gradient(96% 92% at 50% 46%,#000 46%,rgba(0,0,0,.55) 78%,transparent 97%);
  mask-image:radial-gradient(96% 92% at 50% 46%,#000 46%,rgba(0,0,0,.55) 78%,transparent 97%);
  transition:opacity 1.9s ease,transform 14s ease-out;
}
.fz3-layer[data-phase="greet"] .fz3-hero{opacity:.9;transform:scale(1.01)}
.fz3-layer[data-phase="dock"] .fz3-hero{opacity:0;transition:opacity 1.4s ease}
.fz3-veil{position:absolute;inset:0;pointer-events:none;background:
  radial-gradient(58% 52% at 50% 42%,transparent 12%,rgba(2,5,13,.45) 72%,rgba(2,5,13,.92) 100%),
  linear-gradient(180deg,rgba(2,5,13,.62),transparent 32%,rgba(2,5,13,.78));}

/* ———————————————————— */
.fz3-boot{position:absolute;inset:0;background:#04060d;overflow:hidden;transition:opacity .6s ease}
.fz3-boot.is-out{opacity:0}
/* 自适应：视频按 contain 完整显示，四周用同一帧的模糊放大量补齐，任何比例都不出现突兀黑边 */
.fz3-boot-fill{
  position:absolute;inset:-8%;z-index:0;pointer-events:none;overflow:hidden;
  background:url('/fairy-zzz/assets/poster.jpg') center/cover no-repeat;
  filter:blur(46px) brightness(.74) saturate(1.45);transform:scale(1.1);opacity:1;
}
.fz3-boot-fill video{display:block;width:100%;height:100%;object-fit:cover;opacity:.85}
.fz3-boot video{position:absolute;inset:0;z-index:1;width:100%;height:100%;object-fit:contain;filter:saturate(1.06) contrast(1.04) brightness(.94)}
.fz3-boot::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  background:
    repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px),
    radial-gradient(124% 96% at 50% 50%,transparent 52%,rgba(0,0,0,.5) 100%);
}
.fz3-boot-hud{position:absolute;inset:0;pointer-events:none;font-size:10px;letter-spacing:.22em}
.fz3-boot-top{position:absolute;left:32px;right:70px;top:56px;display:flex;justify-content:space-between;color:rgba(150,225,255,.72);text-shadow:0 0 12px rgba(87,232,255,.6);letter-spacing:.24em}
.fz3-boot-top b{color:#eaf7ff;font-weight:600;letter-spacing:.18em}
.fz3-corner{position:absolute;width:34px;height:34px;border:1px solid rgba(110,220,255,.4);pointer-events:none}
.fz3-corner.tl{left:20px;top:44px;border-right:0;border-bottom:0}
.fz3-corner.tr{right:20px;top:44px;border-left:0;border-bottom:0}
.fz3-corner.bl{left:20px;bottom:96px;border-right:0;border-top:0}
.fz3-corner.br{right:20px;bottom:96px;border-left:0;border-top:0}
.fz3-boot-foot{position:absolute;left:32px;right:32px;bottom:30px;display:flex;flex-direction:column;gap:12px}
.fz3-boot-row{display:flex;align-items:center;gap:18px;width:100%}
.fz3-boot-title{font-size:10px;letter-spacing:.3em;color:rgba(206,238,255,.82);white-space:nowrap}
.fz3-boot-checks{display:flex;gap:16px;font-size:9px;letter-spacing:.18em;color:rgba(126,196,240,.6);margin-left:auto}
.fz3-boot-checks span::before{content:"◇";color:rgba(87,232,255,.78)}
.fz3-boot-bar{flex:1;height:2px;background:rgba(110,190,255,.14);position:relative;overflow:hidden;min-width:80px;box-shadow:0 0 18px rgba(60,120,255,.25)}
.fz3-boot-bar span{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#2f7bff,#57e8ff);box-shadow:0 0 16px rgba(87,232,255,.95);transition:width .22s linear}
.fz3-boot-pct{font-size:10.5px;font-variant-numeric:tabular-nums;color:#a9ecff;min-width:38px;text-align:right;letter-spacing:.1em}
.fz3-skip{
  pointer-events:auto;font:inherit;font-size:9.5px;letter-spacing:.26em;color:rgba(206,240,255,.85);
  background:rgba(6,16,34,.55);border:1px solid rgba(110,220,255,.38);padding:7px 14px;cursor:pointer;flex:none;
  clip-path:polygon(0 0,100% 0,calc(100% - 9px) 100%,0 100%);
}
.fz3-skip:hover{background:rgba(87,232,255,.18);color:#fff;border-color:rgba(87,232,255,.75)}

/* ---------- 全息核心 ---------- */
.fz3-core{
  position:fixed;left:50%;top:var(--fz3-eye-cy);width:var(--fz3-eye);aspect-ratio:1/1;
  transform:translate(-50%,-50%);opacity:0;pointer-events:none;z-index:2;
  transition:left 1.35s cubic-bezier(.62,0,.22,1),top 1.35s cubic-bezier(.62,0,.22,1),width 1.35s cubic-bezier(.62,0,.22,1),opacity .55s ease;
}
.fz3-layer[data-phase="greet"] .fz3-core{opacity:1}
.fz3-layer[data-phase="dock"] .fz3-core{
  left:var(--fz3-dock-x);top:var(--fz3-dock-y);width:var(--fz3-dock-size);opacity:1;pointer-events:auto;cursor:pointer;
}
/* 拖拽模式：光标与触摸手势 */
.fz3-layer[data-drag="1"][data-phase="dock"] .fz3-core{cursor:grab;touch-action:none}

/* ————— 用量气泡：单击眼徽展开，再点收起 ————— */
.fz3-bubble{
  position:fixed;
  z-index:9002;
  pointer-events:auto;
  min-width:210px;
  padding:12px 14px 11px;
  border-radius:14px;
  background:linear-gradient(160deg,rgba(12,26,70,.97),rgba(5,12,34,.97));
  border:1px solid rgba(120,170,255,.3);
  box-shadow:0 18px 44px rgba(2,6,20,.6),0 0 0 1px rgba(87,232,255,.05) inset,0 0 22px rgba(61,91,240,.22);
  color:var(--fz3-text);
  font-family:var(--fz3-font);
  font-size:12px;
  line-height:1.55;
  transform:translateY(-50%);
  animation:fz3-bubble-in .18s ease-out;
  backdrop-filter:blur(9px);
}
.fz3-bubble::after{
  content:"";
  position:absolute;
  left:-5px;
  top:50%;
  width:10px;
  height:10px;
  margin-top:-5px;
  transform:rotate(45deg);
  background:rgba(12,26,70,.97);
  border-left:1px solid rgba(120,170,255,.3);
  border-bottom:1px solid rgba(120,170,255,.3);
}
.fz3-bubble-head{
  font-size:10px;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:#8fb4ff;
  margin-bottom:7px;
}
.fz3-bubble[data-mode="turn"] .fz3-bubble-head{color:#ffd98a}
.fz3-bubble-row{display:flex;align-items:baseline;justify-content:space-between;gap:18px}
.fz3-bubble-row + .fz3-bubble-row{margin-top:3px}
.fz3-bubble-k{color:var(--fz3-mute)}
.fz3-bubble-v{font-variant-numeric:tabular-nums;color:#eaf4ff}
.fz3-bubble-v b{font-weight:600}
.fz3-bubble-sub{margin-top:6px;font-size:10px;color:rgba(154,164,214,.85);letter-spacing:.04em}
.fz3-bubble[data-loading="1"] .fz3-bubble-v{opacity:.35}
@keyframes fz3-bubble-in{from{opacity:0;transform:translateY(-50%) translateX(-6px)}to{opacity:1;transform:translateY(-50%)}}

.fz3-layer[data-drag="1"][data-phase="dock"] .fz3-core:active{cursor:grabbing}
.fz3-layer[data-dragging="1"][data-phase="dock"] .fz3-core{transition:none;cursor:grabbing}
.fz3-layer[data-dragging="1"][data-phase="dock"] .fz3-core svg{transition:none;transform:scale(1.05)}
.fz3-layer[data-phase="boot"] .fz3-core{opacity:0}
.fz3-core svg{display:block;width:100%;height:100%;filter:none}
.fz3-eye-glyph{transition:transform .28s ease}
.fz3-layer[data-phase="dock"] .fz3-core svg{filter:none;transition:transform .3s ease}
.fz3-layer[data-phase="dock"] .fz3-core:hover .fz3-eye-glyph{transform:scale(1.07)}
.fz3-core::after{
  content:none;
}
.fz3-eye{position:relative;width:100%;height:100%;display:grid;place-items:center;filter:drop-shadow(0 0 26px rgba(52,96,240,.42))}
.fz3-eye-svg{position:relative;z-index:2;width:100%;height:100%;transition:transform .3s ease}
.fz3-eye-svg svg{width:100%;height:100%;display:block;overflow:visible}
.fz3-eye-svg #sclera,.fz3-eye-svg #iris-outer,.fz3-eye-svg #iris-blue,.fz3-eye-svg #pupil,.fz3-eye-svg #highlight{
  transform-box:view-box;transform-origin:80px 80px;
}
.fz3-eye-svg #corners{transform-box:view-box;transform-origin:80px 80px;animation:fz3-corners 12s linear infinite}
.fz3-eye-svg #sclera{animation:fz3-breath-a 1.5s cubic-bezier(.72,0,.28,1) infinite alternate}
.fz3-eye-svg #iris-outer{animation:fz3-breath-b 1.5s cubic-bezier(.72,0,.28,1) 47ms infinite alternate}
.fz3-eye-svg #iris-blue{animation:fz3-breath-c 1.5s cubic-bezier(.72,0,.28,1) 94ms infinite alternate}
.fz3-eye-svg #pupil{animation:fz3-breath-d 1.5s cubic-bezier(.72,0,.28,1) 187ms infinite alternate}
.fz3-eye-svg #highlight{animation:fz3-catchlight 3.6s ease-in-out infinite}
.fz3-eye-halo{position:absolute;inset:10%;border-radius:50%;z-index:1;pointer-events:none;
  background:radial-gradient(closest-side,rgba(64,112,255,.26),rgba(38,64,200,.10) 58%,transparent 78%);
  filter:blur(20px);animation:fz3-halo-pulse 4.6s ease-in-out infinite}

/* 扩散光环：官方 dsh-fairy-lash-pulse 的 4s 节奏（0-36% 扩散淡出，其余静默） */
@keyframes fz3-ring{0%{opacity:0;transform:scale(.98)}5%{opacity:.78}12%{opacity:.56}20%{opacity:.2}27%{opacity:0}36%,100%{opacity:0;transform:scale(2.78)}}
.fz3-eye-ring{position:absolute;inset:7%;border-radius:50%;border:2px solid rgba(201,248,255,.86);box-shadow:0 0 14px rgba(120,200,255,.45),inset 0 0 10px rgba(150,220,255,.3);z-index:1;pointer-events:none;opacity:0;transform:scale(.98);animation:fz3-ring 4s cubic-bezier(.42,0,.22,1) infinite;will-change:transform,opacity}

/* ---------- 设置页 ---------- */
.fz3-set{display:flex;flex-direction:column;gap:14px;padding:2px 2px 8px;color:#e2ecfa;font-family:var(--fz3-font)}
.fz3-set-head{display:flex;align-items:center;gap:12px;padding:2px 0 6px}
.fz3-set-eye{width:46px;height:46px;flex:none;display:block;filter:drop-shadow(0 0 12px rgba(64,116,255,.5))}
.fz3-set-eye svg{width:100%;height:100%;display:block;overflow:visible}
.fz3-set-eye #fz3-lid-cover{display:none!important}
.fz3-set-name{font-size:15px;letter-spacing:.03em}
.fz3-set-sub{font-size:11.5px;color:#8fa3bb;margin-top:3px}
.fz3-set-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.035);border:1px solid rgba(130,160,210,.14)}
.fz3-set-label{font-size:13px}
.fz3-set-desc{font-size:11px;color:#8b9fb8;margin-top:3px;line-height:1.5}
.fz3-set-dot{width:8px;height:8px;border-radius:50%;flex:none;box-shadow:0 0 10px currentColor}
.fz3-set-dot.is-on{background:#4ee6a8;color:#4ee6a8}
.fz3-set-row.is-stack{display:block}
.fz3-set-path{display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap}
.fz3-set-input{flex:1 1 260px;min-width:0;padding:8px 11px;font-family:inherit;font-size:12.5px;font-weight:400;line-height:1.45;letter-spacing:0;color:#dbe8f6;background:rgba(9,13,22,.82);border:1px solid rgba(120,160,220,.26);border-radius:9px;outline:none;transition:border-color .18s ease,box-shadow .18s ease}
.fz3-set-input:focus{border-color:rgba(87,232,255,.55);box-shadow:0 0 0 3px rgba(87,232,255,.12)}
.fz3-set-input::placeholder{color:rgba(150,172,200,.5)}
.fz3-set-dot.is-wait{background:#f0b45c;box-shadow:0 0 11px rgba(240,180,92,.6)}
.fz3-set-dot.is-off{background:#7d8ea6;color:#7d8ea6}
.fz3-set-switch{width:42px;height:24px;border-radius:99px;border:1px solid rgba(140,170,220,.3);background:rgba(120,150,200,.18);position:relative;cursor:pointer;flex:none;transition:background .18s ease,border-color .18s ease}
.fz3-set-switch::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#cfdcee;transition:transform .18s ease,background .18s ease}
.fz3-set-switch[data-on="1"]{background:linear-gradient(90deg,#2f7bff,#57e8ff);border-color:rgba(120,225,255,.6)}
.fz3-set-switch[data-on="1"]::after{transform:translateX(18px);background:#04121f}
.fz3-set-actions{display:flex;flex-wrap:wrap;gap:8px}
.fz3-set-btn{font:inherit;font-size:12px;padding:8px 14px;border-radius:9px;cursor:pointer;color:#e8f2ff;background:rgba(87,232,255,.12);border:1px solid rgba(110,200,255,.32);transition:background .16s ease,border-color .16s ease}
.fz3-set-btn:hover:not(:disabled){background:rgba(87,232,255,.22);border-color:rgba(120,225,255,.6)}
.fz3-set-btn:disabled{opacity:.4;cursor:default}
.fz3-set-btn.is-ghost{background:rgba(255,255,255,.04);border-color:rgba(140,160,190,.24)}
.fz3-set-note{font-size:11px;line-height:1.6;color:#7f92a9}

/* ---------- 花屏（视频里的随机故障帧） ---------- */
.fz3-glitch{position:absolute;inset:0;z-index:3;pointer-events:none;mix-blend-mode:screen;filter:saturate(1.18) contrast(1.06)}
.fz3-gband{position:absolute;inset:0;display:block;will-change:transform,opacity}
.fz3-gband svg{width:100%;height:100%;display:block}
.fz3-gline{position:absolute;left:-8%;right:-8%;height:1px;background:rgba(205,248,255,.9);mix-blend-mode:screen;opacity:.75;animation:fz3-gline .26s steps(3) infinite}
@keyframes fz3-gline{0%{top:21%}33%{top:57%}66%{top:36%}100%{top:71%}}
.fz3-eye[data-glitch="1"] .fz3-eye-svg{opacity:.42;filter:contrast(1.14) saturate(.9)}
.fz3-eye[data-glitch="1"] .fz3-eye-halo{opacity:.5}

/* ---------- 待机随机小动作 ---------- */
/* 眼睑遮罩：路径与曲线取自 Fairy-DSH 的 thinking-eye-clip（Apache-2.0） */
.fz3-eye-svg #fz3-lid-cover{pointer-events:none}
.fz3-eye-svg .fz3-lid-shape{transform-box:view-box;transform-origin:80px 60px;transform:translateY(-60px) scaleY(1)}
@keyframes fz3-lid-think{from{transform:translateY(14.5px) scaleY(.55)}to{transform:translateY(15.5px) scaleY(1)}}
@keyframes fz3-lid-soft{from{transform:translateY(-7px)}to{transform:translateY(1px)}}
@keyframes fz3-lid-blink{0%{transform:translateY(-60px) scaleY(1)}40%{transform:translateY(16px) scaleY(1)}56%{transform:translateY(16px) scaleY(1)}100%{transform:translateY(-60px) scaleY(1)}}
@keyframes fz3-eyelid-halo{0%{opacity:1;transform:scale(1)}42%{opacity:.45;transform:scale(1.12)}100%{opacity:1;transform:scale(1)}}
.fz3-eye[data-lid="think"] .fz3-eye-svg .fz3-lid-shape{animation:fz3-lid-think .72s cubic-bezier(.72,0,.28,1) infinite alternate}
.fz3-eye[data-lid="soft"] .fz3-eye-svg .fz3-lid-shape{animation:fz3-lid-soft 1.9s cubic-bezier(.72,0,.28,1) infinite alternate}
.fz3-eye[data-lid="blink"] .fz3-eye-svg .fz3-lid-shape{animation:fz3-lid-blink 300ms cubic-bezier(.4,0,.2,1) both}
.fz3-eye[data-blink="1"] .fz3-eye-halo{animation:fz3-eyelid-halo 300ms ease both}

/* 瞟一眼：虹膜整组短距离位移 */
@keyframes fz3-glance-l{0%,100%{transform:translateX(0)}34%,62%{transform:translateX(-6%)}}
@keyframes fz3-glance-r{0%,100%{transform:translateX(0)}34%,62%{transform:translateX(6%)}}
.fz3-eye[data-glance="l"] .fz3-eye-svg #iris-outer,
.fz3-eye[data-glance="l"] .fz3-eye-svg #iris-blue,
.fz3-eye[data-glance="l"] .fz3-eye-svg #pupil{animation:fz3-glance-l .72s cubic-bezier(.4,0,.3,1) both!important}
.fz3-eye[data-glance="r"] .fz3-eye-svg #iris-outer,
.fz3-eye[data-glance="r"] .fz3-eye-svg #iris-blue,
.fz3-eye[data-glance="r"] .fz3-eye-svg #pupil{animation:fz3-glance-r .72s cubic-bezier(.4,0,.3,1) both!important}

/* 思考：眼球左右扫视，外框加速 */
/* 思考态：眼睑半闭（见 data-lid="think"），不再横扫 */

.fz3-layer[data-mood="thinking"] .fz3-eye-halo{animation-duration:1.6s}
.fz3-layer[data-mood="thinking"] .fz3-eye-svg #corners{animation-duration:4s}

/* 执行：外框快速自转 + 扫描线 */

.fz3-layer[data-mood="working"] .fz3-eye-svg #pupil{animation:fz3-focus 1.1s ease-in-out infinite}
.fz3-layer[data-mood="working"] .fz3-eye-halo{animation-duration:1.1s}
.fz3-layer[data-mood="working"] .fz3-eye-svg #corners{animation:fz3-corners 1.9s linear infinite}
.fz3-eye-scan{position:absolute;inset:5%;z-index:4;border-radius:50%;overflow:hidden;pointer-events:none;opacity:0}
.fz3-eye-scan::before{
  content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 44%,rgba(214,232,255,.5) 50%,transparent 56%);
  mix-blend-mode:screen;animation:fz3-scan-move 1.3s linear infinite;
}
.fz3-layer[data-mood="working"] .fz3-eye-scan{opacity:1}

/* 完成：弹一下 + 光环炸开 */
.fz3-layer[data-mood="done"] .fz3-eye{animation:fz3-celebrate 1s cubic-bezier(.3,1.5,.5,1) 1}
.fz3-eye-flash{position:absolute;inset:-4%;z-index:0;border-radius:50%;pointer-events:none;opacity:0;
  border:2px solid rgba(190,220,255,.85)}
.fz3-layer[data-mood="done"] .fz3-eye-flash{animation:fz3-burst .95s ease-out 1}

@keyframes fz3-corners{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes fz3-breath-a{from{transform:scale(.985)}to{transform:scale(.91)}}
@keyframes fz3-breath-b{from{transform:scale(1)}to{transform:scale(.90)}}
@keyframes fz3-breath-c{from{transform:scale(1)}to{transform:scale(.87)}}
@keyframes fz3-breath-d{from{transform:scale(1)}to{transform:scale(.85)}}
@keyframes fz3-catchlight{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.82;transform:scale(.94)}}
@keyframes fz3-look{0%,100%{transform:translateX(0) scale(1)}25%{transform:translateX(-5px) scale(.97)}75%{transform:translateX(5px) scale(.97)}}
@keyframes fz3-focus{0%,100%{transform:scale(1)}50%{transform:scale(.82)}}
@keyframes fz3-celebrate{0%{transform:scale(1)}30%{transform:scale(1.14)}62%{transform:scale(.97)}100%{transform:scale(1)}}
@keyframes fz3-burst{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.5);opacity:0}}
@keyframes fz3-core-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.028)}}
@keyframes fz3-halo-pulse{0%,100%{opacity:.55;transform:scale(.97)}50%{opacity:.95;transform:scale(1.05)}}
@keyframes fz3-eye-float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-7px) scale(1.02)}}
@keyframes fz3-scan-move{0%{transform:translateY(-46%)}100%{transform:translateY(46%)}}

/* ———————————————————— */
.fz3-copy{
  position:fixed;left:50%;top:calc(var(--fz3-eye-cy) + var(--fz3-eye) / 2 + var(--fz3-eye-gap));
  transform:translate(-50%,0);width:min(820px,90vw);
  text-align:center;opacity:0;pointer-events:none;z-index:3;transition:opacity .6s ease,transform 1s ease;
}
.fz3-layer[data-phase="greet"] .fz3-copy{opacity:1}
.fz3-layer[data-phase="dock"] .fz3-copy{opacity:0;transform:translate(-50%,-16px)}
.fz3-copy-kicker{font-size:clamp(8px,.78vw,9.5px);letter-spacing:.44em;color:rgba(150,172,255,.82);margin-bottom:clamp(6px,1.4vh,14px);text-indent:.44em}
.fz3-copy-title{display:inline-block;position:relative;margin-bottom:clamp(24px,4.4vh,56px);font-size:clamp(18px,min(3.1vw,4.6vh),38px);font-weight:700;letter-spacing:.045em;line-height:1.06;color:#fff;text-align:center;
  text-shadow:0 0 24px rgba(96,124,255,.85),0 0 60px rgba(70,90,255,.5);}
/* 参考视频里的镜面倒影：同一串文字翻转过来，向下渐隐 */
.fz3-copy-title::after{
  content:attr(data-text);position:absolute;left:0;right:0;top:100%;transform:scaleY(-1);transform-origin:top center;
  opacity:.26;filter:blur(.7px);pointer-events:none;
  -webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.9),transparent 70%);
  mask-image:linear-gradient(180deg,rgba(0,0,0,.9),transparent 70%);
}
.fz3-copy-title-wrap{text-align:center}
.fz3-copy-title-zh{
  font-size:clamp(10px,min(1.15vw,1.7vh),15px);letter-spacing:.34em;text-indent:.34em;
  color:rgba(168,224,255,.92);text-shadow:0 0 18px rgba(87,232,255,.6);
  margin-bottom:clamp(4px,1vh,12px);
}
.fz3-copy-lines{display:flex;flex-direction:column;gap:clamp(4px,.9vh,8px);padding:0 clamp(14px,3vw,28px);text-wrap:balance;font-size:clamp(13px,min(1.7vw,2.6vh),22px);line-height:1.52;color:#eef8ff;text-shadow:0 0 24px rgba(87,232,255,.55),0 0 6px rgba(120,220,255,.35)}
.fz3-copy-lines span{opacity:0;transform:translateY(10px);animation:fz3-line .75s cubic-bezier(.2,.7,.2,1) forwards;white-space:pre-wrap}
.fz3-copy-lines span:nth-child(1){animation-delay:.55s}
.fz3-copy-lines span:nth-child(2){animation-delay:1.15s}
.fz3-copy-lines span:nth-child(3){animation-delay:1.75s}
.fz3-copy-sub{margin-top:clamp(6px,1.4vh,16px);font-size:clamp(7px,.66vw,8.5px);letter-spacing:.32em;color:rgba(122,178,230,.6);text-indent:.32em}
.fz3-copy-tap{margin-top:14px;font-size:10px;letter-spacing:.2em;color:rgba(255,201,60,.85);animation:fz3-blink 1.6s ease-in-out infinite}
.fz3-skip2{
  position:absolute;right:clamp(12px,2.4vw,30px);bottom:clamp(10px,2.6vh,26px);pointer-events:auto;background:none;border:0;font:inherit;
  font-size:9.5px;letter-spacing:.26em;color:rgba(150,200,235,.55);cursor:pointer;padding:8px;
}
.fz3-skip2:hover{color:#9fefff}

/* ---------- 左下角坞 ---------- */
.fz3-tag{
  position:fixed;left:calc(var(--fz3-dock-x) + 62px);top:calc(100% - 262px);z-index:5;pointer-events:none;
  display:flex;flex-direction:column;gap:3px;padding:5px 12px 6px 10px;border-left:2px solid rgba(87,232,255,.75);
  background:linear-gradient(90deg,rgba(8,20,42,.82),rgba(8,20,42,0));
  opacity:0;transform:translateX(-8px);
  transition:opacity .6s ease .35s,transform .6s ease .35s;
}
.fz3-layer[data-phase="dock"] .fz3-tag{opacity:1;transform:none}
.fz3-tag b{font-size:11px;letter-spacing:.3em;color:#e6f8ff;text-shadow:0 0 14px rgba(87,232,255,.7)}
.fz3-tag i{font-style:normal;font-size:7.5px;letter-spacing:.24em;color:rgba(140,196,240,.85)}
.fz3-panel{
  position:fixed;left:calc(var(--fz3-dock-x) - 30px);bottom:330px;width:308px;z-index:6;pointer-events:auto;
  padding:14px 15px 12px;color:var(--fz3-text);
  background:linear-gradient(158deg,rgba(10,21,44,.97),rgba(4,8,20,.985));
  border:1px solid rgba(87,232,255,.32);
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
  box-shadow:0 26px 70px -26px rgba(0,0,0,.95),0 0 46px -22px rgba(87,232,255,.75);
  animation:fz3-panel-in .26s cubic-bezier(.2,.8,.2,1);
  transform-origin:10% 100%;
}
.fz3-panel::before{content:"";position:absolute;left:0;top:0;width:72px;height:2px;background:linear-gradient(90deg,#57e8ff,transparent)}
.fz3-panel::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.24;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,.4) 0 1px,transparent 1px 4px)}
.fz3-panel-head{display:flex;align-items:center;justify-content:space-between;padding-bottom:9px;border-bottom:1px solid rgba(87,232,255,.18)}
.fz3-panel-title{font-size:10.5px;letter-spacing:.26em;color:#dff4ff;text-shadow:0 0 10px rgba(87,232,255,.5)}
.fz3-dot{width:6px;height:6px;border-radius:50%;background:#3ef0b0;box-shadow:0 0 10px #3ef0b0;flex:none}
.fz3-dot.off{background:#ff5d7a;box-shadow:0 0 10px #ff5d7a}
.fz3-dot.warn{background:#ffc93c;box-shadow:0 0 10px #ffc93c}
.fz3-panel-sub{font-size:8.5px;letter-spacing:.14em;color:rgba(130,170,215,.68);margin:8px 0 10px}
.fz3-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 0;font-size:12px;color:rgba(222,238,255,.92)}
.fz3-row-label{display:flex;align-items:center;gap:8px;letter-spacing:.06em}
.fz3-row small{font-size:9px;letter-spacing:.14em;color:rgba(120,170,215,.7)}
.fz3-switch{
  position:relative;width:38px;height:19px;flex:none;padding:0;border:1px solid rgba(87,232,255,.35);
  background:rgba(8,16,34,.9);cursor:pointer;
  clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));
}
.fz3-switch::after{
  content:"";position:absolute;top:2px;left:2px;width:13px;height:13px;background:rgba(150,180,210,.75);
  transition:transform .18s ease,background .18s ease,box-shadow .18s ease;
}
.fz3-switch[data-on="1"]{border-color:rgba(87,232,255,.8);box-shadow:inset 0 0 14px -6px rgba(87,232,255,.9)}
.fz3-switch[data-on="1"]::after{transform:translateX(19px);background:var(--fz3-cyan);box-shadow:0 0 10px var(--fz3-cyan)}
.fz3-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px;position:relative;z-index:1}
.fz3-btn{
  font:inherit;font-size:10px;letter-spacing:.1em;color:rgba(214,236,255,.9);background:rgba(10,22,44,.8);
  border:1px solid rgba(87,232,255,.24);padding:8px 8px;cursor:pointer;
  clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
}
.fz3-btn:hover{background:rgba(87,232,255,.16);border-color:rgba(87,232,255,.7);color:#fff}
.fz3-btn:disabled{opacity:.45;cursor:not-allowed}
.fz3-btn.is-ghost{background:transparent;border-color:rgba(120,160,210,.16);color:rgba(160,190,220,.75)}
.fz3-panel-foot{margin-top:10px;padding-top:8px;border-top:1px solid rgba(87,232,255,.12);display:flex;justify-content:space-between;font-size:7.5px;letter-spacing:.16em;color:rgba(110,150,200,.55)}
.fz3-wave{display:inline-flex;align-items:flex-end;gap:2px;height:11px;margin-left:8px}
.fz3-wave i{display:block;width:2px;height:3px;background:var(--fz3-cyan);box-shadow:0 0 6px var(--fz3-cyan)}
.fz3-wave.on i{animation:fz3-wave .9s ease-in-out infinite}
.fz3-wave i:nth-child(2){animation-delay:.1s}
.fz3-wave i:nth-child(3){animation-delay:.2s}
.fz3-wave i:nth-child(4){animation-delay:.3s}

/* ———————————————————— */
.fz3-voice{
  display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;
  border-radius:50%;border:1px solid transparent;background:transparent;cursor:pointer;
  color:rgba(170,198,228,.72);transition:color .18s ease,background .18s ease,border-color .18s ease,box-shadow .2s ease;
}
.fz3-voice svg{width:15px;height:15px}
.fz3-voice:hover{color:#9ff0ff;background:rgba(87,232,255,.1);border-color:rgba(87,232,255,.35);box-shadow:0 0 16px -6px rgba(87,232,255,.9)}
.fz3-voice[data-state="busy"]{color:var(--fz3-amber);animation:fz3-blink 1.1s steps(2) infinite}
.fz3-voice[data-state="play"]{color:var(--fz3-cyan);text-shadow:0 0 10px var(--fz3-cyan)}

/* ———————————————————— */
.fz3-frame{position:fixed;inset:0;pointer-events:none;z-index:3;border-radius:16px;
  box-shadow:0 0 0 7px rgba(8,6,18,.92),0 0 0 8px rgba(146,126,255,.22),0 0 0 14px rgba(70,50,180,.10),0 24px 70px rgba(0,0,0,.55)}
.fz3-sb-stats{position:fixed;left:12px;bottom:74px;width:258px;padding:10px 12px;border-radius:12px;pointer-events:none;z-index:4;
  background:linear-gradient(180deg,rgba(16,14,34,.94),rgba(11,10,24,.94));border:1px solid rgba(120,110,255,.16);
  box-shadow:0 12px 30px rgba(0,0,0,.45);opacity:0;transition:opacity .6s ease .45s}
.fz3-layer[data-phase="dock"] .fz3-sb-stats{opacity:1}
.fz3-sb-row{display:flex;align-items:baseline;gap:8px;font-size:10px;letter-spacing:.06em;color:rgba(150,164,214,.78)}
.fz3-sb-row b{font-size:12px;font-weight:600;color:#eaf0ff;letter-spacing:.02em}
.fz3-sb-row2{margin-top:7px}
.fz3-sb-row em{margin-left:auto;font-style:normal;font-size:9px;padding:2px 7px;border-radius:6px;
  color:rgba(196,208,255,.9);background:rgba(90,80,190,.22);border:1px solid rgba(130,120,255,.22)}
/* 官方字标是 SVG（没有文本节点）：按 CSS Module 的语义后缀直接隐掉，
   再由 .fz3-sb-brand 在同一位置画 Fairy 字标。 */
[class*="_brandName"],[class*="_brandMark"]{visibility:hidden!important}

.fz3-sb-brand{position:fixed;left:var(--fz3-brand-left,10px);top:var(--fz3-brand-top,52px);width:262px;height:var(--fz3-brand-h,46px);padding:0 10px;border-radius:11px;display:flex;align-items:center;gap:11px;pointer-events:none;z-index:4;background:transparent;box-shadow:none;border-radius:0;
  opacity:0;transition:opacity .6s ease .35s}
.fz3-layer[data-phase="dock"] .fz3-sb-brand{opacity:1}
.fz3-sb-logo{width:22px;height:22px;flex:0 0 22px;display:block}
.fz3-sb-logo svg{width:100%;height:100%;display:block}
.fz3-sb-text{display:flex;flex-direction:column;gap:3px;min-width:0}
.fz3-sb-text b{font-size:19px;font-weight:700;letter-spacing:.02em;color:#f2f5ff;line-height:1;
  font-family:"Palatino Linotype","Songti SC",Georgia,serif;font-style:italic}
.fz3-sb-text i{font-style:normal;font-size:8.5px;letter-spacing:.16em;color:rgba(150,168,220,.72);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

.fz3-wave{position:fixed;right:24px;bottom:118px;width:104px;display:flex;flex-direction:column;align-items:center;gap:7px;
  pointer-events:none;z-index:4;opacity:0;transition:opacity .6s ease .5s}
.fz3-layer[data-phase="dock"] .fz3-wave{opacity:1}
.fz3-wave-dot{width:5px;height:5px;border-radius:50%;background:#ff6b8a;box-shadow:0 0 8px rgba(255,107,138,.9);align-self:flex-start;margin-left:6px}
.fz3-wave-bars{display:flex;align-items:center;gap:3px;height:22px;min-height:22px}
.fz3-wave-bars i{display:block;width:4px;height:22px;border-radius:2px;background:linear-gradient(180deg,rgba(196,216,255,1),rgba(108,140,255,.75));
  transform-origin:bottom;animation:fz3-bar 1.05s ease-in-out infinite}
.fz3-wave-bars i:nth-child(1){animation-delay:0s}.fz3-wave-bars i:nth-child(2){animation-delay:.12s}
.fz3-wave-bars i:nth-child(3){animation-delay:.24s}.fz3-wave-bars i:nth-child(4){animation-delay:.06s}
.fz3-wave-bars i:nth-child(5){animation-delay:.3s}.fz3-wave-bars i:nth-child(6){animation-delay:.18s}
.fz3-wave-bars i:nth-child(7){animation-delay:.36s}.fz3-wave-bars i:nth-child(8){animation-delay:.09s}
.fz3-wave-bars i:nth-child(9){animation-delay:.27s}.fz3-wave-bars i:nth-child(10){animation-delay:.15s}
.fz3-wave-bars i:nth-child(11){animation-delay:.33s}.fz3-wave-bars i:nth-child(12){animation-delay:.21s}
@keyframes fz3-bar{0%,100%{transform:scaleY(.28)}50%{transform:scaleY(1)}}
.fz3-wave-slider{position:relative;width:88px;height:10px;border-radius:6px;background:rgba(18,20,44,.92);
  border:1px solid rgba(120,140,255,.18);box-shadow:inset 0 1px 2px rgba(0,0,0,.5)}
.fz3-wave-slider b{position:absolute;left:3px;top:2px;bottom:2px;width:58%;border-radius:5px;
  background:linear-gradient(90deg,rgba(110,90,255,.85),rgba(150,120,255,.55))}
.fz3-wave-slider-2 b{width:34%;background:linear-gradient(90deg,rgba(70,120,255,.8),rgba(120,150,255,.45))}
.fz3-boot-top,.fz3-boot-foot,.fz3-boot-checks,.fz3-boot-ver,.fz3-boot-corner,.fz3-corner,.fz3-tag{display:none!important}
.fz3-rim{position:fixed;left:-90px;top:-140px;width:560px;height:560px;pointer-events:none;
  background:radial-gradient(closest-side,rgba(126,92,255,.16),rgba(70,60,220,.05) 58%,transparent 76%);filter:blur(8px)}
.fz3-bay{position:fixed;left:50%;bottom:-190px;width:980px;height:400px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(closest-side,rgba(74,96,255,.16),rgba(60,50,200,.05) 60%,transparent 78%)}
.fz3-atmos{position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;mix-blend-mode:screen;opacity:.75}
.fz3-atmos-frame{position:absolute;inset:9px;border:1px solid rgba(87,232,255,.06)}
.fz3-atmos-frame::before,.fz3-atmos-frame::after{content:"";position:absolute;width:16px;height:16px;border:1px solid rgba(87,232,255,.22)}
.fz3-atmos-frame::before{left:-1px;top:-1px;border-right:0;border-bottom:0}
.fz3-atmos-frame::after{right:-1px;bottom:-1px;border-left:0;border-top:0}
.fz3-atmos-glow{position:absolute;left:-12%;top:-26%;width:64%;height:70%;background:radial-gradient(circle,rgba(70,52,255,.16),transparent 68%);filter:blur(34px);animation:fz3-breathe 14s ease-in-out infinite}
.fz3-atmos-sweep{position:absolute;left:0;right:0;height:130px;background:linear-gradient(180deg,transparent,rgba(87,232,255,.05),transparent);animation:fz3-sweep 13s linear infinite}
.fz3-atmos-flash{position:absolute;right:4%;top:2%;width:34%;height:30%;background:radial-gradient(ellipse at 60% 20%,rgba(120,190,255,.16),transparent 60%);filter:blur(20px);animation:fz3-flash 11s steps(1) infinite}

@keyframes fz3-rot{to{transform:rotate(360deg)}}
@keyframes fz3-rot-rev{to{transform:rotate(-360deg)}}
@keyframes fz3-line{to{opacity:1;transform:none}}
@keyframes fz3-blink{50%{opacity:.3}}
@keyframes fz3-breathe{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
@keyframes fz3-twinkle{0%,100%{opacity:.15}45%{opacity:.9}55%{opacity:.35}}
@keyframes fz3-wave{0%,100%{height:3px}50%{height:11px}}
@keyframes fz3-sweep{0%{top:-25%}100%{top:115%}}
@keyframes fz3-flash{0%,38%,41%,63%,100%{opacity:.35}39%,40%,64%{opacity:.85}}
@keyframes fz3-panel-in{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}

@media (max-width:1180px){
  :root{--fz3-dock-size:112px}
}
@media (max-width:820px){
  :root{--fz3-dock-size:84px;--fz3-eye-cy:40vh}
  .fz3-tag{left:calc(var(--fz3-dock-x) + 38px);top:calc(100% - 214px)}
  .fz3-panel{left:12px;width:min(320px,calc(100vw - 24px))}
  .fz3-boot-checks{display:none}
  .fz3-boot-title{display:none}
  .fz3-copy{width:92vw}
  .fz3-copy-title{letter-spacing:.01em}
  .fz3-copy-lines{font-size:clamp(11px,2.55vw,15px);padding:0 18px;line-break:strict}
}
/* 矮视口：收掉次要行、压字号，保证眼睛与文案都完整在画面内 */
@media (max-height:620px){
  :root{--fz3-eye-cy:40vh}
  .fz3-copy-kicker{display:none}
  .fz3-copy-lines{font-size:clamp(12px,min(1.7vw,2.9vh),18px)}
  .fz3-copy-sub{display:none}
  .fz3-copy-sub.fz3-tap{display:block}
  .fz3-copy-title{margin-bottom:clamp(16px,3.2vh,30px)}
}
@media (max-height:460px){
  :root{--fz3-eye-cy:38vh;--fz3-eye:clamp(96px,min(26vmin,30vh),180px)}
  .fz3-copy-title::after{display:none}
  .fz3-copy-title-zh{display:none}
}
`

    /* ------------------------------------------------------------------ *
     * 图标
     * ------------------------------------------------------------------ */
    /* 待机随机小动作：眨眼（偶尔连眨）+ 偶尔瞟一眼。
       眨眼是整只眼纵向压扁成一条光缝再弹回，300ms 一次。 */
    const BLINK_MS = 300
    let lastGlitchAt = 0
    const bootHooks = new Set()

    function CoreGlyph({ phase, mood }) {
      const [blink, setBlink] = useState('0')
      const [glance, setGlance] = useState('')
      const [glitch, setGlitch] = useState(null)

      /* 花屏：随机把整只眼切成 2~4 条横带，各自横向错位叠一层；切换情绪时也来一下。 */
      const fireGlitch = useCallback(() => {
        if (Date.now() - lastGlitchAt < 1800) return
        lastGlitchAt = Date.now()
        const bands = []
        let y = 2 + Math.random() * 10
        const count = 2 + Math.floor(Math.random() * 3)
        for (let i = 0; i < count && y < 92; i += 1) {
          const h = 4 + Math.random() * 15
          bands.push({
            top: y,
            h: Math.min(h, 96 - y),
            dx: (Math.random() < 0.5 ? -1 : 1) * (3 + Math.random() * 14),
            o: 0.5 + Math.random() * 0.5,
          })
          y += h + 5 + Math.random() * 20
        }
        if (!bands.length) return
        setGlitch({ id: Math.random(), bands: bands })
        if (typeof window !== 'undefined') window.__fz3Glitches = (window.__fz3Glitches || 0) + 1
        setTimeout(() => setGlitch(null), 150 + Math.random() * 190)
      }, [])

      useEffect(() => {
        if (phase === 'boot') return undefined
        let alive = true
        let timer = null
        const schedule = () => {
          const hot = mood === 'working' || mood === 'thinking'
          const wait = hot ? 4200 + Math.random() * 5200 : 7600 + Math.random() * 9400
          timer = setTimeout(() => {
            if (!alive) return
            fireGlitch()
            schedule()
          }, wait)
        }
        schedule()
        return () => { alive = false; clearTimeout(timer) }
      }, [phase, mood, fireGlitch])

      useEffect(() => {
        if (phase === 'boot') return undefined
        const t = setTimeout(() => { try { fireGlitch() } catch (e) {} }, 180)
        return () => clearTimeout(t)
      }, [mood, phase, fireGlitch])

      useEffect(() => {
        if (phase === 'boot') return undefined
        let alive = true
        let timer = null
        const idleLike = mood !== 'working' && mood !== 'thinking'
        /* 思考 / 执行中不眨眼：只保留眼睑半闭的思考态 */
        if (!idleLike) return () => { alive = false }
        const schedule = () => {
          const wait = idleLike ? 3400 + Math.random() * 5200 : 9000 + Math.random() * 7000
          timer = setTimeout(() => {
            if (!alive) return
            setBlink('1')
            if (typeof window !== 'undefined') window.__fz3Blinks = (window.__fz3Blinks || 0) + 1
            setTimeout(() => { if (alive) setBlink('0') }, BLINK_MS)
            if (Math.random() < 0.24) {
              setTimeout(() => {
                if (!alive) return
                setBlink('1')
                setTimeout(() => { if (alive) setBlink('0') }, BLINK_MS - 40)
              }, 470)
            }
            if (idleLike && Math.random() < 0.45) {
              const dir = Math.random() < 0.5 ? 'l' : 'r'
              setTimeout(() => { if (alive) setGlance(dir) }, 520)
              setTimeout(() => { if (alive) setGlance('') }, 1240)
            }
            schedule()
          }, wait)
        }
        schedule()
        return () => {
          alive = false
          clearTimeout(timer)
        }
      }, [phase, mood])

      return h(
        'div',
        { className: 'fz3-eye', 'data-blink': blink, 'data-glance': glance || undefined, 'data-glitch': glitch ? '1' : undefined, 'data-lid': phase === 'boot' ? undefined : (blink === '1' ? 'blink' : (mood === 'thinking' || mood === 'working' ? 'think' : (mood === 'done' ? 'soft' : undefined))) },
        h('span', { className: 'fz3-eye-halo', 'aria-hidden': 'true' }),
        h('span', { className: 'fz3-eye-ring', 'aria-hidden': 'true' }),
        h('div', {
          className: 'fz3-eye-svg',
          'aria-hidden': 'true',
          dangerouslySetInnerHTML: { __html: FAIRY_EYE_SVG },
        }),
        glitch
          ? h('span', { className: 'fz3-glitch', 'aria-hidden': 'true' },
              glitch.bands.map((b, i) => h('span', {
                key: glitch.id + '-' + i,
                className: 'fz3-gband',
                style: {
                  clipPath: 'inset(' + b.top.toFixed(1) + '% 0 ' + Math.max(0, 100 - b.top - b.h).toFixed(1) + '% 0)',
                  transform: 'translateX(' + b.dx.toFixed(1) + 'px)',
                  opacity: b.o.toFixed(2),
                },
                dangerouslySetInnerHTML: { __html: FAIRY_EYE_SVG },
              })),
              h('span', { className: 'fz3-gline', 'aria-hidden': 'true' }))
          : null,
        h('span', { className: 'fz3-eye-scan', 'aria-hidden': 'true' }),
        h('span', { className: 'fz3-eye-flash', 'aria-hidden': 'true' }),
      )
    }

    /* 设置页：语音开关、引擎状态、重播问候 / 重播开机 / 测试语音 / 停止 */
    function FairySettings() {
      const voiceState = useVoice()
      const [engine, setEngine] = useState(null)
      const [engineBusy, setEngineBusy] = useState('')
      const ping = useCallback(() => {
        fetch('/fairy-zzz/health', { cache: 'no-store' })
          .then((res) => res.json())
          .then((data) => setEngine(data))
          .catch(() => setEngine({ ok: false, engine: false }))
      }, [])
      useEffect(() => {
        ping()
        const timer = setInterval(ping, 5000)
        return () => clearInterval(timer)
      }, [ping])
      const [voiceHome, setVoiceHome] = useState('')
      const [voiceInfo, setVoiceInfo] = useState(null)
      const [voiceHomeBusy, setVoiceHomeBusy] = useState('')

      /* 眼徽拖拽开关：写 localStorage 后广播事件，让皮肤图层立刻切换指针行为 */
      const [dragPref, setDragPref] = useState(() => readBool(DRAG_KEY, true))
      const [hasCustomPos, setHasCustomPos] = useState(() => !!readStored(POS_KEY, null))
      const toggleDrag = () => {
        const next = !dragPref
        writeStored(DRAG_KEY, next)
        setDragPref(next)
        try { window.dispatchEvent(new CustomEvent('fz3:drag-pref')) } catch {}
      }
      const resetDockPos = () => {
        try { localStorage.removeItem(POS_KEY) } catch {}
        setHasCustomPos(false)
        try { window.dispatchEvent(new CustomEvent('fz3:dock-reset')) } catch {}
      }
      const loadVoiceHome = useCallback(() => {
        fetch('/fairy-zzz/voice-home', { cache: 'no-store' })
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (!data) return
            setVoiceInfo(data)
            setVoiceHome(data.home || '')
          })
          .catch(() => {})
      }, [])
      useEffect(() => {
        loadVoiceHome()
      }, [loadVoiceHome])
      /* 宿主还没有 voice-home 路由时（旧版本），至少把当前引擎目录显示出来 */
      useEffect(() => {
        if (voiceInfo) return
        const home = (engine && engine.engineHome) || ''
        if (home && !voiceHome) setVoiceHome(home)
      }, [engine, voiceInfo, voiceHome])
      const saveVoiceHome = useCallback(
        (home) => {
          setVoiceHomeBusy('save')
          fetch('/fairy-zzz/voice-home', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ home: String(home ?? '') }),
          })
            .then((r) => {
              if (r.status === 404) {
                return { ok: false, reason: '宿主还在跑旧版本，重启 DSH 之后这里才能保存' }
              }
              return r.json().catch(() => null)
            })
            .then((data) => {
              if (data) setVoiceInfo(data)
              setVoiceHome((data && data.home) || '')
              ping()
            })
            .catch(() => {})
            .then(() => setVoiceHomeBusy(''))
        },
        [ping],
      )
      const controlEngine = useCallback(
        (action) => {
          setEngineBusy(action)
          fetch('/fairy-zzz/engine?action=' + action, { cache: 'no-store' })
            .catch(() => {})
            .then(() => {
              ping()
              setTimeout(ping, 1500)
              setTimeout(ping, 4000)
              setTimeout(() => setEngineBusy(''), 600)
            })
        },
        [ping],
      )
      const busy = voiceState.busy || voiceState.speaking
      const ready = !!(engine && engine.ok && engine.engine)
      const enginePhase = (engine && engine.engineState) || (ready ? 'ready' : 'dead')
      const engineHome = (engine && engine.engineHome) || ''
      const engineText = busy
        ? '正在合成…'
        : voiceState.speaking
          ? '正在播放…'
          : enginePhase === 'ready'
            ? '已就绪 · GPT-SoVITS（本地 CPU 推理）'
            : enginePhase === 'loading'
              ? '模型加载中，请稍候…'
              : enginePhase === 'error'
                ? '引擎报错：' + String((engine && engine.engineError) || '未知错误').slice(0, 80)
                : engineHome
                  ? '未运行（引擎在 ' + engineHome + '）'
                  : '未运行：没找到语音引擎'
      const setVoice = (enabled) => {
        patchVoice({ enabled: enabled })
        writeStored(VOICE_KEY, enabled)
        if (!enabled) stopSpeech()
      }
      const playGreet = () => { stopSpeech(); const audio = new Audio(GREETING()); audio.play().catch(() => {}) }
      const replayBoot = () => { bootHooks.forEach((fn) => { try { fn() } catch (e) {} }) }
      const testVoice = () => { speakText('测试中。主人，我的声音听起来还满意吗？不满意也请忍着，本系统就这一副嗓子。', { force: true }) }
      return h(
        'div',
        { className: 'fz3-set' },
        h(
          'div',
          { className: 'fz3-set-head' },
          h('span', { className: 'fz3-set-eye', 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: FAIRY_EYE_SVG } }),
          h(
            'div',
            null,
            h('div', { className: 'fz3-set-name' }, 'Fairy · Ⅲ型'),
            h('div', { className: 'fz3-set-sub' }, 'H.D.D 空洞深潜系统 · 皮肤与语音'),
          ),
        ),
        h(
          'div',
          { className: 'fz3-set-row' },
          h('div', null, h('div', { className: 'fz3-set-label' }, '自动朗读回复'), h('div', { className: 'fz3-set-desc' }, '助手回答完成后用 Fairy 的声音念出来')),
          h('button', {
            type: 'button',
            className: 'fz3-set-switch',
            'data-on': voiceState.enabled ? '1' : '0',
            'aria-pressed': !!voiceState.enabled,
            onClick: () => setVoice(!voiceState.enabled),
          }),
        ),
        h(
          'div',
          { className: 'fz3-set-row' },
          h(
            'div',
            null,
            h('div', { className: 'fz3-set-label' }, '拖动眼徽'),
            h(
              'div',
              { className: 'fz3-set-desc' },
              dragPref
                ? '已开启：按住会话区左缘的眼标，拖到屏幕任意位置，位置会被记住'
                : '已锁定：眼标固定在会话区左缘中部',
            ),
          ),
          h('button', {
            type: 'button',
            className: 'fz3-set-switch',
            'data-on': dragPref ? '1' : '0',
            'aria-pressed': !!dragPref,
            onClick: toggleDrag,
          }),
        ),
        h(
          'div',
          { className: 'fz3-set-row' },
          h('div', null, h('div', { className: 'fz3-set-label' }, '语音引擎'), h('div', { className: 'fz3-set-desc' }, engineText)),
          h('span', { className: 'fz3-set-dot' + (ready ? ' is-on' : enginePhase === 'loading' ? ' is-wait' : ' is-off') }),
        ),
        h(
          'div',
          { className: 'fz3-set-row is-stack' },
          h(
            'div',
            null,
            h('div', { className: 'fz3-set-label' }, '语音引擎目录'),
            h(
              'div',
              { className: 'fz3-set-desc' },
              voiceInfo && voiceInfo.ok
                ? (voiceInfo.source === 'settings' ? '已指定：' : voiceInfo.source === 'env' ? '来自环境变量：' : voiceInfo.source === 'portable' ? '便携包自带：' : '旧变量：') + (voiceInfo.home || '')
                : (voiceInfo && voiceInfo.reason) || '选一个装好 GPT-SoVITS 的目录，整个目录搬去哪都行',
            ),
          ),
          h(
            'div',
            { className: 'fz3-set-path' },
            h('input', {
              type: 'text',
              className: 'fz3-set-input',
              value: voiceHome,
              spellCheck: false,
              placeholder: '例如 D:\\Fairy\\tts 或 /opt/fairy-tts',
              onChange: (event) => setVoiceHome(event.target.value),
              onKeyDown: (event) => {
                if (event.key === 'Enter') saveVoiceHome(voiceHome)
              },
            }),
            h(
              'button',
              { type: 'button', className: 'fz3-set-btn', onClick: () => saveVoiceHome(voiceHome), disabled: voiceHomeBusy === 'save' },
              voiceHomeBusy === 'save' ? '保存中…' : '保存',
            ),
            h(
              'button',
              { type: 'button', className: 'fz3-set-btn is-ghost', onClick: loadVoiceHome },
              '检测',
            ),
            h(
              'button',
              { type: 'button', className: 'fz3-set-btn is-ghost', onClick: () => saveVoiceHome('') },
              '清除',
            ),
          ),
        ),
        h(
          'div',
          { className: 'fz3-set-actions' },
          h('button', { type: 'button', className: 'fz3-set-btn', onClick: () => controlEngine('start'), disabled: engineBusy === 'start' || ready }, engineBusy === 'start' ? '启动中…' : '启动引擎'),
          h('button', { type: 'button', className: 'fz3-set-btn is-ghost', onClick: () => controlEngine('stop'), disabled: engineBusy === 'stop' || !ready }, '停止引擎'),
          h('button', { type: 'button', className: 'fz3-set-btn is-ghost', onClick: ping }, '刷新状态'),
        ),
        h(
          'div',
          { className: 'fz3-set-actions' },
          h('button', { type: 'button', className: 'fz3-set-btn', onClick: playGreet }, '试听问候'),
          h('button', { type: 'button', className: 'fz3-set-btn', onClick: replayBoot }, '重播开机动画'),
          h('button', { type: 'button', className: 'fz3-set-btn is-ghost', onClick: resetDockPos, disabled: !hasCustomPos }, '眼标复位'),
          h('button', { type: 'button', className: 'fz3-set-btn', onClick: testVoice, disabled: busy }, '测试语音'),
          h('button', { type: 'button', className: 'fz3-set-btn is-ghost', onClick: stopSpeech, disabled: !busy }, '停止'),
        ),
        h('div', { className: 'fz3-set-note' }, 'Fairy 皮肤 · 待机随机眨眼与花屏、思考态眼睑呼吸，开关都在这里；对话区左缘的眼标可以拖动（开关见上），只作状态指示，不弹出面板。'),
      )
    }

    function BrandMark() {
      return h(
        'span',
        { className: 'fz3-brandmark', 'aria-hidden': 'true' },
        h('span', {
          className: 'fz3-brandmark-eye',
          'aria-hidden': 'true',
          dangerouslySetInnerHTML: { __html: FAIRY_EYE_SVG },
        }),
      )
    }

    function BrandName() {
      return h(
        'span',
        { className: 'fz3-brandname' },
        h('b', null, 'FAIRY'),
        h('i', null, 'Ⅲ · H.D.D'),
      )
    }

    function Waveform({ on }) {
      return h(
        'span',
        { className: 'fz3-wave' + (on ? ' on' : '') },
        h('i'),
        h('i'),
        h('i'),
        h('i'),
      )
    }

    /* ------------------------------------------------------------------ *
     * ———————————— */
    function BootStage({ onDone }) {
      const videoRef = useRef(null)
      const [pct, setPct] = useState(0)
      const [out, setOut] = useState(false)
      const doneRef = useRef(false)

      const finish = useCallback(() => {
        if (doneRef.current) return
        doneRef.current = true
        setOut(true)
        setTimeout(onDone, 640)
      }, [onDone])

      useEffect(() => {
        const video = videoRef.current
        if (!video) return
        let disposed = false
        video.volume = 0.9
        // 先试着带声音播放；浏览器拦住自动播放（NotAllowedError）时退回静音，
        // 等主人第一次点按/敲键再把声音打开，保证开机动画无论如何先放起来。
        const unlock = () => {
          if (disposed || !video.muted) return
          video.muted = false
          const p = video.play()
          if (p && p.catch) p.catch(() => { video.muted = true })
        }
        video.muted = false
        const playing = video.play()
        if (playing && playing.catch) {
          playing.catch(() => {
            video.muted = true
            const retry = video.play()
            if (retry && retry.catch) retry.catch(() => {})
          })
        }
        window.addEventListener('pointerdown', unlock)
        window.addEventListener('keydown', unlock)
        const failsafe = setTimeout(finish, 18_000)
        return () => {
          disposed = true
          clearTimeout(failsafe)
          window.removeEventListener('pointerdown', unlock)
          window.removeEventListener('keydown', unlock)
        }
      }, [finish])

      const onTime = () => {
        const video = videoRef.current
        if (!video || !video.duration) return
        setPct(Math.max(0, Math.min(100, (video.currentTime / video.duration) * 100)))
      }

      return h(
        'div',
        { className: 'fz3-boot' + (out ? ' is-out' : '') },
        h('div', { className: 'fz3-boot-fill' },
          h('video', { src: '/fairy-zzz/assets/boot.mp4', muted: true, playsInline: true, autoPlay: true, loop: true, preload: 'auto' })),
        h('video', {
          ref: videoRef,
          src: '/fairy-zzz/assets/boot.mp4',
          poster: '/fairy-zzz/assets/poster.jpg',
          playsInline: true,
          preload: 'auto',
          onEnded: finish,
          onTimeUpdate: onTime,
        }),
        h(
          'div',
          { className: 'fz3-boot-hud' },
          h(
            'div',
            { className: 'fz3-boot-top' },
            h('span', null, t('boot.kicker')),
            h('span', null, 'FAIRY.OS ', h('b', null, '3.01')),
          ),
          h('span', { className: 'fz3-corner tl' }),
          h('span', { className: 'fz3-corner tr' }),
          h('span', { className: 'fz3-corner bl' }),
          h('span', { className: 'fz3-corner br' }),
          h(
            'div',
            { className: 'fz3-boot-foot' },
            h(
              'div',
              { className: 'fz3-boot-row' },
              h('span', { className: 'fz3-boot-title' }, 'H.D.D // SYSTEM BOOT'),
              h(
                'span',
                { className: 'fz3-boot-checks' },
                h('span', null, t('boot.check1')),
                h('span', null, t('boot.check2')),
                h('span', null, t('boot.check3')),
              ),
            ),
            h(
              'div',
              { className: 'fz3-boot-row' },
              h('span', { className: 'fz3-boot-bar' }, h('span', { style: { width: pct + '%' } })),
              h('span', { className: 'fz3-boot-pct' }, Math.round(pct) + '%'),
              h('button', { type: 'button', className: 'fz3-skip', onClick: finish }, t('boot.skip') + ' ▸'),
            ),
          ),
        ),
      )
    }

    /* ------------------------------------------------------------------ *
     * ———————————— */
    function VoiceAction(props) {
      const ref = useRef(null)
      const state = useVoice()
      const messageId = props && props.messageId
      const mode = state.busy ? 'busy' : state.speaking ? 'play' : 'idle'

      useEffect(() => {
        autoRead(ref.current, messageId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const onClick = useCallback(() => {
        if (state.busy || state.speaking) {
          stopSpeech()
          return
        }
        speakText(readMessageText(ref.current), { force: true })
      }, [state.busy, state.speaking])

      return h(
        'button',
        {
          ref,
          type: 'button',
          className: 'fz3-voice',
          'data-state': mode,
          title: mode === 'busy' ? 'Fairy 正在组织声带…' : '让 Fairy 念出来',
          'aria-label': 'Fairy 朗读',
          onClick,
        },
        h(
          'svg',
          { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' },
          h('path', { d: 'M4 9.5v5a1 1 0 0 0 1 1h2.6l3.6 3.1a1 1 0 0 0 1.7-.8V6.2a1 1 0 0 0-1.7-.8L7.6 8.5H5a1 1 0 0 0-1 1Z' }),
          h('path', { d: 'M16 8.6a4.6 4.6 0 0 1 0 6.8' }),
          h('path', { d: 'M18.8 6a8 8 0 0 1 0 12' }),
        ),
      )
    }

    /* ------------------------------------------------------------------ *
     * 背景氛围层 */
    function Atmos() {
      return h(
        'div',
        { className: 'fz3-atmos', 'aria-hidden': 'true' },
        h('div', { className: 'fz3-atmos-glow' }),
        h('div', { className: 'fz3-atmos-flash' }),
        h('div', { className: 'fz3-atmos-sweep' }),
        h('div', { className: 'fz3-atmos-frame' }),
        h('div', { className: 'fz3-rim' }),
        h('div', { className: 'fz3-bay' }),
      )
    }

    /* ------------------------------------------------------------------ *
     * 主界面：开机→问好→左下坞 */
    function greetLine() {
      const hh = new Date().getHours()
      if (hh >= 5 && hh < 11) return '主人，早上好。Fairy 已就位，今天的日程也已就位。'
      if (hh >= 11 && hh < 14) return '主人，中午好。饭可以不吃，进度不能停。'
      if (hh >= 14 && hh < 18) return '主人，下午好。H.D.D 在线，摸鱼请自便。'
      if (hh >= 18 && hh < 23) return '主人，晚上好。夜班系统已启动，本系统不困。'
      return '主人，夜深了。这个点还醒着，是需要我陪着，还是放不下手里的事？'
    }


    /* 气泡：usage 态给「余额 / 今日花费 / 峰谷」，turn 态只给「本轮花费 / 峰谷」 */
    function BubbleCard({ data }) {
      const { mode, x, y, loading, usage, balance } = data
      const peak = usage && usage.peak
      const bucket = usage ? (mode === 'turn' ? usage.turn : usage.today) : null
      const rows = []

      /* 峰谷剩余时间：每秒走一格，换价瞬间归零 */
      const [nowTick, setNowTick] = useState(() => Date.now())
      const nextAt = peak && peak.nextAt ? peak.nextAt : 0
      useEffect(() => {
        if (!nextAt) return undefined
        setNowTick(Date.now())
        const timer = setInterval(() => setNowTick(Date.now()), 1000)
        return () => clearInterval(timer)
      }, [nextAt])

      if (mode === 'usage') {
        rows.push(['余额', loading ? '…' : balance && balance.ok ? yuan(balance.amount) : '读取失败'])
        rows.push(['今日花费', loading ? '…' : bucket ? yuan(bucket.cost) : '—'])
      } else {
        rows.push(['本轮花费', loading ? '…' : bucket ? yuan(bucket.cost) : '—'])
      }
      rows.push(['峰谷', loading ? '…' : peak ? peak.label : '—'])

      const detail = []
      if (bucket && bucket.calls) {
        detail.push(
          `${bucket.calls} 次请求 · ${tokensText(bucket.hit)} 命中 / ${tokensText(bucket.miss)} 未命中 / ${tokensText(bucket.out)} 输出`,
        )
      }
      if (peak) {
        const flip = peak.offPeak ? '高峰' : '空闲'
        const left = nextAt - nowTick
        detail.push(
          nextAt
            ? left > 0
              ? `${peak.window} · ${leftText(left)}后转${flip}价`
              : `${peak.window} · 换价时刻已到，点眼徽刷新`
            : `${peak.window} · ${peak.next}`,
        )
      }
      if (mode === 'usage' && !loading && balance && !balance.ok && balance.reason) detail.push(balance.reason)

      return h(
        'div',
        {
          className: 'fz3-bubble',
          'data-mode': mode,
          'data-loading': loading ? '1' : '0',
          style: { left: x + 'px', top: y + 'px' },
        },
        h('div', { className: 'fz3-bubble-head' }, mode === 'turn' ? 'Fairy · 本轮结算' : 'Fairy · 用量'),
        rows.map(([k, v]) => h('div', { className: 'fz3-bubble-row', key: k }, h('span', { className: 'fz3-bubble-k' }, k), h('span', { className: 'fz3-bubble-v' }, h('b', null, v)))),
        detail.length ? h('div', { className: 'fz3-bubble-sub' }, detail.map((line, i) => h('div', { key: i }, line))) : null,
      )
    }

    function FairySkin() {
      const [phase, setPhase] = useState('boot')

      /* 运行态情绪：宿主 /fairy-zzz/mood 轮询（idle / thinking / working / done） */
      const [mood, setMood] = useState('idle')

      /* 眼徽拖拽：开关与坐标都放 localStorage，设置页改开关时靠事件通知这里 */
      const [dragOn, setDragOn] = useState(() => readBool(DRAG_KEY, true))
      const [dragging, setDragging] = useState(false)
      const [customPos, setCustomPos] = useState(() => {
        const saved = readStored(POS_KEY, null)
        return saved && Number.isFinite(saved.x) && Number.isFinite(saved.y) ? saved : null
      })
      const dragRef = useRef(null)

      /* 用量气泡：null = 收起；mode = 'usage'（余额·今日·峰谷）| 'turn'（本轮·峰谷） */
      const [bubble, setBubble] = useState(null)
      const bubbleTimer = useRef(null)

      const closeBubble = useCallback(() => {
        if (bubbleTimer.current) {
          clearTimeout(bubbleTimer.current)
          bubbleTimer.current = null
        }
        setBubble(null)
      }, [])

      const openBubble = useCallback(async (mode) => {
        const el = coreRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        /* 气泡默认挂在眼徽右侧；贴到窗口右/上/下边时回收，别飘出屏幕 */
        const W = 236
        const H = 162
        const cx = Math.min(Math.max(Math.round(r.right + 16), 12), Math.max(12, window.innerWidth - W - 12))
        const cy = Math.min(Math.max(Math.round(r.top + r.height / 2), H / 2 + 8), Math.max(H / 2 + 8, window.innerHeight - H / 2 - 8))
        const pos = { x: cx, y: cy }
        setBubble({ mode, ...pos, loading: true })
        if (bubbleTimer.current) {
          clearTimeout(bubbleTimer.current)
          bubbleTimer.current = null
        }
        const [usage, balance] = await Promise.all([fetchUsage(), mode === 'usage' ? fetchBalance() : Promise.resolve(null)])
        setBubble((prev) => (prev && prev.mode === mode ? { ...prev, ...pos, loading: false, usage, balance } : prev))
        if (mode === 'turn') {
          bubbleTimer.current = setTimeout(() => {
            bubbleTimer.current = null
            setBubble((prev) => (prev && prev.mode === 'turn' ? null : prev))
          }, 18_000)
        }
      }, [])

      const clampPos = useCallback((x, y) => {
        const root = document.documentElement
        const size = parseFloat(getComputedStyle(root).getPropertyValue('--fz3-dock-size')) || 128
        const half = size / 2 + 4
        return {
          x: Math.round(Math.min(Math.max(Number(x) || 0, half), window.innerWidth - half)),
          y: Math.round(Math.min(Math.max(Number(y) || 0, half), window.innerHeight - half)),
        }
      }, [])

      const applyPos = useCallback((p) => {
        const root = document.documentElement
        root.style.setProperty('--fz3-dock-x', p.x + 'px')
        root.style.setProperty('--fz3-dock-y', p.y + 'px')
      }, [])

      useEffect(() => {
        /* 官方字标位置测量：拿到 logo 行 / brandIdentity 的矩形，把我们的
           Fairy 字标钉在同一位置。字标本身由 CSS 隐藏（它是 SVG，没有文本）。 */
        let tries = 0
        const run = () => {
          const row = document.querySelector('[class*="_brandIdentity"]') || document.querySelector('[class*="_logoRow"]')
          if (!row) return false
          const r = row.getBoundingClientRect()
          if (r.width <= 0 || r.height <= 0) return false
          const root = document.documentElement
          root.style.setProperty('--fz3-brand-top', Math.round(r.top - 6) + 'px')
          root.style.setProperty('--fz3-brand-left', Math.round(r.left) + 'px')
          root.style.setProperty('--fz3-brand-h', Math.round(Math.max(34, r.height + 10)) + 'px')
          return true
        }
        const timer = setInterval(() => {
          tries += 1
          try { if (run() || tries > 14) clearInterval(timer) } catch (e) { clearInterval(timer) }
        }, 500)
        return () => clearInterval(timer)
      }, [])
      useEffect(() => {
        /* dock 定位：默认找到会话区（左侧最靠左的宽容器），把眼标钉在它的左缘中部，
           与参考视频里「对话时靠在聊天区左边」的位置一致；找不到就退回 25vw / 52vh。
           主人自己拖过之后改用记住的坐标，不再自动测量。 */
        if (customPos) {
          applyPos(clampPos(customPos.x, customPos.y))
          return undefined
        }
        let tries = 0
        let timer = null
        const measure = () => {
          let best = null
          const vw = window.innerWidth
          const all = document.querySelectorAll('div,main,section')
          for (let i = 0; i < all.length; i += 1) {
            const el = all[i]
            const r = el.getBoundingClientRect()
            if (r.width < 420 || r.height < 300) continue
            if (r.left < 260 || r.left > vw * 0.5) continue
            if (r.width > vw * 0.9) continue
            if (!best || r.left < best.left) best = r
          }
          const root = document.documentElement
          if (best) {
            const size = parseFloat(getComputedStyle(root).getPropertyValue('--fz3-dock-size')) || 128
            let cx = Math.round(best.left + size / 2 - 2)
            let cy = Math.round(best.top + best.height * 0.5)
            if (cx < vw * 0.16 || cx > vw * 0.46) cx = Math.round(vw * 0.25)
            if (cy < window.innerHeight * 0.22 || cy > window.innerHeight * 0.82) cy = Math.round(window.innerHeight * 0.52)
            root.style.setProperty('--fz3-dock-x', cx + 'px')
            root.style.setProperty('--fz3-dock-y', cy + 'px')
            window.__fz3Dock = { cx: cx, cy: cy, left: Math.round(best.left), top: Math.round(best.top), w: Math.round(best.width), h: Math.round(best.height) }
          } else if (typeof window !== 'undefined') {
            window.__fz3Dock = { cx: null, cy: null }
          }
          return !!best
        }
        const kick = () => {
          tries += 1
          try { if (measure() || tries > 16) clearInterval(timer) } catch (e) { clearInterval(timer) }
        }
        timer = setInterval(kick, 600)
        const onResize = () => setTimeout(kick, 260)
        window.addEventListener('resize', onResize)
        return () => { clearInterval(timer); window.removeEventListener('resize', onResize) }
      }, [customPos, applyPos, clampPos])

      /* 记住的位置也要跟着窗口缩放夹一下，别把眼标留在屏幕外 */
      useEffect(() => {
        if (!customPos) return undefined
        const onResize = () => applyPos(clampPos(customPos.x, customPos.y))
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
      }, [customPos, applyPos, clampPos])

      /* 设置页里的开关与「复位」通过自定义事件同步到这个图层 */
      useEffect(() => {
        const sync = () => setDragOn(readBool(DRAG_KEY, true))
        const onReset = () => {
          try { localStorage.removeItem(POS_KEY) } catch {}
          setCustomPos(null)
          setDragging(false)
          applyPos({ x: Math.round(window.innerWidth * 0.25), y: Math.round(window.innerHeight * 0.52) })
        }
        window.addEventListener('fz3:drag-pref', sync)
        window.addEventListener('fz3:dock-reset', onReset)
        window.addEventListener('storage', sync)
        return () => {
          window.removeEventListener('fz3:drag-pref', sync)
          window.removeEventListener('fz3:dock-reset', onReset)
          window.removeEventListener('storage', sync)
        }
      }, [])

      useEffect(() => {
        let alive = true
        const tick = () => {
          fetch('/fairy-zzz/mood', { cache: 'no-store' })
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
              if (alive && d && d.mood) setMood(d.mood)
            })
            .catch(() => {})
        }
        const timer = setInterval(tick, 900)
        tick()
        return () => {
          alive = false
          clearInterval(timer)
        }
      }, [])
      /* 一轮跑完 → 自动弹一次“本轮花费”，18 秒后自己消失 */
      const doneMark = useRef('')
      useEffect(() => {
        if (phase !== 'dock' || mood !== 'done') return
        const stamp = String(Date.now()).slice(0, -4)
        if (doneMark.current === stamp) return
        doneMark.current = stamp
        openBubble('turn')
      }, [mood, phase, openBubble])
      useEffect(() => closeBubble, [closeBubble])
      const [needTap, setNeedTap] = useState(false)
      const [engine, setEngine] = useState(null)
      const greetAudio = useRef(null)
      const coreRef = useRef(null)
      const voiceState = useVoice()

      const toGreet = useCallback(() => {
        stopSpeech()
        setPhase('greet')
      }, [])

      const toDock = useCallback(() => {
        setPhase('dock')
        setNeedTap(false)
        autoArmAt = Date.now() + 2600
      }, [])

      /* ———————————————————— 眼徽拖拽 ———————————————————— */
      const toggleBubble = useCallback(() => {
        if (phase !== 'dock') return
        if (bubble) {
          closeBubble()
          return
        }
        openBubble('usage')
      }, [bubble, phase, openBubble, closeBubble])

      const onCoreDown = (e) => {
        if (!dragOn || phase !== 'dock') return
        if (typeof e.button === 'number' && e.button !== 0) return
        const r = e.currentTarget.getBoundingClientRect()
        dragRef.current = {
          id: e.pointerId,
          dx: e.clientX - (r.left + r.width / 2),
          dy: e.clientY - (r.top + r.height / 2),
          sx: e.clientX,
          sy: e.clientY,
          moved: false,
        }
        try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
        e.preventDefault()
      }
      const onCoreMove = (e) => {
        const drag = dragRef.current
        if (!drag || drag.id !== e.pointerId) return
        if (!drag.moved) {
          if (Math.abs(e.clientX - drag.sx) < 4 && Math.abs(e.clientY - drag.sy) < 4) return
          drag.moved = true
          setDragging(true)
        }
        applyPos(clampPos(e.clientX - drag.dx, e.clientY - drag.dy))
        e.preventDefault()
      }
      const onCoreUp = (e) => {
        const drag = dragRef.current
        if (!drag || drag.id !== e.pointerId) return
        dragRef.current = null
        setDragging(false)
        /* 只是点了一下、没拖动 → 展开/收起用量气泡 */
        if (!drag.moved) {
          toggleBubble()
          return
        }
        const r = e.currentTarget.getBoundingClientRect()
        const next = clampPos(r.left + r.width / 2, r.top + r.height / 2)
        setCustomPos(next)
        writeStored(POS_KEY, next)
      }

      /* ———————————————————— */
      useEffect(() => {
        if (phase !== 'greet') return undefined
        let alive = true
        let timer = null
        const lock = setTimeout(() => {
          if (alive) toDock()
        }, 13_000)
        const audio = new Audio(GREETING())
        greetAudio.current = audio
        audio.volume = 0.95
        audio.onended = () => {
          if (!alive) return
          clearTimeout(lock)
          timer = setTimeout(() => {
            if (alive) toDock()
          }, 1900)
        }
        audio.play().then(
          () => {
            if (alive) setNeedTap(false)
          },
          () => {
            if (alive) setNeedTap(true)
          },
        )
        return () => {
          alive = false
          clearTimeout(lock)
          if (timer) clearTimeout(timer)
          try {
            audio.onended = null
            audio.pause()
          } catch {}
          greetAudio.current = null
        }
      }, [phase, toDock])

      const retryVoice = useCallback(() => {
        const audio = greetAudio.current
        if (!audio) return
        audio.play().then(
          () => setNeedTap(false),
          () => {},
        )
      }, [])

      /* 设置页里的「重播开机动画」→ 回到 boot 阶段 */
      useEffect(() => {
        const fn = () => { stopSpeech(); setPhase('boot') }
        bootHooks.add(fn)
        return () => { bootHooks.delete(fn) }
      }, [])

      const busy = voiceState.busy || voiceState.speaking

      return h(
        'div',
        { className: 'fz3-layer', 'data-phase': phase, 'data-mood': mood, 'data-drag': dragOn ? '1' : '0', 'data-dragging': dragging ? '1' : '0' },
        h(
          'div',
          { className: 'fz3-screen', onClick: needTap ? retryVoice : undefined },
          h('div', { className: 'fz3-bg' }),
          h('div', { className: 'fz3-hero' }),
          phase === 'boot' ? h(BootStage, { onDone: toGreet }) : null,
          phase !== 'boot' && needTap
            ? h('div', { className: 'fz3-copy-sub fz3-tap', style: { position: 'absolute', left: 0, right: 0, bottom: 'clamp(12px,5vh,44px)', textAlign: 'center' } }, t('greet.tap'))
            : null,
          phase === 'greet' ? h('button', { type: 'button', className: 'fz3-skip2', onClick: toDock }, 'SKIP ▸') : null,
        ),

        phase === 'dock'
          ? h(
              'div',
              { className: 'fz3-sb-brand', 'aria-hidden': 'true' },
              h('span', { className: 'fz3-sb-logo', dangerouslySetInnerHTML: { __html: FAIRY_EYE_SVG } }),
              h(
                'span',
                { className: 'fz3-sb-text' },
                h('b', null, 'Fairy'),
                h('i', null, 'Ⅲ型总序式集成泛用人工智能'),
              ),
            )
          : null,

        /* ———————————————————— */
        phase !== 'boot'
          ? h(
              'div',
              {
                ref: coreRef,
                className: 'fz3-core',
                'data-phase': phase,
                'data-drag': dragOn ? '1' : '0',
                onPointerDown: onCoreDown,
                onPointerMove: onCoreMove,
                onPointerUp: onCoreUp,
                onPointerCancel: onCoreUp,
                onClick: dragOn ? undefined : toggleBubble,
                title: phase === 'dock'
                  ? (dragOn ? '单击看用量，按住拖动位置' : '单击看用量 · Fairy 设置 → Fairy')
                  : undefined,
              },
              h(CoreGlyph, { phase, mood }),
            )
          : null,

        /* ———————————————————— 用量气泡 ———————————————————— */
        bubble
          ? h(BubbleCard, { key: bubble.mode, data: bubble })
          : null,

        /* ———————————————————— */
        phase !== 'boot'
          ? h(
              'div',
              { className: 'fz3-copy' },
              h('div', { className: 'fz3-copy-kicker' }, t('greet.kicker')),
              h('div', { className: 'fz3-copy-title-zh' }, '空 洞 深 潜 系 统'),
              h('div', { className: 'fz3-copy-title-wrap' }, h('div', { className: 'fz3-copy-title', 'data-text': 'HOLLOW DEEP DIVE SYSTEM' }, 'HOLLOW DEEP DIVE SYSTEM')),
              h(
                'div',
                { className: 'fz3-copy-lines' },
                h('span', null, greetLine()),
              ),
              h('div', { className: 'fz3-copy-sub' }, t('greet.sub')),
            )
          : null,

        /* 左下角标签 */
        h(
          'div',
          { className: 'fz3-tag' },
          h('b', null, t('dock.tag')),
          h('i', null, t('dock.tagsub')),
        ),

      )
    }

    /* ------------------------------------------------------------------ *
     * 挂载
     * ------------------------------------------------------------------ */
    return {
      inject: ['slots', 'remote', 'remote.account', 'locale'],
      apply(ctx) {
        runtime.ctx = ctx
        const guard = (label, fn) => {
          try {
            return fn()
          } catch (cause) {
            try {
              console.warn('[fairy-zzz] ' + label, cause)
            } catch {}
            return undefined
          }
        }

        guard('locale', () => {
          const locale = ctx.get && ctx.get('locale')
          if (!locale || typeof locale.register !== 'function') return
          locale.register(NS, 'zh-CN', ZH)
          locale.register(NS, 'en-US', EN)
          tr = locale.bind(NS)
        })

        guard('styles', () => {
          if (typeof document === 'undefined') return
          const tagId = PKG + '/fairy-zzz.css'
          if (document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']')) return
          const tag = document.createElement('style')
          tag.dataset.plugin = PKG
          tag.dataset.pluginCss = tagId
          tag.textContent = CSS
          document.head.appendChild(tag)
          if (ctx && typeof ctx.effect === 'function') {
            ctx.effect(() => () => {
              try { tag.remove() } catch {}
            })
          }
        })

        guard('tokens', () => {
          const theme = ctx.get && ctx.get('theme')
          if (theme && typeof theme.overrideTokens === 'function') theme.overrideTokens(PKG, TOKENS)
        })

        const mount = (key, spec, component) => {
          guard('inject:' + key, () => {
            ctx.slots.inject(key, () => {
              guard('register:' + key, () => {
                ctx.slots.register({ name: key, ...spec }, component)
              })
            })
          })
        }

        mount('sidebar.brand.mark', { id: 'fairy-zzz-brandmark', priority: 100 }, BrandMark)
        mount('sidebar.brand.name', { id: 'fairy-zzz-brandname', priority: 100 }, BrandName)
        mount('shell.overlay', { id: 'fairy-zzz-skin', order: 24 }, FairySkin)
        mount('shell.overlay', { id: 'fairy-zzz-atmos', order: 12 }, Atmos)
            mount('conversation.chat.assistant-actions', { id: 'fairy-zzz-voice', order: 20, label: '朗读' }, VoiceAction)
        mount('settings.section', { id: 'fairy-zzz-settings', order: 40, label: 'Fairy' }, FairySettings)
      },
    }
  },
})

