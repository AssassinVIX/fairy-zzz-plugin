Fairy-DSH
Copyright 2026 Chengzhibense.

This package selectively adapts Fairy-DSH original mascot code under the
Apache License, Version 2.0. Upstream attribution is preserved verbatim in
licenses/Fairy-DSH-NOTICE.txt; the license is licenses/Apache-2.0.txt.
Trademarks/content limitations are preserved in licenses/Fairy-DSH-TRADEMARKS.md.
The upstream NOTICE's THIRD_PARTY_NOTICES.md concerns its dependencies;
none of those dependencies or the DSH application are included here.

Source: https://github.com/Chengzhibense/Fairy-DSH
Commit: d639887a386b0de6fef2e61c97dc268631854591
Source directory: fairy-visual/dsh-fairy-visual/src/client/

Modified/adapted files in pi-fairy-animation:
- assets/fairy.svg: mascot-geometry.js and mascot-eye-svg.js geometry,
  gradients, colors and eye layering. Converted to a standalone padded SVG;
  added named offline anchors and a separate theme contrast edge; retained
  white halos on light backgrounds; removed browser states, scanlines,
  glitches, clones and filters.
- assets/idle-motion.json: mascot-style.js and mascot-runtime.js normal-idle
  amplitudes, phase leads and Bezier parameters. Breathing retimed to 1.5s;
  rotation to 12s; normalized phase leads preserved.
- scripts/frame-svg.mjs: mascot-runtime.js Bezier inversion and alternating
  layer progress, reworked as pure offline sampling with exact endpoints,
  higher numerical precision, and square-symmetric rotation.

Generated derivatives covered by the same Apache-2.0 license/attribution:
- assets/frames/dark/000.png through 119.png
- assets/frames/light/000.png through 119.png
- docs/vector-preview.png and docs/vector-idle.gif
These are modified/adapted visual outputs, not original upstream binaries.
Keep this NOTICE and licenses/ with copies of generated assets.

The existing Pi plugin/runtime and pixel backend remain MIT; this notice
neither relicenses them nor grants rights to game characters or trademarks.
Fairy and Zenless Zone Zero belong to their respective rights holders.
This is an unofficial community adaptation, not official game art or an
assertion of endorsement. See LICENSES.md for file-level scope.
