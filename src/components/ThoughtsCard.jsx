import styled from "styled-components"

export const ThoughtsCard = ({ thought, onLike }) => {

  return (
    <div>
      <Text>{thought.text}</Text>
      <LikeBar>
        <LikeBtn onClick={() => onLike(thought.id)} aria-label="like this thought">
          ❤️
        </LikeBtn>
        <LikeCount>{thought.likes}</LikeCount>
      </LikeBar>
    </div>
  )
}

// Styling
const LikeBar = styled.div`
  display: flex;
  align-items: center;
  `

const Text = styled.p`
  margin: 0 0 8px 0;
  font-size: 15px;
  color: #333;
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