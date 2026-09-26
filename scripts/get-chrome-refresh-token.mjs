#!/usr/bin/env node
import http from 'node:http';
import { exec } from 'node:child_process';

const clientId = process.env.CHROME_CLIENT_ID;
const clientSecret = process.env.CHROME_CLIENT_SECRET;
const port = Number(process.env.OAUTH_PORT || 53682);
const redirectUri = `http://127.0.0.1:${port}/oauth2callback`;
const scope = 'https://www.googleapis.com/auth/chromewebstore';

if (!clientId || !clientSecret) {
  console.error('Please set CHROME_CLIENT_ID and CHROME_CLIENT_SECRET first.');
  console.error('Example:');
  console.error('  CHROME_CLIENT_ID="..." CHROME_CLIENT_SECRET="..." node scripts/get-chrome-refresh-token.mjs');
  process.exit(1);
}

function openBrowser(url) {
  const command = process.platform === 'darwin'
    ? `open "${url}"`
    : process.platform === 'win32'
      ? `start "" "${url}"`
      : `xdg-open "${url}"`;
  exec(command, () => {});
}

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('redirect_uri', redirectUri);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', scope);
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent');

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, redirectUri);

  if (requestUrl.pathname !== '/oauth2callback') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const error = requestUrl.searchParams.get('error');
  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`OAuth error: ${error}`);
    console.error(`OAuth error: ${error}`);
    server.close();
    return;
  }

  const code = requestUrl.searchParams.get('code');
  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Missing authorization code.');
    console.error('Missing authorization code.');
    server.close();
    return;
  }

  try {
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const tokenJson = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenJson.refresh_token) {
      throw new Error(JSON.stringify(tokenJson, null, 2));
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Success</h1><p>You can close this tab and return to the terminal.</p>');

    console.log('\nCHROME_REFRESH_TOKEN=');
    console.log(tokenJson.refresh_token);
    console.log('\nAdd this value to GitHub Actions secrets as CHROME_REFRESH_TOKEN.');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Failed to exchange authorization code. Check the terminal.');
    console.error('Failed to exchange authorization code:');
    console.error(err.message || err);
  } finally {
    server.close();
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Listening on ${redirectUri}`);
  console.log('\nBefore continuing, add this Authorized redirect URI to your Google OAuth Web application:');
  console.log(`  ${redirectUri}`);
  console.log('\nOpen this URL to authorize:');
  console.log(authUrl.toString());
  openBrowser(authUrl.toString());
});
