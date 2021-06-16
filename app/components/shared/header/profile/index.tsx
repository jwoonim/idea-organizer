import { Avatar } from '@chakra-ui/react'

import ProfileMenu from './ProfileMenu'

export default function Profile({ ...props }) {
  const { user } = props
  return (
    <>
      <ProfileMenu user={user}>
        <Avatar name={user.name} src={user.picture} />
      </ProfileMenu>
    </>
  )
}
