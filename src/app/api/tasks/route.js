import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"
export async function GET() {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
}

export async function POST(req) {
    const data = await req.json()
    if(!data.description) {
        data.description = "No description"
    }
    const newTask = await prisma.task.create({
        data
    })
    return NextResponse.json(newTask)
}