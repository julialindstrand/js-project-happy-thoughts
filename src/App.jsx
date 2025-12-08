import { useState } from "react"
import styled from "styled-components"
import { ThoughtsForm } from "./components/ThoughtsForm"
import { CardList } from "./components/CardList"

export const App = () => {
  const [thoughts, setThoughts] = useState([])

  const addThought = (newText) => {
    const newThought = {
      id: Date.now(),
      text: newText,
      likes: 0,
    }
    setThoughts((prev) => [...prev, newThought])
  }

  const incrementLike = (id) => {
    setThoughts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, likes: t.likes + 1 } : t
      )
    )
  }

  return (
    <AppWrapper>
      <ThoughtsForm onSubmit={addThought} />
      <CardList thoughts={thoughts} onLike={incrementLike} />
    </AppWrapper>
  )
}

// Styling
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  margin: 0; 
  padding: 0;`