import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'

export function ColorModeToggler() {
  const { colorMode, toggleColorMode } = useColorMode()
  // whiteAlpha
  return (
    <>
      <IconButton
        aria-label="Color mode toggle"
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      ></IconButton>
    </>
  )
}
