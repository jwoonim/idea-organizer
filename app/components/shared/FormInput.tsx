import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from '@chakra-ui/react'

export default function FormInput({ children, ...props }) {
  const {
    id,
    name,
    type,
    label,
    placeholder,
    register,
    validation,
    error,
    setValue,
    onKeyUp,
  } = props

  function handleChange(e) {
    if (typeof setValue === 'function') {
      setValue(e.currentTarget.value)
    }
  }

  function handleKeyUp(e) {
    if (typeof onKeyUp === 'function') {
      onKeyUp(e)
    }
  }

  return (
    <>
      <FormControl id={id} mt={5} isInvalid={error}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <InputGroup>
          <Input
            name={name}
            type={type}
            placeholder={placeholder}
            ref={register({ validate: validation })}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleKeyUp(e)}
          />
          {children}
        </InputGroup>
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}
