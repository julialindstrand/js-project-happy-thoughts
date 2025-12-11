import styled from "styled-components"
import { ThoughtsCard } from "./ThoughtsCard"

export const CardList = ({ thoughts, onLike }) => {
  if (!thoughts?.length) return null

  return (
    <ThoughtList>
      {thoughts.map((thought) => (
        <CardsContainer key={thought.id}>
          <ThoughtsCard
            thought={thought}
            onLike={onLike}
            createdAt={thought.createdAt}>
          </ThoughtsCard>
        </CardsContainer>
      ))}
    </ThoughtList>
  )
}

// Styling
const CardsContainer = styled.div`
border: 1px solid black;
box-shadow: 10px 10px 0 black;
font-size: 10px;
margin: 20px 0;
padding: 10px;
  `

const ThoughtList = styled.div`
`