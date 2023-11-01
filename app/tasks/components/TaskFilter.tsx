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

const TaskFilter = ({ teams, status }: { teams: Team[], status?: Status }) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const router = useRouter()

  const applyFilterAndResetPage = (newParams: URLSearchParams) => {
    // Reset to the first page
    newParams.set('page', '1')
    router.push('?' + newParams.toString())
  }

  return (
    <div className='space-y-6'>
      <div className='flex gap-6'>
        <div className='space-y-3'>
          <div>Team</div>
          <div>
            <Select.Root
              onValueChange={(teamId) => {
                teamId === 'ALL' ? params.delete('teamId') : params.set('teamId', teamId)
                // router.push('?' + params.toString())
                applyFilterAndResetPage(params)
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
        </div>

        <div className='space-y-3'>
          <h5>Status</h5>
          <Select.Root
            onValueChange={(status) => {
              status === 'ALL' ? params.delete('status') : params.set('status', status)
              applyFilterAndResetPage(params)
            }}
            defaultValue={status ? status :'ALL'}
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

        <div className='space-y-3'>
          <h5>Priority</h5>
          <Select.Root
            onValueChange={(priority) => {
              priority === 'ALL' ? params.delete('priority') : params.set('priority', priority)
              applyFilterAndResetPage(params)
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

        <div className='space-y-3'>
          <h5>Created</h5>
          <Select.Root
            onValueChange={(created) => {
              created === 'asc' ? params.set('createdSortInAsc', 'true') : params.delete('createdSortInAsc')
              params.delete('sortDeadlineFirst')
              applyFilterAndResetPage(params)
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

        <div className='space-y-3'>
          <h5>Deadline</h5>
          <Select.Root
            onValueChange={(deadline) => {
              deadline === 'desc' ? params.set('DeadlineSortInDesc', 'true') : params.delete('DeadlineSortInDesc')
              params.set('sortDeadlineFirst', 'true')
              applyFilterAndResetPage(params)
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

        <div className=' space-y-4'>
          <h5>Late</h5>
          <Switch
            size='3'
            onClick={() => {
              late = !late
              late ? params.set('late', late.toString()) : params.delete('late')
              applyFilterAndResetPage(params)
            }}
          />
        </div>
      </div>

      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
        <TextField.Input
          size='3'
          placeholder='Search the tasks…'
          onChange={(e) => {
            e.target.value ? params.set('title', e.target.value) : params.delete('title')
            applyFilterAndResetPage(params)
          }}
        />
      </TextField.Root>
    </div>
  )
}

export { TaskFilter}
