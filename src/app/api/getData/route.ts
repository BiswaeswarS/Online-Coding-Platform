// app/api/getData/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Problem');
    const collection = db.collection('problems');
    
    const data = await collection.find({}).toArray();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
