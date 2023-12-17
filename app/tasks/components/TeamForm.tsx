"use client"

import axios from "axios"
import { ErrorMessage } from "@/app/components/global/ErrorMessage"
import { Team } from "@prisma/client"
import { Dialog, Select, Tabs, TextField } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { useState } from "react"

const TeamForm = ({ teams }: { teams: Team[] }) => {
  const router = useRouter()

  const [error, setError] = useState("")

  const [option, setOption] = useState<"create" | "update" | "delete">("create")

  const [teamId, setTeamId] = useState<string | undefined>(
    teams[0]?.id ? String(teams[0].id) : undefined
  )

  const [open, setOpen] = useState(false)

  const [name, setName] = useState("")

  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async () => {
    try {
      setSubmitting(true)

      if (option == "create") {
        await axios.post("/api/teams", { name: name })
      } else if (option == "update") {
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
        setError("Unexpected error")
      }
    }
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger>
        <button
          onClick={() => {
            setOpen(true)
          }}
          className="w-28 h-10 rounded-md bg-[#0077ff3a] font-medium hover:bg-[#0077ff5a]"
        >
          Team
        </button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 400 }}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Tabs.Root
          defaultValue="create"
          onValueChange={(value) => setOption(value as "create" | "update" | "delete")}
        >
          <Tabs.List>
            <Tabs.Trigger value="create">
              <div className="text-lg">Create</div>
            </Tabs.Trigger>
            <Tabs.Trigger value="update">
              <div className="text-lg">Update</div>
            </Tabs.Trigger>
            <Tabs.Trigger value="delete">
              <div className="text-lg">Delete</div>
            </Tabs.Trigger>
          </Tabs.List>

          <div className="pt-5 pb-5">
            <Tabs.Content value="create">
              <div className="space-y-2">
                <div>Team Name</div>
                <TextField.Input onChange={(e) => setName(e.target.value)} />
              </div>
            </Tabs.Content>

            <Tabs.Content value="update">
              {!teams[0] ? (
                <ErrorMessage>No Team Found</ErrorMessage>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <Select.Root
                      size="3"
                      defaultValue={String(teams[0]?.id)}
                      onValueChange={(value) => setTeamId(value)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        {teams.map((team) => (
                          <Select.Item key={team.id} value={String(team.id)}>
                            {team.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <label className="block">New Team Name</label>
                  <TextField.Input onChange={(e) => setName(e.target.value)} />
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="delete">
              {!teams[0] ? (
                <ErrorMessage>No Team Found</ErrorMessage>
              ) : (
                <div className="flex justify-center">
                  <Select.Root
                    size="3"
                    defaultValue={String(teams[0]?.id)}
                    onValueChange={(value) => setTeamId(value)}
                  >
                    <Select.Trigger />
                    <Select.Content position="popper">
                      {teams.map((team) => (
                        <Select.Item key={team.id} value={String(team.id)}>
                          {team.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              )}
            </Tabs.Content>
          </div>
        </Tabs.Root>

        <div className="flex gap-5 justify-end">
          <Dialog.Close>
            <button
              disabled={submitting || (!teams[0] && (option == "update" || option == "delete"))}
              onClick={onSubmit}
              className="w-20 h-10 rounded-md bg-[#134e4a] font-medium hover:bg-[#2a6a66] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save
            </button>
          </Dialog.Close>
          <Dialog.Close>
            <button
              onClick={() => setOpen(false)}
              className="w-20 h-10 rounded-md bg-gray-800 font-medium hover:bg-gray-700"
            >
              Cancle
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { TeamForm }
