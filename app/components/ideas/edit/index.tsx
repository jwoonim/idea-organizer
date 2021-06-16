import { useEffect, useState } from 'react'

import ReactFlowComponent from './ReactFlowComponent'

export default function Edit({ ...props }) {
  const { id, setError } = props
  const [elements, setElements] = useState(
    JSON.parse(JSON.stringify(props.elements))
  )
  const onChange = (id, newValue) => {
    elements.map((value, key) => {
      if (value.id === id) {
        value.data.label = newValue
      }
    })
  }
  if (elements) {
    elements.map((value, key) => {
      if (value.type === 'customNode') {
        value.data.onChange = onChange
      }
    })
  }
  useEffect(() => {
    if (id) window.history.replaceState(null, null, `?id=${id}`)
  })

  return (
    <>
      <ReactFlowComponent
        id={id}
        elements={elements}
        setElements={setElements}
        setError={setError}
        onChange={onChange}
      />
    </>
  )
}
