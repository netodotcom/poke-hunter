import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
const API_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    try {
        const loginResponse = await api.post(`/auth/login`, {
            email,
            password,
        });
        const token = loginResponse.data.access_token
        cookies().set("accessToken", token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
        });

        return NextResponse.json(loginResponse.data, { status: loginResponse.status });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 401 });
    }
}
