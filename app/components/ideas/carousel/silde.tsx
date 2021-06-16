import { useColorMode } from '@chakra-ui/color-mode'
import { HStack } from '@chakra-ui/layout'

import SlideItem from './slide-item'

export default function Slide({
  ideas,
  setIdeas,
  imageSize,
  handleDeleteIdea,
}) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <HStack direction="column" spacing="0">
        {ideas.map((item, key) => (
          <SlideItem
            ideas={ideas}
            item={item}
            setIdeas={setIdeas}
            imageSize={imageSize}
            handleDeleteIdea={handleDeleteIdea}
            colorMode={colorMode}
            key={item._id}
          />
        ))}
      </HStack>
    </>
  )
}
