import Home from 'components/home'
import { isAuthenticated } from 'src/graphql/middlewares/is-authenticated'

export default function HomePage() {
  return <Home />
}

export const getServerSideProps = isAuthenticated(
  async (ctx: any, props): Promise<any> => {
    const { isAuthenticated } = props
    
    return isAuthenticated
      ? { redirect: { destination: '/ideas', permanent: false } }
      : { props: {} }
  },
  false
)
