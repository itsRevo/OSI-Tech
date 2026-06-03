import nodemailer from 'nodemailer';
import {NextResponse} from 'next/server';

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) {
      return value;
    }
  }
  return undefined;
}

function normalizeLine(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function buildFromHeader(addressOrHeader: string, fallbackAddress: string) {
  const value = (addressOrHeader || '').trim();
  if (!value) {
    return `OsiTech Smart Repair <${fallbackAddress}>`;
  }

  if (value.includes('<') && value.includes('>')) {
    return value;
  }

  return `OsiTech Smart Repair <${value}>`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const source = normalizeLine(formData.get('source')) || 'website';
    const name = normalizeLine(formData.get('name'));
    const phone = normalizeLine(formData.get('phone'));
    const email = normalizeLine(formData.get('email'));
    const device = normalizeLine(formData.get('device'));
    const imei = normalizeLine(formData.get('imei'));
    const desiredDate = normalizeLine(formData.get('desiredDate'));
    const issue = normalizeLine(formData.get('issue'));
    const serviceType = normalizeLine(formData.get('serviceType'));
    const urgency = normalizeLine(formData.get('urgency'));

    const host = requireEnv('SMTP_HOST');
    const portRaw = requireEnv('SMTP_PORT');
    const user = requireEnv('SMTP_USER');
    const pass = getEnv('SMTP_PASS', 'SMTP_PASSWORD');
    if (!pass) {
      throw new Error('Missing required environment variable: SMTP_PASS (or SMTP_PASSWORD)');
    }

    const configuredFrom = getEnv('SMTP_FROM');
    const fromAddress = configuredFrom || user;
    const from = buildFromHeader(fromAddress, user);

    const port = Number(portRaw);
    if (!Number.isFinite(port)) {
      throw new Error('Invalid SMTP_PORT. Expected a number.');
    }
    const secure = port === 465;

    const to = process.env.CONTACT_TO_EMAIL ?? 'info@osi-tech.de';

    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const subject = `Neue Anfrage (${source})${device ? `: ${device}` : ''}`;

    const lines = [
      `Quelle: ${source}`,
      name ? `Name: ${name}` : null,
      phone ? `Telefon: ${phone}` : null,
      email ? `E-Mail: ${email}` : null,
      device ? `Gerät: ${device}` : null,
      imei ? `IMEI: ${imei}` : null,
      desiredDate ? `Wunschtermin: ${desiredDate}` : null,
      serviceType ? `Service-Art: ${serviceType}` : null,
      urgency ? `Dringlichkeit: ${urgency}` : null,
      issue ? `Problem: ${issue}` : null,
      '',
      '---',
      'Diese Nachricht wurde über osi-tech.de gesendet.',
    ].filter((line): line is string => Boolean(line));

    const text = lines.join('\n');

    await transport.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: email || undefined,
    });

    const referer = request.headers.get('referer');
    if (referer) {
      const url = new URL(referer);
      url.searchParams.set('sent', '1');
      return NextResponse.redirect(url, {status: 303});
    }

    return NextResponse.json({ok: true});
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Mail konnte nicht gesendet werden.';

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      {status: 500},
    );
  }
}
