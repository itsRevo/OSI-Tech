import crypto from 'node:crypto';

export const ADMIN_SESSION_COOKIE = 'osi_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

type AdminSessionPayload = {
  username: string;
  exp: number;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getSessionSecret() {
  return getRequiredEnv('ADMIN_SESSION_SECRET');
}

function timingSafeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function getConfiguredAdminUsers() {
  const users = process.env.ADMIN_USERS;

  if (users?.trim()) {
    return users
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [username, ...passwordParts] = entry.split(':');
        const password = passwordParts.join(':');

        if (!username?.trim() || !password) {
          throw new Error(
            'Invalid ADMIN_USERS format. Use username:password,username2:password2',
          );
        }

        return {
          username: username.trim(),
          password,
        };
      });
  }

  return [
    {
      username: getRequiredEnv('ADMIN_USERNAME').trim(),
      password: getRequiredEnv('ADMIN_PASSWORD'),
    },
  ];
}

export function validateAdminCredentials(username: string, password: string) {
  const normalizedUsername = username.trim();

  return getConfiguredAdminUsers().some((configuredUser) => {
    return (
      timingSafeEqual(normalizedUsername, configuredUser.username) &&
      timingSafeEqual(password, configuredUser.password)
    );
  });
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString('base64url');
}

function signPayload(payload: string) {
  return crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url');
}

export function createAdminSession(username: string) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload: AdminSessionPayload = {
    username,
    exp,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string | undefined,
): AdminSessionPayload | null {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split('.');

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payload);
  if (!timingSafeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8'),
    ) as AdminSessionPayload;

    if (!parsed?.username || !parsed?.exp) {
      return null;
    }

    if (parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getAdminSessionMaxAge() {
  return SESSION_MAX_AGE_SECONDS;
}

export async function requireAdminSessionFromCookie(
  rawToken: string | undefined,
) {
  const session = verifyAdminSessionToken(rawToken);

  if (!session) {
    throw new Error('UNAUTHORIZED');
  }

  return session;
}
