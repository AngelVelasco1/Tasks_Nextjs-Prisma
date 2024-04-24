"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
export default function TaskCard({ task }: any) {
    const router = useRouter()
    return (
        <div className='flex flex-col justify-center items-center bg-blue-400  py-12 rounded-lg hover:cursor-pointer hover:opacity-85'
            onClick={() => router.push("/EditTask/" + task.id)}>
            <h2 className='text-lg font-semibold text-blue-950'>{task.name}</h2>
            <p>{task.description}</p>
            <small>{new Date(task.createAt).toLocaleDateString()}</small>
        </div>
    )
}
