import { createContext, useContext, useReducer } from 'react'

const ideaCountContext = createContext(0)
const ideaCountDispatchContext = createContext(null)
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return state + action.payload
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export default function IdeaCountContextProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, props?.user ?? 0)
  return (
    <>
      <ideaCountDispatchContext.Provider value={dispatch}>
        <ideaCountContext.Provider value={state}>
          {children}
        </ideaCountContext.Provider>
      </ideaCountDispatchContext.Provider>
    </>
  )
}

export const useIdeaCount = () => useContext(ideaCountContext)
export const useDispatchIdeaCount = () => useContext(ideaCountDispatchContext)
