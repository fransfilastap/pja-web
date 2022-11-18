import React, { FunctionComponent } from 'react'
import { ChakraProps, chakra } from '@chakra-ui/react'

type VideoLazyLoadProps = {
  src: string
} & ChakraProps

const VideoLazyLoad: FunctionComponent<VideoLazyLoadProps> = (props) => {
  const { src, ...rest } = props
  return (
    <chakra.video {...rest} autoPlay={true} muted={true} loop={true} controls={false} playsInline={true}>
      <source src={src} />
    </chakra.video>
  )
}

export { VideoLazyLoad }
