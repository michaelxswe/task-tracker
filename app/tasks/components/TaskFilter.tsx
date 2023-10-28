'use client'
import { getQueryParamsUrl } from '@/app/utils/QueryParams'
import { Priority, Status, Team } from '@prisma/client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Select, Switch, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

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

let queryParams: { [key: string]: string } = {}

let late = 'false'

const TaskFilter = ({ teams }: { teams: Team[] }) => {
  const router = useRouter()

  return (
    <div className='space-y-6'>
      <div className='flex gap-6'>
        <div className='space-y-3'>
          <div>Team</div>
          <div>
            <Select.Root
              onValueChange={(teamId) => {
                if (teamId !== 'ALL') {
                  queryParams = { ...queryParams, teamId: teamId }
                } else {
                  delete queryParams?.teamId
                }

                router.push('/tasks' + getQueryParamsUrl(queryParams))
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
              if (status !== 'ALL') {
                queryParams = { ...queryParams, status: status }
              } else {
                delete queryParams?.status
              }

              router.push('/tasks' + getQueryParamsUrl(queryParams))
            }}
            defaultValue={'ALL'}
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
              if (priority !== 'ALL') {
                queryParams = { ...queryParams, priority: priority }
              } else {
                delete queryParams?.priority
              }

              router.push('/tasks' + getQueryParamsUrl(queryParams))
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
              if (created === 'desc') {
                queryParams = { ...queryParams, createdSortOrder: 'desc', sortFirst: 'created' }
              } else {
                queryParams = { ...queryParams, createdSortOrder: 'asc', sortFirst: 'created' }
              }

              router.push('/tasks' + getQueryParamsUrl(queryParams))
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
              if (deadline === 'desc') {
                queryParams = { ...queryParams, deadlineSortOrder: 'desc', sortFirst: 'deadline' }
              } else {
                queryParams = { ...queryParams, deadlineSortOrder: 'asc', sortFirst: 'deadline' }
              }

              router.push('/tasks' + getQueryParamsUrl(queryParams))
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

        <div className=' space-y-4'>
          <h5>Late</h5>
          <Switch
            size='3'
            onClick={() => {
              late = late === 'false' ? 'true' : 'false'
              queryParams = { ...queryParams, late: late }
              router.push('/tasks' + getQueryParamsUrl(queryParams))
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
            queryParams = { ...queryParams, title: e.target.value }
            router.push('/tasks' + getQueryParamsUrl(queryParams))
          }}
        />
      </TextField.Root>
    </div>
  )
}

export { TaskFilter }
