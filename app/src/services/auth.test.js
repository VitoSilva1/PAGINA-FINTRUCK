import { decodeAccessToken } from './auth';

const makeToken = (payload) => {
  const base64Url = (obj) =>
    btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${base64Url({ alg: 'HS256', typ: 'JWT' })}.${base64Url(payload)}.sig`;
};

describe('decodeAccessToken', () => {
  it('returns payload when token is valid', () => {
    const token = makeToken({ sub: 'user-123', exp: 9999999999 });
    const payload = decodeAccessToken(token);
    expect(payload.sub).toBe('user-123');
    expect(payload.exp).toBe(9999999999);
  });

  it('returns null for malformed token', () => {
    expect(decodeAccessToken('invalid')).toBeNull();
    expect(decodeAccessToken('')).toBeNull();
  });
});
