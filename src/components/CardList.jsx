import styled from "styled-components"
import { ThoughtsCard } from "./ThoughtsCard"

export const CardList = ({ thoughts, onLike }) => {
  if (!thoughts?.length) return null

  return (
    <ThoughtList>
      {thoughts.map((thought) => (
        <CardsContainer>
          <ThoughtsCard
            key={thought.id}
            thought={thought}
            onLike={onLike}>
          </ThoughtsCard></CardsContainer>
      ))}
    </ThoughtList>
  )
}

// Styling
const CardsContainer = styled.div`
  border: 1px solid black;
  box-shadow: 10px 10px 0 black;
  margin: 20px;
  width: 100%;
  padding: 10px;
  font-size: 10px;
  `

const ThoughtList = styled.div`
`