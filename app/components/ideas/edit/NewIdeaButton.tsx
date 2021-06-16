import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

const colors = [
  'gray',
  'blue',
  'cyan',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
]

export default function NewIdeaButton({
  newNodeColor,
  setNewNodeColor,
  onDragStart,
}) {
  const [isTooltipDisabled, setIsTooltipDisabled] = useState(false)
  const [visibility, setVisibility] = useState('none')
  return (
    <>
      <Menu>
        <Tooltip
          label="Select color and drag your new idea to the pane below"
          hasArrow
          arrowSize={15}
          placement="bottom"
          defaultIsOpen
          isDisabled={isTooltipDisabled}
        >
          <MenuButton
            as={Button}
            leftIcon={<ChevronDownIcon />}
            colorScheme={newNodeColor}
            borderRadius="full"
            _hover={{
              backgroundColor: { newNodeColor },
            }}
            _active={{
              backgroundColor: { newNodeColor },
            }}
            onClick={() => {
              visibility === 'hidden'
                ? setVisibility('inline-flex')
                : setVisibility('hidden')
              if (!isTooltipDisabled) setIsTooltipDisabled(true)
            }}
            onDragStart={(event) => onDragStart(event, 'customNode')}
            draggable
          >
            New idea
          </MenuButton>
        </Tooltip>
        <MenuList
          bg="#ffffff00"
          borderStyle="none"
          boxShadow="none"
          width="25px"
          visibility="hidden"
        >
          <VStack>
            {colors.map((value, key) => {
              return (
                <Button
                  key={key}
                  role="menuitem"
                  borderRadius="full"
                  display={visibility}
                  colorScheme={value}
                  _hover={{
                    backgroundColor: value,
                  }}
                  _active={{
                    backgroundColor: value,
                  }}
                  onClick={() => setNewNodeColor(value)}
                />
              )
            })}
          </VStack>
        </MenuList>
      </Menu>
    </>
  )
}
