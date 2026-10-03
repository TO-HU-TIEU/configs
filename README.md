# configs
# Assistant shared configuration

Extension 1.3.0+ checks this repository every hour and when started. It downloads and validates the complete resource set against the manifest's SHA-256 hashes, then swaps the cached release as one unit. A failed or partial update keeps the last valid configuration. User sources, credentials, selected styles and personal prompts remain local.

| Resource | Purpose |
| --- | --- |
| `settings/general.json` | Source display names |
| `settings/limits.json` | Source length and bounded list/queue limits |
| `settings/endpoints.json` | Approved static preset resource |
| `sources/adapters.json` | Selectors for extracting primary article bodies |
| `presets/reply-styles.json` | Default reply styles |
| `prompts/content.json` | Content editorial guidance |
| `prompts/reply.json` | Reply guidance |
| `manifest.json` | Schema version, release version and resource hashes |

After editing JSON, run `node scripts/update-manifest.mjs NEW_VERSION`, validate with the extension test suite, then commit and push all files together. Every release must use a new version. To roll back, restore a previous resource set and publish it under a new version with recalculated hashes.

Only JSON is fetched. Local safety and language rules are preserved. Supported upper bounds: 20 sources, 120 stored articles, 120 queued articles, 10,000 source characters. New functionality, changed permissions or executable fixes require a new extension release. This repository cannot update extension JavaScript remotely.

## Content presets

`presets/content-styles.json` chứa phong cách soạn Content, tách riêng với phong cách trả lời. Extension 1.5.1 trở lên dùng lần lượt Góc nhìn sắc và Cơ chế & hệ quả. Preset chỉ điều chỉnh giọng viết; giới hạn độ dài và các ràng buộc dữ kiện/pháp luật được giữ trong extension. Mỗi release phải cập nhật manifest và hash tài nguyên bằng script phát hành.
