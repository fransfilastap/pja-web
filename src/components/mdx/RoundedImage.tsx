import Image, { ImageProps } from "next/image"
import { FunctionComponent } from "react"

const RoundedImage:FunctionComponent<ImageProps> = (props) =>{
    
	return (
		<Image
			className={'rounded-lg'}
			placeholder='blur'
			{...props}
        />
    )
}

export default RoundedImage