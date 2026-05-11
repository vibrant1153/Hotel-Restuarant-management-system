import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET (request, {params}){
    try{
        const { id } = await params;
        const item = await prisma.foodItem.findUnique({ where: { id } });
        if (!item) return NextResponse.json({ error: 'Food item not found' }, { status: 404 });
        return NextResponse.json(item);
    }catch{
        return NextResponse.json({ error: 'Failed to fetch food item' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const data = await request.json();
    const item = await prisma.foodItem.update({ where: { id }, data });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update food item' }, { status: 500 });
  }
}