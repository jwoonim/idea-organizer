import { useMutation } from '@apollo/client'
import { Text } from '@chakra-ui/react'
import { useDispatchIdeaCount } from 'components/shared/contexts/idea-count'

import { DELETE_IDEA } from 'src/graphql/gql'
import Carousel from './carousel/index'
import Footer from 'components/shared/footer'

export default function Ideas({ ...props }) {
  const dispatchIdeaCount = useDispatchIdeaCount()
  const { ideas, setIdeas, setError } = props
  const [deleteIdea] = useMutation(DELETE_IDEA)
  const handleDeleteIdea = async (graphId) => {
    try {
      const { data, errors } = await deleteIdea({
        variables: { graphId },
      })

      if (errors)
        return setError({ statusCode: 500, title: 'Internal Server Error' })

      if (data.deleteIdea?.success) {
        dispatchIdeaCount({ type: 'DECREASE' })
        return true
      } else {
        if (data.deleteIdea.__typename === 'InvalidSessionError') {
          return setError({ statusCode: 403, title: 'Forbidden' })
        } else if (data.deleteIdea.__typename === 'NotFoundError') {
          return setError({ statusCode: 404, title: 'Not found' })
        }
      }
    } catch (error) {
      return setError({ statusCode: 500, title: 'Internal Server Error' })
    }
  }
  return (
    <>
      {ideas.length === 0 ? (
        <>
          <Text mt="10">Get started generating new ideas with us!</Text>
        </>
      ) : (
        <>
          <Carousel
            ideas={ideas}
            setIdeas={setIdeas}
            handleDeleteIdea={handleDeleteIdea}
          />
          <Footer />
        </>
      )}
    </>
  )
}
