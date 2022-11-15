import { Icon, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import {FiSun,FiMoon} from "react-icons/fi"


const ColorToggleButton = (): React.ReactElement => {
    
    const { toggleColorMode, colorMode } = useColorMode()
    const bgColor = useColorModeValue('violet.10', 'gray.600')
    const color = useColorModeValue('violet.50','yellow.500')
    

    return (
        <IconButton
            size="md"
            icon={
                colorMode === "dark" ? <FiSun size={16}/> : <FiMoon size={16}/>
            }
            bgColor={bgColor}
            color={color}
            _hover={{bgColor:bgColor,color:color,border:"2px"}}
            onClick={toggleColorMode}
            aria-label={"color toggle"} />
    )
}

export default ColorToggleButton