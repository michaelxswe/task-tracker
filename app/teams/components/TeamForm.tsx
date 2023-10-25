'use client'

import { ErrorMessage } from '@/app/components/ErrorMessage'
import { Team } from '@prisma/client'
import { Dialog, Select, Tabs, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const TeamForm = ({ teams }: { teams: Team[] }) => {
  const router = useRouter()

  const [noTeam, setNoTeam] = useState(false)

  const [error, setError] = useState('')

  const [option, setOption] = useState<'create' | 'update' | 'delete'>('create')

  const [teamId, setTeamId] = useState<string | undefined>()

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (teams.length == 0) {
      setNoTeam(true)
      setTeamId(undefined)
    } else {
      setTeamId(String(teams[0].id))
    }
  }, [teams])

  const onSubmit = async () => {
    try {
      setSubmitting(true)

      if (option == 'create') {
        await axios.post('/api/teams', { name: name })
      } else if (option == 'update') {
        await axios.patch(`/api/teams/${teamId}`, { name: name })
      } else {
        await axios.delete(`/api/teams/${teamId}`)
      }

      setSubmitting(false)
      setOpen(false)
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setError(error.response.data.error)
      } else {
        setError('Unexpected error')
      }
    }
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger
        onClick={() => {
          setOpen(true)
          setError('')
        }}
      >
        <button className=' w-28 h-10 cursor-default rounded-md bg-[#0077ff3a] font-medium hover:bg-[#0077ff5a]'>Team</button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Tabs.Root defaultValue='create' onValueChange={(value) => setOption(value as 'create' | 'update' | 'delete')}>
          <Tabs.List>
            <Tabs.Trigger value='create'>
              <div className=' text-lg'>Create</div>
            </Tabs.Trigger>
            <Tabs.Trigger value='update'>
              <div className=' text-lg'>Update</div>
            </Tabs.Trigger>
            <Tabs.Trigger value='delete'>
              <div className=' text-lg'>Delete</div>
            </Tabs.Trigger>
          </Tabs.List>

          <div className='space-x-4 pt-3 pb-2 mt-3'>
            <Tabs.Content value='create'>
              <label>
                <div className='space-y-2'>
                  <div>Team Name</div>
                  <TextField.Input onChange={(e) => setName(e.target.value)} />
                </div>
              </label>
            </Tabs.Content>

            <Tabs.Content value='update'>
              {noTeam ? (
                <ErrorMessage>No Team exist</ErrorMessage>
              ) : (
                <label className='space-y-4'>
                  <div className='flex justify-center'>
                    <Select.Root size='3' defaultValue={String(teams[0]?.id)} onValueChange={(value) => setTeamId(value)}>
                      <Select.Trigger />
                      <Select.Content position='popper'>
                        {teams.map((team) => (
                          <Select.Item key={team.id} value={String(team.id)}>
                            {team.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div>New Team Name</div>
                  <TextField.Input onChange={(e) => setName(e.target.value)} />
                </label>
              )}
            </Tabs.Content>

            <Tabs.Content value='delete'>
              {noTeam ? (
                <ErrorMessage>No Team exist</ErrorMessage>
              ) : (
                <label className='space-y-4'>
                  <div className='flex justify-center'>
                    <Select.Root size='3' defaultValue={String(teams[0]?.id)} onValueChange={(value) => setTeamId(value)}>
                      <Select.Trigger />
                      <Select.Content position='popper'>
                        {teams.map((team) => (
                          <Select.Item key={team.id} value={String(team.id)}>
                            {team.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                </label>
              )}
            </Tabs.Content>
          </div>
        </Tabs.Root>

        <div className='flex gap-3 mt-4  h-10 justify-end'>
          <Dialog.Close className='cursor-default w-20 rounded-md bg-gray-800 font-medium hover:bg-gray-700' onClick={() => setOpen(false)}>
            <button>Cancle</button>
          </Dialog.Close>
          <Dialog.Close className='cursor-default w-20 rounded-md bg-[#134e4a] font-medium hover:bg-[#2a6a66] disabled:cursor-not-allowed disabled:opacity-50'>
            <button disabled={submitting || (noTeam && (option == "update" || option == "delete"))} onClick={onSubmit}>
              Save
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default TeamForm
