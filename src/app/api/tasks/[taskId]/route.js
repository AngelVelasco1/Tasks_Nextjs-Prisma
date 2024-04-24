import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
export async function GET(req, { params }) {
    const taskId = Number(params.taskId)
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    })
    return NextResponse.json(task)
}

export async function PUT(req, { params }) {
    try {
        const data = await req.json()
        const taskId = Number(params.taskId)
        const task = await prisma.task.update({
            where: {
                id: taskId
            },
            data
        })
        return NextResponse.json({
            message: "Succesfully updated",
            Deleted: task
        })
    } catch(err) {
        return NextResponse.json({
            error: err.message
        })

    } 
}

export async function DELETE(req, { params }) {
    try {
        const taskId = Number(params.taskId)
        const task = await prisma.task.delete({
            where: {
                id: taskId
            }
        })
        return NextResponse.json({
            message: "Succesfully deleted",
            Deleted: task
        })
    } catch (err) {
        return NextResponse.json({
            error: err.message,
        })
    }
}