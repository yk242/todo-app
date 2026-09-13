import { NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const traceId = request.headers.get('x-trace-id') || crypto.randomUUID();
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await prisma.todo.findFirst();
    return NextResponse.json({ message: 'DB waked up successfully' });
  } catch (err) {
    logger.error({ traceId, err }, 'Cron Error');
    return NextResponse.json({ error: 'Failed to wake up DB' }, { status: 500 });
  }
}
