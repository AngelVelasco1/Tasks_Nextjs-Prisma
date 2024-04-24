"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
export default function TaskCard({ task }: any) {
    const router = useRouter()
    return (
        <div className='flex flex-col justify-center items-center p-8 bg-blue-400 shadow-md shadow-gray-600   rounded-lg gap-y-2 hover:cursor-pointer hover:opacity-85'
            onClick={() => router.push("/EditTask/" + task.id)}>
            <h2 className='text-2xl font-semibold text-zinc-800'>{task.name}</h2>
            <p className='text-md'>{task.description}</p>
            <small className='italic text-white'>{new Date(task.createAt).toLocaleDateString()}</small>
        </div>
    )
}
