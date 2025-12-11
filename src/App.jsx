import { useState, useEffect } from "react"
import styled from "styled-components"
import { ThoughtsForm } from "./components/ThoughtsForm"
import { CardList } from "./components/CardList"
import { GlobalStyle } from "./components/GlobalStyles"

export const App = () => {
  const [thoughts, setThoughts] = useState([])
  // thought = {
  //   id: '',
  //   text: '',
  //   likes: '',
  //   createdAt: ''
  // }

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
    // SENDING or also called POSTing
    const response = await fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts",
      {
        method: "POST",
        body: JSON.stringify({ message: newText }),
        headers: { "Content-Type": 'application/json' }
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

  const incrementLike = (id) => {
    setThoughts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, likes: t.likes + 1 } : t
      )
    )
  }

  return (
    <>
      <GlobalStyle />
      <AppWrapper className="AppWrapper">
        <h1>HAPPY THOUGHTS</h1>
        <ThoughtsForm onSubmit={addThought} />
        <CardList thoughts={thoughts} onLike={incrementLike} />
      </AppWrapper >
    </>)
}

// Styling
const AppWrapper = styled.div`
  width: 100%;
`