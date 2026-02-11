import styled from "styled-components"
import { useState, useEffect } from "react"
import { ThoughtsForm } from "./components/ThoughtsForm"
import { CardList } from "./components/CardList"
import { LoginForm } from "./components/LoginForm"
import { SignUpForm } from "./components/SignUpForm"
import { GlobalStyle } from "./components/GlobalStyles"

const API_URL = "https://js-project-api-p074.onrender.com"


export const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [user, setUser] = useState(null)

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  })

  const [authMode, setAuthMode] = useState("login")

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    if (userData.token) localStorage.setItem("token", userData.token)
    if (userData.id) localStorage.setItem("userId", userData.id)
    setUser(userData)
  }

  const handleSignUpSuccess = (newUser) => {
    localStorage.setItem("token", newUser.accessToken)
    setUser(newUser)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
  }

  const toggleAuthMode = () =>
    setAuthMode(prev => (prev === "login" ? "signup" : "login"))

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(`${API_URL}/thoughts`, { headers: authHeaders() })
        const raw = await response.json()

        const thoughtsArray = Array.isArray(raw)
          ? raw
          : raw.thoughts ?? raw.data ?? []

        const formatted = thoughtsArray.map(item => ({
          id: item._id,
          likes: item.hearts,
          text: item.message,
          createdAt: item.createdAt,
          authorId: item.authorId,
        }))
        setThoughts(formatted)
      } catch (e) {
        console.error("Failed to load thoughts:", e)
      }
    }
    init()
  }, [])


  // Add
  const addThought = async (newText) => {
    try {
      const response = await fetch(`${API_URL}/thoughts`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ message: newText })
      })

      if (!response.ok) {
        console.error(`POST failed (status ${response.status})`)
        return
      }

      const payload = await response.json()

      const item = payload?.data ?? payload

      const newThought = {
        id: item._id,
        likes: item.hearts,
        text: item.message,
        createdAt: item.createdAt
      }

      setThoughts(prev => [newThought, ...prev])

    } catch (error) {
      console.error("Unexpected error while adding a thought:", error)
    }
  }

  // Edit
  const editThought = async (id, newText) => {
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newText })
      })

      if (!response.ok) {
        console.error(`Edit failed (status ${response.status})`)
        return
      }

      const payload = await response.json()
      const item = payload?.data ?? payload

      // Update local state – replace the edited thought
      setThoughts(prev =>
        prev.map(t => (t.id === id ? { ...t, text: item.message } : t))
      )
    } catch (err) {
      console.error("Error while editing a thought:", err)
    }
  }

  // Delete
  const deleteThought = async (id) => {
    // Optional: confirm with the user
    if (!window.confirm("Delete this thought permanently?")) return

    try {
      const response = await fetch(`${API_URL}thoughts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })

      if (!response.ok) {
        console.error(`Delete failed (status ${response.status})`)
        return
      }

      // Optimistically remove the item from local state:
      setThoughts(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error("Error while deleting a thought:", err)
    }
  }

  // Likes
  const addLike = async (id) => {

    const response = await fetch(`${API_URL}thoughts/${id}/like`,
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
        <div>
          {user ? (
            <>
              <span>
                Welcome, {user.name || user.email}!
              </span>
              <button
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <div>
              {authMode === "login" ? (
                <LoginForm handleLogin={handleLogin} />
              ) : (
                <SignUpForm onSuccess={handleSignUpSuccess} />
              )}
              <StyledDiv>
                <StyledBtn
                  onClick={toggleAuthMode}
                >
                  {authMode === "login"
                    ? "Don’t have an account? Sign up"
                    : "Already have an account? Log in"}
                </StyledBtn>
              </StyledDiv>
            </div>
          )}
        </div>
        <h1>HAPPY THOUGHTS</h1>
        <ThoughtsForm onSubmit={addThought} />
        <CardList
          thoughts={thoughts}
          onLike={addLike}
          onEdit={editThought}
          onDelete={deleteThought}
        />
      </AppWrapper >
    </>)
}

// Styling
const AppWrapper = styled.div`
  width: 100%;
  `

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledBtn = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  margin-bottom: 25px;
`