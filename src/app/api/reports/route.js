import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(){
    try{
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const [totalRooms, totalCustomers, totalFoodOrders, roomsByType, roomsByStatus, foodByCategory, recentOrders] = await Promise.all([
      prisma.room.count(),
      prisma.user.count({ where: { role: 'GUEST' } }),
      prisma.foodOrder.count(),
      prisma.room.groupBy({ by: ['type'], _count: true, _avg: { price: true } }),
      prisma.room.groupBy({ by: ['status'], _count: true }),
      prisma.foodOrder.findMany({ select: { items: true } }),
      prisma.foodOrder.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true } } } }),
    ]);
    }
    }catch{

    }
}