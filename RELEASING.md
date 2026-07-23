# Automated releases

Pushing a tag in the format `v<manifest-version>` triggers [`.github/workflows/release.yml`](.github/workflows/release.yml), which:

1. Verifies that the tag matches the version in `src/manifest.json`.
2. Type-checks and builds the extension.
3. Creates a ZIP package.
4. Creates a GitHub Release and attaches the ZIP package.

The workflow does not upload or publish the package to the Chrome Web Store.

## Create a release

Update the versions in the following files before creating a tag:

- `src/manifest.json`
- `package.json`
- `package-lock.json`

The tag must exactly match the manifest version with a `v` prefix. For version `1.0.0`:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub automatically supplies `GITHUB_TOKEN`; it does not need to be configured manually.
