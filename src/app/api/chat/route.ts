import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json();

    // Make request to backend
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error('Backend request failed');
    }

    const data = await response.json();

    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 