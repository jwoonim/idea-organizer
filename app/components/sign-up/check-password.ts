const strengths = [
  {
    id: 0,
    name: 'Weak',
    minLength: 0,
    minRuleContains: 1,
    progressBarValue: 33,
    color: 'red',
    message: ` - Use 8 or more characters with a mix of letters, numbers & symbols.`,
  },
  {
    id: 1,
    name: 'Medium',
    minLength: 8,
    minRuleContains: 2,
    progressBarValue: 66,
    color: 'yellow',
    message: '',
  },
  {
    id: 2,
    name: 'Strong',
    minLength: 12,
    minRuleContains: 3,
    progressBarValue: 80,
    color: 'green',
    message: '',
  },
  {
    id: 3,
    name: 'Very Strong',
    minLength: 14,
    minRuleContains: 4,
    progressBarValue: 100,
    color: 'green',
    message: '',
  },
]

const rules = [
  { id: 0, name: 'Lowercase', regex: '^(?=.*[a-z])' },
  { id: 1, name: 'Uppercase', regex: '^(?=.*[A-Z])' },
  { id: 2, name: 'Number', regex: '^(?=.*[0-9])' },
  { id: 3, name: 'Special Character', regex: '^(?=.*[!@#$%^&*])' },
]

export default function checkPasswordStrength(password: string) {
  const ruleContains = rules.filter((r) => new RegExp(r.regex).test(password))
  let filteredStrenths = strengths
    .filter((s) => password.length >= s.minLength)
    .filter((s) => ruleContains.length >= s.minRuleContains)
  return filteredStrenths[filteredStrenths.length - 1]
}
