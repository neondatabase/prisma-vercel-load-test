import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const petName = searchParams.get('petName');
    const ownerName = searchParams.get('ownerName');

    try {
        if (!petName || !ownerName) throw new Error('Pet and owner names required');

        for (let i = 0; i < 50; i += 1) {
            await prisma.pets.create({
                name: `${petName}${i}`,
                owner: ownerName,
            });
        }

        let data = await prisma.pets.findMany();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
