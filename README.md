# Swift Selection Search for Chrome

This project is a fork of [CanisLupus/swift-selection-search](https://github.com/CanisLupus/swift-selection-search), adapted for Chrome.

The upstream project is a Firefox extension. This fork updates its background process, permissions, and content scripts for **Chrome Manifest V3**, while preserving the following core features:

- Display a search-engine popup after selecting text
- Search selected text with custom search engines
- Configure the popup appearance and result-opening behavior
- Search from the context menu
- Keyboard shortcuts
- Import and export settings

Chrome does not provide all of the APIs available in Firefox. Consequently, this version cannot read or import the browser's built-in search engines, and Chrome context-menu items cannot distinguish between middle- and right-button clicks. Custom search engines are unaffected.

## Build

Node.js 22 or a compatible version is recommended:

```bash
npm install
npm run typecheck
npm run build
```

The generated JavaScript files are written to the `src` directory.

## Load in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the repository's `src` directory.
5. After changing the code, run `npm run build`, reload the extension, and refresh the pages being tested.

Chrome extensions cannot run on `chrome://` pages or Chrome Web Store pages due to browser security restrictions.

## Automated releases

Pushing a tag in the format `v<manifest-version>` triggers `.github/workflows/release.yml`, which:

1. Verifies that the tag matches the version in `src/manifest.json`.
2. type-checks and builds the extension.
3. Creates a ZIP package.
4. Creates a GitHub Release and attaches the ZIP package.
5. Uploads the package to the Chrome Web Store and submits it for review and publication.

Example:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Configure the following secrets under **GitHub repository → Settings → Secrets and variables → Actions**:

| Secret | Description |
| --- | --- |
| `CHROME_PUBLISHER_ID` | Publisher ID shown in the Chrome Web Store Developer Dashboard |
| `CHROME_EXTENSION_ID` | ID of the extension in the Chrome Web Store |
| `CHROME_CLIENT_ID` | Google OAuth client ID |
| `CHROME_CLIENT_SECRET` | Google OAuth client secret |
| `CHROME_REFRESH_TOKEN` | OAuth refresh token with the `https://www.googleapis.com/auth/chromewebstore` scope |

The extension entry must first be created manually in the Chrome Web Store, including its initial store listing. Automated releases retain the existing visibility settings. Uploaded versions remain subject to Chrome Web Store review.

## Upstream project and license

- Upstream: [CanisLupus/swift-selection-search](https://github.com/CanisLupus/swift-selection-search)
- Original author: Daniel Lobo
- License: [MIT](LICENSE)
