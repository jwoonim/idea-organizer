import {
  Editable,
  EditableInput,
  EditablePreview,
  Tag,
  TagLabel,
} from '@chakra-ui/react'
import { CSSProperties, memo, useRef, useState } from 'react'
import { Handle, Position } from 'react-flow-renderer'

const targetHandleStyle: CSSProperties = { background: '#555' }

function CustomNode({ ...props }) {
  // function CustomNode({ id, data }) {
  const el = useRef(null)
  const [label, setLabel] = useState(props.data?.label)
  const [editable, setEditable] = useState(false)
  const handleChange = (e) => {
    setLabel(e.target.value)
    props.data.onChange(props.id, e.target.value)
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={targetHandleStyle}
      />
      <Tag
        borderRadius="full"
        variant="solid"
        colorScheme={props.data.color}
        onDoubleClick={() =>
          editable ? setEditable(false) : setEditable(true)
        }
      >
        <TagLabel>
          <Editable
            defaultValue={props.data.label}
            isPreviewFocusable={false}
            submitOnBlur={false}
            ref={el}
          >
            {(props) => (
              <>
                <EditablePreview
                  onDoubleClick={(e) => props.onEdit()}
                  cursor="grab"
                />
                <EditableInput
                  onBlur={(e) => {
                    props.onSubmit()
                    setLabel(el.current.value)
                  }}
                  onChange={handleChange}
                />
              </>
            )}
          </Editable>
        </TagLabel>
      </Tag>
      <Handle
        type="source"
        position={Position.Right}
        style={targetHandleStyle}
      />
    </>
  )
}

export default memo(CustomNode)
