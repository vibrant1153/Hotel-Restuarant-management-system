import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


export async function GET(request, {params}){
     try {
    const { id } = await params;
    const room = await prisma.room.findUnique({ where: { id } });
    if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
  }
}