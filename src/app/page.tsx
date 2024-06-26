import TaskCard from '@/components/TaskCard'
import { prisma } from '@/libs/prisma'


const loadTasks = async () => {
  return await prisma.task.findMany()
}
export const Home = async () => {
  const tasks = await loadTasks()
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-auto gap-4 max-w-screen px-5 xl:max-w-screen-xl mt-16'>
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </>
  )
}

export default Home