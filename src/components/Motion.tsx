import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

const MotionDiv = chakra(motion.div, {
  shouldForwardProp(prop) {
    return isValidMotionProp(prop) || shouldForwardProp(prop)
  }
})

export default MotionDiv
