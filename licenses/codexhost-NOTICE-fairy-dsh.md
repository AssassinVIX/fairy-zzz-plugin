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

The direct upstream's original attribution is preserved verbatim in
licenses/fairy-zzz-plugin-NOTICE.md. Its Pi/offline-frame file list refers
to that upstream adaptation, not files distributed by this package.

Modified/adapted components distributed by codex-host-theme-hdd-fairy:
- client.js: FAIRY_EYE_SVG, layered mascot geometry, gradients, colors,
  eye layering, eyelid/blink animation and state timing, adapted via
  AssassinVIX/fairy-zzz-plugin 1.0.3, commit
  71a3008f1645fd0117b115988a6bda87eaf813b9.
- CodexHost adaptation: replaced host bindings and session-status input;
  removed audio, account/log scanning and Agent preset integration;
  adapted settings, themes, layout and cleanup. Preserved the SVG's
  copyright and SPDX attribution and the visual state animations.

For historical context, the direct upstream notice lists these adaptations
in pi-fairy-animation (those files and generated frames are not shipped here):
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

Historical generated derivatives listed by the direct upstream notice:
- assets/frames/dark/000.png through 119.png
- assets/frames/light/000.png through 119.png
- docs/vector-preview.png and docs/vector-idle.gif
These historical files are not distributed by this CodexHost package.
Keep this NOTICE and licenses/ with copies of the adapted eye/animation code.

The existing plugin and CodexHost adaptation remain MIT; this notice
neither relicenses them nor grants rights to game characters or trademarks.
Fairy and Zenless Zone Zero belong to their respective rights holders.
This is an unofficial community adaptation, not official game art or an
assertion of endorsement. See CREDITS.md for file-level scope.
