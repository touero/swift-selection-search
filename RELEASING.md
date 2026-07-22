# Automated releases

Pushing a tag in the format `v<manifest-version>` triggers [`.github/workflows/release.yml`](.github/workflows/release.yml), which:

1. Verifies that the tag matches the version in `src/manifest.json`.
2. Type-checks and builds the extension.
3. Creates a ZIP package.
4. Creates a GitHub Release and attaches the ZIP package.
5. Uploads the package to the Chrome Web Store and submits it for review and publication.

## Prerequisites

The extension entry must first be created manually in the Chrome Web Store, including its initial store listing. Automated releases retain the existing visibility settings. Uploaded versions remain subject to Chrome Web Store review.

Configure the following secrets under **GitHub repository → Settings → Secrets and variables → Actions**:

| Secret | Description |
| --- | --- |
| `CHROME_PUBLISHER_ID` | Publisher ID shown in the Chrome Web Store Developer Dashboard |
| `CHROME_EXTENSION_ID` | ID assigned to the extension by the Chrome Web Store |
| `CHROME_CLIENT_ID` | Google OAuth client ID |
| `CHROME_CLIENT_SECRET` | Google OAuth client secret |
| `CHROME_REFRESH_TOKEN` | OAuth refresh token with the `https://www.googleapis.com/auth/chromewebstore` scope |

The ID shown for a locally loaded unpacked extension is not necessarily the Chrome Web Store extension ID. Use the ID assigned to the store item.

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
