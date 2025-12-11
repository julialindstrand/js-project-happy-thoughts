import React, { useState } from "react"
import styled from "styled-components"

export const ThoughtsForm = ({ onSubmit }) => {
  const MAX_LEN = 140
  const [text, setText] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const incoming = e.target.value;
    setText(incoming.length > MAX_LEN ? incoming.slice(0, MAX_LEN) : incoming)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()

    if (!trimmed) {
      setError("Please write something.")
      return
    }
    if (trimmed.length < 5 || trimmed.length > MAX_LEN) {
      setError(`The text must be between 5 and ${MAX_LEN} characters.`)
      return
    }

    onSubmit(trimmed)
    setText("")
    setError("")
  };

  return (
    <FormWrapper>
      <FormSection onSubmit={handleSubmit}>
        <H2>What is making you happy right now?</H2>
        <Input
          rows={3}
          value={text}
          onChange={handleChange}
          maxLength={MAX_LEN}
          name="text"
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Counter>{text.length} / {MAX_LEN}</Counter><br></br>
        <Button type="submit">❤️ Send Happy Thought ❤️</Button>
      </FormSection>
    </FormWrapper>
  )
}

// Styling
const FormWrapper = styled.div`
background: #f2f0f0;
border: 1px solid black;
box-shadow: 10px 10px 0 black;
padding: 20px;
`

const FormSection = styled.form`
`

const Input = styled.textarea`
  border: 2px solid #c9c8c8;
  width: 100%;
  font-size: 15px;
  color: black;
`

const Counter = styled.p`
  font-size: 15px;
  color: #c9c8c8;
`

const Button = styled.button`
  background-color: #ffadad;
  border: 2px solid #ffadad;
  border-radius: 25px;
  padding: 10px;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    border: 2px solid black;
  }
`

const H2 = styled.h2`
  font-size: 18px;
  font-weight: 300;
  padding-bottom: 5px;
`

const ErrorMsg = styled.p`
  color: #d8000c;
  margin-top: 5px;
`