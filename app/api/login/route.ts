// app/api/blogs/route.ts
import { axiosInstance } from '@/api/axios';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Login request body: ", body);
    const res = await axiosInstance.post('/login', body);
    // if (res.sessionToken) {
    //     const cookieStore = await cookies();
    //     const set = cookieStore.set("sessionToken", res.sessionToken, { httpOnly: true, secure: false, sameSite: 'lax', expires: new Date(Date.now() + 60 * 60 * 1000) }); // 1 hour expiration
    //     console.log("set cookie: ", set);
    // }
    console.log("inside: ", res.data)
    return NextResponse.json(res.data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 400 });
  }
}