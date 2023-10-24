import { Callout } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <Callout.Root color='red' size='1'>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  )
}

export { ErrorMessage }
