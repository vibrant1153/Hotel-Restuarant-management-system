import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(){
    try{
        const session = await getServerSession(authOptions);
    }catch{

    }
}