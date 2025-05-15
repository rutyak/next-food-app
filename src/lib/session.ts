import { cookies } from 'next/headers';

export function createSession(userId: string) {
  cookies().set('session', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export function getSession() {
  return cookies().get('session')?.value;
}

export function deleteSession() {
  cookies().set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
}