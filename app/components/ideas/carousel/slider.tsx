import { Box } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'

import Button from './button'
import Slide from './silde'

export default function Slider({ ideas, setIdeas, handleDeleteIdea }) {
  const length = ideas.length
  const [count, setCount] = useState(0)
  const [width, setWidth] = useState(
    typeof window === 'undefined' ? 601 : window.innerWidth * 0.89
  )
  const [translate, setTranslate] = useState(0)

  const [imageSize, setImageSize] = useState(0)
  const [visibleSlides, setVisibleSlides] = useState(0)
  const [leftButtonVisibility, setLeftButtonVisibility] = useState('block')
  const [rightButtonVisibility, setRightButtonVisibility] = useState('block')
  const updateWidth = () => {
    setWidth(window.innerWidth * 0.89)
  }
  const previous = () => {
    if (count !== 0) {
      setCount(count - visibleSlides)
      setTranslate(translate + imageSize * visibleSlides)
    }
  }
  const next = () => {
    if (count !== length) {
      setCount(count + visibleSlides)
      setTranslate(translate - imageSize * visibleSlides)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    if (width >= 1024) {
      setVisibleSlides(3)
      setImageSize(width / 3)
    } else if (width > 640 && width < 1024) {
      setVisibleSlides(2)
      setImageSize(width / 2)
    } else {
      setVisibleSlides(1)
      setImageSize(width / 1)
    }
    return () => window.removeEventListener('resize', updateWidth)
  })
  useEffect(() => {
    return count === 0
      ? setLeftButtonVisibility('none')
      : setLeftButtonVisibility('block')
  })
  useEffect(() => {
    return count + visibleSlides >= length
      ? setRightButtonVisibility('none')
      : setRightButtonVisibility('block')
  })
  return (
    <>
      <Box position="relative" w="89%" height="calc(100vh - 100px)">
        <Box
          position="absolute"
          top="50%"
          transform="translate(0, -50%)"
          width="100%"
          overflow="hidden"
        >
          <Box
            position="relative"
            w="100%"
            transform={`translate(${translate}px)`}
            transition="transform 0.3s"
          >
            <Slide
              ideas={ideas}
              setIdeas={setIdeas}
              imageSize={imageSize}
              handleDeleteIdea={handleDeleteIdea}
            />
          </Box>
        </Box>
        <Button
          direction="left"
          onClick={previous}
          visibility={leftButtonVisibility}
        />
        <Button
          direction="right"
          onClick={next}
          visibility={rightButtonVisibility}
        />
      </Box>
    </>
  )
}
