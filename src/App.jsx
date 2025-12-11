import styled from "styled-components"
import { useState, useEffect } from "react"
import { ThoughtsForm } from "./components/ThoughtsForm"
import { CardList } from "./components/CardList"
import { GlobalStyle } from "./components/GlobalStyles"

export const App = () => {
  const [thoughts, setThoughts] = useState([])

  useEffect(() => {
    const init = async () => {
      // RECEIVING also called GETing
      const response = await fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")

      const returnedResponseValueInJSON = await response.json()

      const newArrayWithThoughts = returnedResponseValueInJSON.map((item) => {
        return {
          id: item._id,
          likes: item.hearts,
          text: item.message,
          createdAt: item.createdAt
        }
      })

      setThoughts(newArrayWithThoughts)
    }

    init()
  }, [])

  const addThought = async (newText) => {
    // SENDING also called POSTing
    const response = await fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts",
      {
        method: "POST",
        body: JSON.stringify({ message: newText }),
        headers: { "Content-Type": "application/json" }
      })

    const item = await response.json()

    const newThought = {
      id: item._id,
      likes: item.hearts,
      text: item.message,
      createdAt: item.createdAt
    }

    setThoughts((prev) => [newThought, ...prev])
  }

  // Likes
  const addLike = async (id) => {

    const response = await fetch(`https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`,
      {
        method: "POST",
        body: JSON.stringify({ hearts: + 1 }),
        headers: { "Content-Type": "application/json" },
      })

    const item = await response.json()

    setThoughts(prev => {
      return prev.map(thought =>
        thought.id === id
          ? { ...thought, likes: item.hearts }
          : thought
      )
    })
  }

  return (
    <>
      <GlobalStyle />
      <AppWrapper className="AppWrapper">
        <h1>HAPPY THOUGHTS</h1>
        <ThoughtsForm onSubmit={addThought} />
        <CardList thoughts={thoughts} onLike={addLike} />
      </AppWrapper >
    </>)
}

// Styling
const AppWrapper = styled.div`
  width: 100%;
  `