import { Flex, Progress, Text } from '@chakra-ui/react'

export default function PasswordStrengthBar({ ...props }) {
  const { passwordStrength } = props

  return (
    <>
      {passwordStrength ? (
        <>
          <Progress
            value={passwordStrength.progressBarValue}
            size="xs"
            colorScheme={passwordStrength.color}
            my="1"
          />
          <Flex my="3" spacing="10px">
            <Text color={passwordStrength.color + '.200'}>
              {passwordStrength.name}
            </Text>
            {passwordStrength.id === 0 ? (
              <Text color="red.500">{passwordStrength.message}</Text>
            ) : (
              <></>
            )}
          </Flex>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
