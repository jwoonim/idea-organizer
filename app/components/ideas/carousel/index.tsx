import Slider from './slider'

export default function Carousel({ ideas, setIdeas, handleDeleteIdea }) {
  return (
    <Slider
      ideas={ideas}
      setIdeas={setIdeas}
      handleDeleteIdea={handleDeleteIdea}
    />
  )
}
