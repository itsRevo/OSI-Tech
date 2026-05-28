import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {ADMIN_SESSION_COOKIE, verifyAdminSessionToken} from '@/lib/adminAuth';

export async function GET() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(token);

  if (!session) {
    return NextResponse.json({authenticated: false}, {status: 401});
  }

  return NextResponse.json({
    authenticated: true,
    username: session.username,
    expiresAt: session.exp,
  });
}
