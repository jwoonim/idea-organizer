import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { Box, Button, Flex, Spacer } from '@chakra-ui/react'

import Nav from './Nav'
import Logo from './Logo'
import Menu from './menu'
import MenuItems from './menu/MenuItems'
import MenuToggle from './MenuToggle'
import Profile from './profile'
import { useDispatchIdeaCount, useIdeaCount } from '../contexts/idea-count'

export default function Header({ ...props }) {
  const ideaCount = useIdeaCount()
  const dispatchIdeaCount = useDispatchIdeaCount()
  const router = useRouter()
  const { user, statusCode } = props
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [isDisabled, setIsDisabled] = useState(false)
  let menuItems = [
    { to: '/ideas', text: 'Ideas', isLast: false },
    { to: '/ideas/generate', text: 'Generate an idea', isLast: false },
    { to: '/account-settings', text: 'Account settings', isLast: false },
    { to: '/sign-in', text: 'Sign in', isLast: false },
    { to: '/sign-up', text: 'Sign up', isLast: false },
  ]
  useEffect(() => {
    ideaCount >= 10 ? setIsDisabled(true) : setIsDisabled(false)
  })

  router.pathname === '/' ? (menuItems = [menuItems[3]]) : (menuItems = [])

  if (statusCode) {
    return <></>
  }

  if (router.pathname === '/') {
    return (
      <>
        <Nav>
          <Logo />
          <MenuToggle isOpen={isOpen} toggle={toggle} />
          <Menu isOpen={isOpen}>
            <MenuItems menuItems={menuItems} />
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => router.push('/sign-up')}
            >
              Sign up
            </Button>
          </Menu>
        </Nav>
      </>
    )
  }
  if (
    router.pathname === '/sign-up' ||
    router.pathname === '/sign-in' ||
    router.pathname === '/verify' ||
    router.pathname === '/find-password'
  ) {
    return (
      <>
        <Nav>
          <Logo />
        </Nav>
      </>
    )
  }
  if (router.pathname === '/ideas' || router.pathname === '/account-settings') {
    return (
      <>
        <Nav>
          <Logo />
          <MenuToggle isOpen={isOpen} toggle={toggle} />
          <Box
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}
          >
            <Flex
              align={['center', 'center', 'center', 'center']}
              justify={['center', 'space-between', 'flex-end', 'flex-end']}
              direction={['column', 'row', 'row', 'row']}
              pt={[4, 4, 0, 0]}
            >
              <a
                href="https://www.buymeacoffee.com/happyforacoffee"
                target="_blank"
                style={{
                  width: '120px',
                  marginRight: '10px',
                }}
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{
                    height: '36px !important',
                    width: '217px !important',
                  }}
                />
              </a>
              <Button
                mr="20px"
                colorScheme="blue"
                variant="outline"
                onClick={async () => {
                  dispatchIdeaCount({ type: 'INCREASE' })
                  await router.push('/ideas/edit')
                }}
                isDisabled={isDisabled}
                mt={[4, 4, 0, 0]}
                mb={[4, 4, 0, 0]}
              >
                Generate an idea
              </Button>
              <Profile user={user} />
            </Flex>
          </Box>
        </Nav>
      </>
    )
  }
  // if a pathname is '/ideas/generate', return empty component
  return <></>
}
