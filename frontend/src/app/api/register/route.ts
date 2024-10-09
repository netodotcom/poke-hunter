import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json();
    try {
        const registerResponse = await api.post(`/auth/register`, {
            username,
            email,
            password,
        });
        
        return NextResponse.json(registerResponse.data, { status: registerResponse.status });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 401 });
    }
}
