import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/utils/mongodb';
import { ObjectId } from 'mongodb';

// Lấy danh sách bài viết
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('bigk');
    const posts = await db.collection('posts')
      .find({}, { projection: { title: 1, date: 1, tags: 1, _id: 1 } })
      .sort({ date: -1 })
      .limit(20)
      .toArray();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Thêm bài viết mới
export async function POST(req: NextRequest) {
  try {
    const { title, content, tags } = await req.json();
    const client = await clientPromise;
    const db = client.db('bigk');
    const post = {
      title,
      content,
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []),
      date: new Date()
    };
    const result = await db.collection('posts').insertOne(post);
    return NextResponse.json({ ...post, _id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


// Sửa bài viết: Ghi đè toàn bộ nội dung
export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, tags } = await req.json();

    const client = await clientPromise;
    const db = client.db('bigk');

    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };

    const newPost = {
      title,
      content,
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []),
      date: new Date() // cập nhật ngày sửa bài viết
    };

    const result = await db.collection('posts').replaceOne(filter, newPost);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Trả về bài viết mới đã ghi đè
    return NextResponse.json({ ...newPost, _id: id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


// Xoá bài viết
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db('bigk');
    // Nếu id là ObjectId hợp lệ, xóa theo _id, nếu không thì xóa theo id
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };
    await db.collection('posts').deleteOne(filter);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 