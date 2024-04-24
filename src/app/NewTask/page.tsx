"use client"
import React, { useState, useEffect } from 'react'
import { showSuccessToast, showErrorToast } from '@/app/helpers/toasts'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';


export const NewTask = ({ params }: Params) => {
  const [name, setName]: any = useState("")
  const [description, setDescription]: any = useState("")

  const router = useRouter()
  useEffect(() => {
    if (params.taskId) {
      fetch(`/api/tasks/${params.taskId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name)
          setDescription(data.description)
        })
    }
  }, [params.taskId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!params.taskId) {
      try {
        const response = await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        showSuccessToast("Task Created")
        setTimeout(() => {

          router.push("/")
        }, 2000)
      } catch (err) {
        showErrorToast("Upps! Something was wrong")
      }
    } else {
      try {
        const response = await fetch(`/api/tasks/${params.taskId}`, {
          method: "PUT",
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = response.json();
        showSuccessToast("Task Updated")

        router.refresh()

        setTimeout(() => {
          router.push("/")
        }, 2000)
      } catch (err) {
        showErrorToast("Upps! Something was wrong")
      }
    }

  }

  const handleDelete = async() => {
    try {
      const response = await fetch(`/api/tasks/${params.taskId}`, {
        method: "DELETE",
      })
      showSuccessToast("Task Deleted");
      router.refresh()
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      showErrorToast("Upps! Something was wrong")
    }
  }
  return (
    <>
      <section className="mt-20">
        <div className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-1">


            <div className="rounded-lg bg-white py-2 shadow-lg lg:col-span-3 lg:p-10">
              <div className="lg:col-span-2 max-w-full pb-8 mx-auto">

                <div className="mt-8">
                  <a href="#" className="text-3xl font-bold text-pink-600">{(params.taskId) ? "Update" : "Create"} a task</a>

                </div>
              </div>
              <form action="#" className="space-y-4" onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-2'>
                  <div className="">
                    <label className="text-md font-bold text-gray-700" htmlFor="name">Task Name</label>
                    <input
                      className="w-full rounded-lg border-gray-600 p-3 text-sm"
                      placeholder="Name"
                      type="text"
                      name='name'
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      id="name"
                    />
                  </div>

                  <div >
                    <div>
                      <label className="text-md font-bold text-gray-700" htmlFor="email">Description</label>
                      <textarea
                        className="w-full rounded-lg border-gray-600 p-3 text-sm min-h-12 max-h-32"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        name='description'
                        id="description"
                        value={description}
                        rows={3}

                      />
                    </div>


                  </div>

                </div>



                <div className="pt-4 flex justify-evenly  ">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg  bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    {(!params.taskId) ? "Create" : "Update"}
                  </button>
                  {
                    (params.taskId) && <button className="inline-block w-full rounded-lg  bg-red-500 px-5 py-3 font-medium text-white sm:w-auto" type='button' onClick={handleDelete}>Delete</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>

  )
}

export default NewTask
