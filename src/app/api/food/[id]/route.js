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