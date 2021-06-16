import { Box } from '@chakra-ui/layout'
import { useRef, useState } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  removeElements,
  addEdge,
} from 'react-flow-renderer'

import CustomNode from './CustomNode'
import ReactFlowControls from './ReactFlowControls'

const nodeTypes = {
  customNode: CustomNode,
}

export default function ReactFlowComponent({ ...props }) {
  const { id, setError, elements, setElements } = props
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [newNodeColor, setNewNodeColor] = useState('gray')
  // On elements remove
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els))
  // On connect
  const onConnect = (params) => setElements((els) => addEdge(params, els))
  // On load
  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView()
    setReactFlowInstance(reactFlowInstance)
  }
  // On drag over
  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }
  // On drag start
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
  // On drop
  const onDrop = (event) => {
    event.preventDefault()
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow')
      const position = reactFlowInstance.project({
        x: event.clientX - 40,
        y: event.clientY - 20,
      })
      const newNode = {
        id: `n_${+new Date()}`,
        type,
        position,
        data: {
          label: 'New idea',
          color: newNodeColor,
          onChange: props.onChange,
        },
      }
      setElements((es) => es.concat(newNode))
    }
  }

  return (
    <>
      <ReactFlowProvider>
        <Box ref={reactFlowWrapper} w="100%" h="100vh">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            paneMoveable
          >
            <Controls />
            <ReactFlowControls
              id={id}
              setError={setError}
              reactFlowInstance={reactFlowInstance}
              newNodeColor={newNodeColor}
              setNewNodeColor={setNewNodeColor}
              onDragStart={onDragStart}
            />
          </ReactFlow>
        </Box>
      </ReactFlowProvider>
    </>
  )
}
