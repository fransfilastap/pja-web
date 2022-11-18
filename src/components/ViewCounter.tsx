import { chakra, HStack, Icon } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { FiEye } from 'react-icons/fi'
import fetcher from '@/lib/fetcher'
import { PostViewResponse } from '@/lib/types'

interface ViewsCountProps {
  slug: string
}

const ViewCounter: React.FunctionComponent<ViewsCountProps> = ({ slug }: ViewsCountProps): React.ReactElement => {
  const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher)
  const views = Number(data?.total)

  useEffect(() => {
    const registerView = () => {
      fetch(`/api/views/${slug}`, { method: 'POST' })
    }
    registerView()
  }, [slug])

  return (
    <HStack gap={1}>
      <Icon as={FiEye} />
      <chakra.span fontSize={'sm'}>{`${views > 0 ? views.toLocaleString() : '0'}`}</chakra.span>
    </HStack>
  )
}

/*interface ErrorComponentProps{
    title:string
    description:string
}
const ErrorComponent = (props:ErrorComponentProps)=>{
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{props.title}</AlertTitle>
            <AlertDescription>{props.description}</AlertDescription>
        </Alert>
    )
}*/

export default ViewCounter
