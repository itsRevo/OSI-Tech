import {NextResponse} from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminSessionMaxAge,
  validateAdminCredentials,
} from '@/lib/adminAuth';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    const username = body.username?.trim() ?? '';
    const password = body.password ?? '';

    if (!username || !password) {
      return NextResponse.json(
        {error: 'Benutzername und Passwort sind erforderlich.'},
        {status: 400},
      );
    }

    const isValid = validateAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        {error: 'Ungültige Zugangsdaten.'},
        {status: 401},
      );
    }

    const response = NextResponse.json({success: true});
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: createAdminSession(username),
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: getAdminSessionMaxAge(),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Login fehlgeschlagen. Bitte erneut versuchen.',
      },
      {status: 500},
    );
  }
}
