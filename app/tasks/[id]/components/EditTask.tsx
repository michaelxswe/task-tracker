import Link from "next/link"

const EditTask = ({ id }: { id: string }) => {
  return (
    <Link href={`/tasks/${id}/edit`}>
      <button className="h-10 w-full rounded-md bg-[#172554] font-medium hover:bg-[#273466]">
        Edit Task
      </button>
    </Link>
  )
}

export { EditTask }
