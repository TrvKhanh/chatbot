import { NextResponse } from 'next/server';
import clientPromise from '@/app/utils/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const posts = await db.collection('posts').find({}).toArray();
    return NextResponse.json(posts);
  } catch (err) {
    console.error('Failed to fetch posts:', err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const post = await request.json();
    const result = await db.collection('posts').insertOne(post);
    return NextResponse.json({ ...post, _id: result.insertedId });
  } catch (err) {
    console.error('Failed to create post:', err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id, ...updateData } = await request.json();
    const result = await db.collection('posts').updateOne(
      { id },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ id, ...updateData });
  } catch (err) {
    console.error('Failed to update post:', err);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = await request.json();
    const result = await db.collection('posts').deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ id });
  } catch (err) {
    console.error('Failed to delete post:', err);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
} 