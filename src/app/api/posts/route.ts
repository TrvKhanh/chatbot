import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lấy danh sách bài viết
export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { date: 'desc' } });
  return NextResponse.json(posts);
}

// Thêm bài viết mới
export async function POST(req: NextRequest) {
  const { title, content, tags } = await req.json();
  const post = await prisma.post.create({
    data: { title, content, tags: tags.join(',') }
  });
  return NextResponse.json(post);
}

// Sửa bài viết
export async function PUT(req: NextRequest) {
  const { id, title, content, tags } = await req.json();
  const post = await prisma.post.update({
    where: { id },
    data: { title, content, tags: tags.join(',') }
  });
  return NextResponse.json(post);
}

// Xoá bài viết
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 