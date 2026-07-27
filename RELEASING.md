# Automated releases

Pushing a tag in the format `v<manifest-version>` triggers [`.github/workflows/release.yml`](.github/workflows/release.yml), which:

1. Verifies that the tag matches the version in `src/manifest.json`.
2. Type-checks and builds the extension.
3. Creates a ZIP package.
4. Creates or updates a GitHub Release and attaches the ZIP package.
5. Uploads the ZIP to the Chrome Web Store.
6. Publishes the uploaded version to the Chrome Web Store.

You can also run the workflow manually from GitHub Actions with `workflow_dispatch` and provide an existing tag.

## Required GitHub secrets

Add these in GitHub repository **Settings → Secrets and variables → Actions → New repository secret**:

- `CHROME_EXTENSION_ID`: the Chrome Web Store extension/item ID.
- `CHROME_CLIENT_ID`: OAuth client ID from Google Cloud Console.
- `CHROME_CLIENT_SECRET`: OAuth client secret from Google Cloud Console.
- `CHROME_REFRESH_TOKEN`: OAuth refresh token authorized for Chrome Web Store publishing.

## How to create the Chrome Web Store OAuth secrets

One-time setup:

1. Open Google Cloud Console and create/select a project.
2. Enable **Chrome Web Store API** for the project.
3. Configure the OAuth consent screen if prompted.
4. Create an OAuth **Web application** client.
5. Add one of these authorized redirect URIs:

   ```text
   https://developers.google.com/oauthplayground
   http://127.0.0.1:53682/oauth2callback
   ```

6. Copy the client ID and client secret into `CHROME_CLIENT_ID` and `CHROME_CLIENT_SECRET`.

### Option A: OAuth Playground

1. Open <https://developers.google.com/oauthplayground>.
2. Click the gear icon, enable **Use your own OAuth credentials**, and paste the client ID/secret.
3. In the scope input, enter:

   ```text
   https://www.googleapis.com/auth/chromewebstore
   ```

4. Click **Authorize APIs**, sign in with the Chrome Web Store publisher account, then click **Exchange authorization code for tokens**.
5. Copy the returned refresh token into `CHROME_REFRESH_TOKEN`.

### Option B: local helper script, if OAuth Playground redirects or is unavailable

Run this locally:

```bash
CHROME_CLIENT_ID="your-client-id" \
CHROME_CLIENT_SECRET="your-client-secret" \
node scripts/get-chrome-refresh-token.mjs
```

The script opens the Google authorization URL directly and prints `CHROME_REFRESH_TOKEN` after authorization.

## Create a release

Update the versions in the following files before creating a tag:

- `src/manifest.json`
- `package.json`
- `package-lock.json`

The tag must exactly match the manifest version with a `v` prefix. For version `1.0.1`:

```bash
git tag v1.0.1
git push origin v1.0.1
```

GitHub automatically supplies `GITHUB_TOKEN`; it does not need to be configured manually.

By default the workflow publishes to the public/default Chrome Web Store channel. Manual runs can choose `trustedTesters` instead.
