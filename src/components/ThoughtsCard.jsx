import styled from "styled-components"
import { Time } from "./Time"

export const ThoughtsCard = ({ thought, onLike, createdAt }) => {

  return (
    <Card>
      <StyledText> {thought.text} </StyledText>
      <LikeBtn onClick={() => onLike(thought.id)} aria-label="like this thought">
        ❤️
      </LikeBtn>
      <LikeCount>{thought.likes}</LikeCount>
      <Time createdAt={createdAt} />
    </Card>
  )
}

// Styling
const Card = styled.div`
  width: 100%;
`

const StyledText = styled.p`
  margin-bottom: 8px;
  font-size: 15px;
  color: #333;
  overflow-wrap: break-word;
`

const LikeBtn = styled.button`
  background: #EAEAEA;
  border-radius: 50px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 6px;
  
  &:hover {
    transform: scale(1.15);
  }
`

const LikeCount = styled.span`
  font-size: 0.9rem;
  color: #555;
`