'use client'

import { Priority, Status, Team } from '@prisma/client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Select, Switch, TextField } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: Status.OPEN },
  { label: 'In Progress', value: Status.IN_PROGRESS },
  { label: 'Help Needed', value: Status.HELP_NEEDED },
  { label: 'Closed', value: Status.CLOSED }
]

const priorities: { label: string; value: Priority | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Low', value: Priority.LOW },
  { label: 'Medium', value: Priority.MEDIUM },
  { label: 'High', value: Priority.HIGH }
]

let late = false

const TaskFilter = ({ teams, status }: { teams: Team[]; status?: Status }) => {
  
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const router = useRouter()

  const applyFilter = (newParams: URLSearchParams) => {
    newParams.set('page', '1')
    router.push('?' + newParams.toString())
  }

  return (
    <div className='space-y-5'>
      <div className='flex gap-10'>
        <div className='flex flex-col gap-2 justify-center'>
          <div>Team</div>
          <Select.Root
            onValueChange={(teamId) => {
              teamId === 'ALL' ? params.delete('team-id') : params.set('team-id', teamId)
              applyFilter(params)
            }}
            defaultValue={'ALL'}
          >
            <Select.Trigger />
            <Select.Content position='popper'>
              <Select.Item value={'ALL'}>All</Select.Item>
              {teams.map((team) => (
                <Select.Item key={team.id} value={String(team.id)}>
                  {team.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <div className='flex flex-col gap-2 justify-center'>
          <div>Status</div>
          <Select.Root
            onValueChange={(status) => {
              status === 'ALL' ? params.delete('status') : params.set('status', status)
              applyFilter(params)
            }}
            defaultValue={status || 'ALL'}
          >
            <Select.Trigger />
            <Select.Content>
              {statuses.map((status) => (
                <Select.Item key={status.value} value={status.value}>
                  {status.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <div className='flex flex-col gap-2 justify-center'>
          <div>Priority</div>
          <Select.Root
            onValueChange={(priority) => {
              priority === 'ALL' ? params.delete('priority') : params.set('priority', priority)
              applyFilter(params)
            }}
            defaultValue={'ALL'}
          >
            <Select.Trigger />
            <Select.Content>
              {priorities.map((priority) => (
                <Select.Item key={priority.value} value={priority.value}>
                  {priority.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <div className='flex flex-col gap-2 justify-center'>
          <div>Created</div>
          <Select.Root
            onValueChange={(created) => {
              created === 'asc' ? params.set('created-asc', 'true') : params.delete('created-asc')
              params.delete('sort-deadline-first')
              applyFilter(params)
            }}
            defaultValue={'desc'}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item key={'desc'} value={'desc'}>
                Descending
              </Select.Item>
              <Select.Item key={'asc'} value={'asc'}>
                Ascending
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div className='flex flex-col gap-2 justify-center'>
          <div>Deadline</div>
          <Select.Root
            onValueChange={(deadline) => {
              deadline === 'desc' ? params.set('deadline-desc', 'true') : params.delete('deadline-desc')
              params.set('sort-deadline-first', 'true')
              applyFilter(params)
            }}
            defaultValue={'asc'}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item key={'desc'} value={'desc'}>
                Descending
              </Select.Item>
              <Select.Item key={'asc'} value={'asc'}>
                Ascending
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div className='flex flex-col gap-2 justify-center'>
          <div>Late</div>
          <Switch
            size='3'
            onClick={() => {
              late = !late
              late ? params.set('late', late.toString()) : params.delete('late')
              applyFilter(params)
            }}
          />
        </div>
      </div>

      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height='20' width='20' />
        </TextField.Slot>
        <TextField.Input
          size='3'
          placeholder='Search the tasks…'
          onChange={(e) => {
            e.target.value ? params.set('title', e.target.value) : params.delete('title')
            applyFilter(params)
          }}
        />
      </TextField.Root>
    </div>
  )
}

export { TaskFilter }
