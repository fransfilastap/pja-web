import { chakra, HStack, Icon } from '@chakra-ui/react'
import { FiEye } from 'react-icons/fi'

interface ViewsCountProps {
  count: number
}
const ViewsCount: React.FunctionComponent<ViewsCountProps> = ({ count }: ViewsCountProps): React.ReactElement => (
  <HStack gap={1}>
    <Icon as={FiEye} />
    <chakra.span>{count}</chakra.span>
  </HStack>
)

export default ViewsCount
