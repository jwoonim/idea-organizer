import { useColorMode } from '@chakra-ui/color-mode'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'

export default function Button({ direction, onClick, visibility }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const style = direction === 'left' ? { left: '-18px' } : { right: '-14px' }
  return (
    <>
      <Box
        as="button"
        appearance="none"
        alignItems="center"
        justifyContent="center"
        transition="all 250ms"
        userSelect="none"
        whiteSpace="nowrap"
        verticalAlign="middle"
        borderRadius="full"
        outline="none"
        w="auto"
        minW="2.5rem"
        h="2.5rem"
        lineHeight="1.2"
        fontSize="1.2rem"
        fontWeight="600"
        p="0"
        bg={colorMode === 'dark' ? 'rgb(38 37 38)' : '#EDF2F7'}
        _active={{
          bg: colorMode === 'dark' ? 'rgb(76 75 76)' : '#CBD5E0',
        }}
        _focus={{ boxShadow: '0 0 0 3px rgb(66 153 225 / 60%)' }}
        display={visibility}
        position="absolute"
        top="50%"
        style={style}
        transform="translate(0, -50%)"
        onClick={() => onClick()}
      >
        {direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Box>
    </>
  )
}
