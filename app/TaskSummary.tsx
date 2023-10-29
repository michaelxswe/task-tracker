'use client'

import { Status } from '@prisma/client'
import { Card, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
  open: number
  inProgress: number
  helpNeeded: number
  closed: number
}

const TaskSummary = ({ open, inProgress, helpNeeded, closed }: Props) => {
  const containers: { label: string; value: number; status: Status; color: 'red' | 'blue' | 'orange' | 'green' }[] = [
    { label: 'Open', value: open, status: Status.OPEN, color: 'red' },
    { label: 'In Progress', value: inProgress, status: Status.IN_PROGRESS, color: 'blue' },
    { label: 'Help Needed', value: helpNeeded, status: Status.HELP_NEEDED, color: 'orange' },
    { label: 'Closed', value: closed, status: Status.CLOSED, color: 'green' }
  ]

  return (
    <div className='flex gap-5'>
      {containers.map((container) => (
        <Card className='transition-colors duration-200 hover:bg-gray-800' key={container.label}>
          <Link href={`/tasks?status=${container.status}`}>
            <div className='space-y-2'>
              <div>
                <Text color={container.color}>{container.label}</Text>
              </div>
              <div>
                <Text size='5' color={container.color} className='font-bold'>
                  {container.value}
                </Text>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export { TaskSummary }
