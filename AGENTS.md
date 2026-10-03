# Shared Assistant configuration

Use JSON data only; never executable remote code or credentials. Keep resources separated by purpose. After a change, validate the extension's accepted schema and local upper bounds, update all resource hashes with `scripts/update-manifest.mjs` using a new version, then commit and push the complete release in one commit. The user's standing request is to push completed work to preserve rollback history.
