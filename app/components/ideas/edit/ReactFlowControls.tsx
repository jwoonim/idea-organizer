import { useMutation } from '@apollo/client'
import { Flex, HStack, IconButton, Spacer, useToast } from '@chakra-ui/react'
import html2canvas from 'html2canvas'
import { useZoomPanHelper } from 'react-flow-renderer'
import { useCallback, useState } from 'react'
import { FaSave } from 'react-icons/fa'

import Logo from 'components/shared/header/Logo'
import { SAVE_ELEMENTS } from 'src/graphql/gql'
import { ColorModeToggler } from './ColorModeToggler'
import NewIdeaButton from './NewIdeaButton'

export default function ReactFlowControls({
  id,
  setError,
  reactFlowInstance,
  newNodeColor,
  setNewNodeColor,
  onDragStart,
}) {
  const [saveElements] = useMutation(SAVE_ELEMENTS)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  // Remove __typename
  const removeTypename = (obj) => {
    for (const e in obj) {
      if (e === '__typename') {
        delete obj.__typename
      }
      if (e === 'onChange') {
        delete obj.onChange
      }
      if (typeof obj[e] === 'object') {
        removeTypename(obj[e])
      }
    }
  }
  // On save
  const onSave = useCallback(async () => {
    if (reactFlowInstance) {
      setIsLoading(true)
      const flow = reactFlowInstance.toObject()
      const { elements } = flow
      const graphId = id
      const screenShot = await html2canvas(
        document.querySelector('.react-flow__renderer')
      )
      const picture = screenShot.toDataURL('image/jpeg')
      let nodes = [],
        edges = []
      elements.map((val, key) => {
        val.graphId = id
        val.type === 'customNode' ? nodes.push(val) : edges.push(val)
      })
      nodes.map((val, key) => {
        removeTypename(val)
      })
      edges.map((val, key) => {
        removeTypename(val)
      })
      const { data, errors } = await saveElements({
        variables: { graphId, picture, elements: { nodes, edges } },
      })
      if (errors)
        return setError({ statusCode: 500, title: 'Internal Server Error' })
      if (data.saveElements?.success) {
        toast({
          title: `Your changes saved.`,
          status: 'success',
          isClosable: true,
        })
      } else {
        toast({
          title: `There was an error.`,
          status: 'error',
          isClosable: true,
        })
      }
      setIsLoading(false)
    }
  }, [reactFlowInstance])

  return (
    <>
      <Flex position="sticky" top="0" m="10px 10px 0 10px" zIndex="4">
        <HStack spacing="10px">
          <Logo />
          <ColorModeToggler />
        </HStack>
        <Spacer />
        <HStack spacing="10px">
          <NewIdeaButton
            newNodeColor={newNodeColor}
            setNewNodeColor={setNewNodeColor}
            onDragStart={onDragStart}
          />
          <IconButton
            variant="solid"
            aria-label="Save"
            colorScheme={newNodeColor}
            icon={<FaSave />}
            isRound
            isLoading={isLoading}
            onClick={onSave}
          />
        </HStack>
      </Flex>
    </>
  )
}
