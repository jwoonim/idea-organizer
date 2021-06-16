import { Box, IconButton } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

export default function MenuToggle({ isOpen, toggle }) {
  return (
    <>
      <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
        <IconButton
          icon={
            isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />
          }
          aria-label="Toggle menu"
          variant="ghost"
        />
      </Box>
    </>
  )
}
