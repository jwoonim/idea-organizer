import MenuItem from './MenuItem'

export default function MenuItems({ menuItems }) {
  return (
    <>
      {menuItems.map(({ to, text, isLast }) => (
        <MenuItem key={to} to={to} text={text} isLast={isLast} />
      ))}
    </>
  )
}
