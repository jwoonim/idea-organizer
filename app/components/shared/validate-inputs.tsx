import * as EmailValidator from 'email-validator'

export function validateEmail(value) {
  if (!value) {
    return 'Email is required.'
  } else if (!EmailValidator.validate(value)) {
    return 'Email is invalid.'
  } else return true
}

export function validateName(value) {
  if (!value.trim()) {
    return 'Name is required.'
  } else return true
}

export function validatePassword(value) {
  if (!value) {
    return 'Password is required.'
  } else if (value.length < 8) {
    return 'Password length must be greater than 8.'
  } else return true
}

export function validateConfirmPassword(value, password) {
  if (!value) {
    return 'Password is required.'
  } else if (value.length < 8) {
    return 'Password length must be greater than 8.'
  } else if (value !== password) {
    return 'Passwords must match.'
  } else return true
}
