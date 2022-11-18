import React, { FunctionComponent } from 'react'

type VideoLazyLoadProps = {
  src: string
}

const VideoLazyLoad: FunctionComponent<VideoLazyLoadProps> = (props) => {
  return (
    <video autoPlay={true} muted={true} loop={true} controls={false} playsInline={true} className={'blog-cover'}>
      <source src={props.src} />
    </video>
  )
}

export { VideoLazyLoad }
