import styled from "styled-components"
import { useState, useEffect } from "react"
import { Time } from "./Time"

export const ThoughtsCard = ({ thought, onLike, onEdit, onDelete, createdAt, isOwner }) => {

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(thought.message)

  useEffect(() => {
    setDraft(thought.message)
  }, [thought.message])

  const handleSave = async () => {
    await onEdit(thought.id, draft)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraft(thought.message)
    setIsEditing(false)
  }

  return (
    <Card>
      <TopPart>
        {isEditing ? (
          <>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                fontSize: "15px",
                padding: "4px",
                resize: "vertical",
              }}
            />
            <EditMode>
              <OtherBtn onClick={handleSave}>💾</OtherBtn>
              <OtherBtn onClick={handleCancel}>✖️</OtherBtn>
            </EditMode>
          </>
        ) : (
          <>
            <StyledText>{thought.message}</StyledText>
            <div>
              {isOwner && (
                <>
                  <OtherBtn onClick={() => setIsEditing(true)}>✏️</OtherBtn>
                  <OtherBtn onClick={() => onDelete(thought.id)}>
                    🗑️
                  </OtherBtn>
                </>
              )}
            </div>
          </>
        )}
      </TopPart>


      <LikeBtn onClick={() => onLike(thought.id)} aria-label="like this thought">
        ❤️
      </LikeBtn>
      <LikeCount>{thought.hearts}</LikeCount>
      <Time createdAt={createdAt} />
    </Card>
  )
}

// Styling
const Card = styled.div`
  width: 100%;
`

const TopPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledText = styled.p`
  margin-bottom: 8px;
  font-size: 15px;
  color: #333;
  overflow-wrap: break-word;
`

const OtherBtn = styled.button`
  background: #FFFFFF;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 6px;
  
  &:hover {
    transform: scale(1.15);
  }
`

const EditMode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-left: 3px;
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