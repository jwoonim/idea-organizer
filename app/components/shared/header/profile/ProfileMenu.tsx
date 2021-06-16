import { useMutation } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuGroup,
  useColorMode,
} from '@chakra-ui/react'

import { SIGN_OUT } from 'src/graphql/gql'
import Link from 'next/link'

export default function ProfileMenu({ children, ...props }) {
  const { user } = props
  const [SignOut] = useMutation(SIGN_OUT)
  // Router
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const [toColorMode, setToColorMode] = useState('')
  // Switch theme
  const switchTheme = () => {
    toggleColorMode()
    colorMode === 'dark' ? setToColorMode('light') : setToColorMode('dark')
  }
  // Sign out
  const signOut = async () => {
    try {
      const { data, errors }: any = await SignOut()
      await router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Menu>
        <MenuButton>{children}</MenuButton>
        <MenuList
          minWidth="250px"
          bg={colorMode === 'dark' ? '#1b1d21' : '#fff'}
        >
          <MenuGroup
            fontSize="xl"
            fontWeight="bold"
            title={user.name}
          ></MenuGroup>
          <MenuGroup fontSize="sm" title={user.email}></MenuGroup>
          <MenuDivider />
          <MenuItem>
            <Link href="/account-settings">Account settings</Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={switchTheme}>
            Switch to {toColorMode} theme
          </MenuItem>
          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
