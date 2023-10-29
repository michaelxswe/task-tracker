'use client'

import { Card } from '@radix-ui/themes'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell } from 'recharts'

interface Props {
  open: number
  inProgress: number
  helpNeeded: number
  closed: number
}

const TaskChart = ({ open, inProgress, helpNeeded, closed }: Props) => {
  const data = [
    { label: 'Open', value: open, color: '#ff9592' },
    { label: 'In Progress', value: inProgress, color: '#70b8ff' },
    { label: 'Help Needed', value: helpNeeded, color: '#ffa057' },
    { label: 'Closed', value: closed, color: '#3dd68c' }
  ]

  const maxValue = Math.max(...data.map((item) => item.value))

  const generateTicks = (max: number) => {
    const ticks = []
    for (let i = 0; i <= max; i++) {
      ticks.push(i)
    }
    return ticks
  }

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis domain={[0, maxValue]} ticks={generateTicks(maxValue)} />
          <Bar dataKey='value' barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export { TaskChart }
