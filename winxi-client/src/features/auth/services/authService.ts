const TOKEN_KEY = 'winxi_access_token';
const REFRESH_KEY = 'winxi_refresh_token';

/* ─── Token helpers ─── */

export const getAccessToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_KEY);

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

/* ─── API helpers ─── */

const API_BASE = '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Error ${res.status}`);
  }
  return res.json();
}

/* ─── Auth endpoints ─── */

export interface TokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
}

/**
 * Login with username (email) and password.
 * The backend expects OAuth2 form-encoded data.
 */
export async function login(username: string, password: string): Promise<TokenResponse> {
  const body = new URLSearchParams({ username, password });

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await handleResponse<TokenResponse>(res);
  setTokens(data.access_token, data.refresh_token);
  return data;
}

/**
 * Refresh the access token using the stored refresh token.
 */
export async function refreshAccessToken(): Promise<AccessTokenResponse> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await handleResponse<AccessTokenResponse>(res);
  localStorage.setItem(TOKEN_KEY, data.access_token);
  return data;
}

/**
 * Logout the current user (revokes tokens on the backend).
 */
export async function logout(): Promise<void> {
  const token = getAccessToken();
  if (token) {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => { /* ignore network errors on logout */ });
  }
  clearTokens();
}
