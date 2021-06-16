import { IconButton } from '@chakra-ui/button'
import { DeleteIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Link, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import NextLink from 'next/link'

export default function SlideItem({
  ideas,
  item,
  setIdeas,
  imageSize,
  handleDeleteIdea,
  colorMode,
}) {
  const [buttonVisibility, setButtonVisibility] = useState('none')
  const [imageOpacity, setImageOpacity] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const mouseEnter = () => {
    setButtonVisibility('inline-flex')
    setImageOpacity('0.5')
  }
  const mouseLeave = () => {
    setButtonVisibility('none')
    setImageOpacity('1')
  }
  const deleteIdea = async (id) => {
    setIsLoading(true)
    ;(await handleDeleteIdea(id)) === true
      ? setIdeas(ideas.filter((idea) => idea._id !== id))
      : setIsLoading(false)
  }
  return (
    <Box
      position="relative"
      minW={`${imageSize}px`}
      minH={`${imageSize}px`}
      pr="4px"
      onMouseEnter={(e) => mouseEnter()}
      onMouseLeave={(e) => mouseLeave()}
      key={item._id}
    >
      <NextLink href={`/ideas/edit?id=${item._id}`}>
        <Link>
          {item.picture ? (
            <Image
              src={item.picture}
              alt="Image"
              w={`${imageSize}px`}
              h={`${imageSize}px`}
              objectFit="fill"
              boxShadow="1px 1px 2px rgba(0,0,0,0.1)"
              borderWidth="1px"
              borderRadius="lg"
              draggable="false"
              style={{
                opacity: imageOpacity,
              }}
            />
          ) : (
            <Flex
              alignItems="center"
              justifyContent="center"
              verticalAlign="middle"
              h={`${imageSize}px`}
            >
              <Text>No image</Text>
            </Flex>
          )}
        </Link>
      </NextLink>
      <IconButton
        position="absolute"
        top="5px"
        right="8px"
        borderRadius="full"
        // style={{
        //   display: buttonVisibility,
        // }}
        color={colorMode === 'dark' ? 'white' : 'black'}
        bg={colorMode === 'dark' ? 'rgb(38 37 38)' : '#EDF2F7'}
        aria-label="Delete"
        icon={<DeleteIcon />}
        onClick={() => deleteIdea(item._id)}
        isLoading={isLoading}
      />
    </Box>
  )
}
