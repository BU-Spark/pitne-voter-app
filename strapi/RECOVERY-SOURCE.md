# Draft source reconciliation: do not merge or deploy yet

This draft preserves the Strapi source that was actually running during recovery. The repository was missing four API definitions and a candidate schema change. Those 17 runtime changes are restored byte for byte. The package adds only the reviewed `predevelop` hook; the original `develop` command, dependencies and lockfile stay unchanged. `spark-recovery-start.cjs` is the reviewed production guard, including its EXDEV-only image-directory fallback.

No uploaded files, uploaded filenames or hashes, database records, environment files, credentials, private incident captures or compiled builds belong in this change. The source manifest describes the 47 executable/package files and only the repository's `robots.txt` and empty upload placeholder. Production uploads remain on the durable volume.

## Why this must remain a draft

Removing upload metadata changes the source manifest hash. The live environment and its durable READY/initialized markers still bind to the previous private manifest. Deploying this draft with those existing bindings fails closed before Strapi starts. Do not merge, enable automatic deployment, or promote this branch until a separate, independently reviewed binding-migration controller is validated and scheduled. This draft performs no production migration.

The canonical repository default branch is `main`. Production currently watches `DeployedStrapiBranch`; its Strapi tree matched `main` when this draft was prepared, and both were missing the same runtime changes. This PR targets `main` only. It does not advance that production branch or change the Railway trigger. A future cutover must explicitly select the reviewed canonical commit and reconcile the production trigger under its own authorization; deploying the unchanged production branch would restore the old incomplete source.

The offline planner below prepares marker bytes without changing any upload entry. It is not an execution controller and does not stop writers, change provider variables, write a volume or deploy. Its tests prove the metadata transformation, not a production cutover.

## Controlled migration plan for a future approved cutover

1. Pause Git-triggered deployments and PR environments through a separately authorized operation before merging. Verify the exact production service, environment, volume and running deployment. Pin the reviewed commit/artifact; never substitute repository HEAD during recovery.
2. Capture the current source manifest, READY marker, initialized marker, current nonsecret binding variables and a fresh complete public-file inventory in private owner-only storage. Prove the current 47 source/package hashes equal this manifest. Preserve all current files, including legitimate uploads added after the original seed. Record the existing missing-media set; this migration does not restore historical missing media.
3. Use `plan-public-binding-migration.cjs` offline to create the replacement READY/initialized bytes and the two nonsecret binding values. It requires the exact old hashes, initialized bindings and unchanged 47 source/package hashes. It retains every seed-file hash and directory entry. Keep its input/output private because READY contains upload metadata.
4. Validate the whole future controller independently against disposable fixtures. Required cases include failure before either marker write, failure between the two marker writes, failed or uncertain provider stop, watchdog expiry, malformed/symlinked marker files, current uploads differing legitimately from the original seed, and preservation of every current public file. Confirm the new image contains only repository public files and runs the existing package hook with effective `npm config get ignore-scripts` equal to `false`.
5. During the approved maintenance window, freeze all application writer threads with process-identity checks and a bounded watchdog. Verify DB backends are idle with no open transaction or replication sender, then capture final source/public-file/DB baselines. Abort if the 47 source/package hashes changed. The controller must account for the fact that `/app/public` is already a symlink to the durable volume.
6. While the old writer is still frozen and its volume is accessible, stage and fsync both planned marker files, recheck their exact old bindings, then publish each by atomic rename and fsync the volume directory. Modify only READY and initialized metadata. Do not reseed, delete, rename or replace uploads. Confirm the old instance terminates before the absolute watchdog deadline with a safety margin. Two-file publication is not atomic as a pair, so the reviewed controller must handle every intermediate state. Before any stop request, a failed publication must restore both old marker bytes while freeze ownership is proven. After a stop request with uncertain outcome, stay fail-closed and reconcile provider state; do not restart the old image against new bindings.
7. Install only the planned `SPARK_VOTER_SOURCE_MANIFEST_SHA256` and `SPARK_VOTER_SEED_MANIFEST_SHA256` values with deployment suppressed. Preserve all replacement credentials and unrelated settings. Deploy the exact approved canonical source. Preserve the reviewed Node version policy and `NPM_CONFIG_IGNORE_SCRIPTS=false`; do not depend on config-as-code being accepted. Do not launch the old image with the new marker bindings.
8. Require the exact deployment to reach `SUCCESS`, the guard to verify and link durable public storage, and public candidate/media requests and health checks to pass. Independently compare the full DB/schema/sequence and final public-file baselines, actual source/package/lock hashes, existing missing-media set, marker bindings, raw variable references and unrelated services. Keep checkpoint material private until final independent PASS, then clean temporary copies according to the incident retention plan.

Marker planning can be exercised without provider access:

```sh
node --test test/public-binding-migration.test.cjs
node scripts/plan-public-binding-migration.cjs PRIVATE_INPUT spark-recovery-source-manifest.json PRIVATE_OUTPUT
```

Run these from `strapi`. `PRIVATE_INPUT` must be an existing owner-only directory, mode `0700`, containing mode `0600` files named `source.json`, `ready.json`, `initialized.json`, and `expected.json`. The last file contains only `expectedOldSourceHash` and `expectedOldSeedHash`, obtained by verified readback of the current nonsecret runtime values. `PRIVATE_OUTPUT` must not exist; the planner creates it with mode `0700` and writes its three outputs with mode `0600`. Never commit either directory.

Pending before merge: implement and independently validate the live freeze/paired-marker-publication/stop/config/deploy controller described above. No merge, provider configuration change, marker migration or deployment has been performed by this draft.
