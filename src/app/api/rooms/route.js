import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const where = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (search) where.name = { contains: search, mode: 'insensitive' };
    const rooms = await prisma.room.findMany({ where, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}