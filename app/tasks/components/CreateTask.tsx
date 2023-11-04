import Link from 'next/link'

const CreateTask = () => {
  return (
    <Link href='/tasks/new'>
      <button className='w-28 h-10 rounded-md bg-[#0077ff3a] font-medium hover:bg-[#0077ff5a]'>
        Create Task
      </button>
    </Link>
  )
}

export { CreateTask }
