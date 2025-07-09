// app/api/blogs/route.ts
import { axiosInstance } from '@/api/axios';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

const isProduction = process.env.NODE_ENV === 'production';

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await axiosInstance.post('/login', body);

    const response = NextResponse.json(res.data)
    response.cookies.set("sessionToken", res.data.sessionToken, {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 10000 * 3600 * 24 * 30) // 10 days
    })
    return response;
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 400 });
  }
}