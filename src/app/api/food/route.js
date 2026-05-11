import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const where = {}
        if (category) where.category = category;
        await prisma.foodItem.findMany({ where, orderBy: { category: 'asc' } });
        return NextResponse.json(items);
    }
    catch (error) {
    return NextResponse.json({ error: 'Failed to fetch food items' }, { status: 500 });
  }
}