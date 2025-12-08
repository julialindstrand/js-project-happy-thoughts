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
        <H1>What is making you happy right now?</H1>

        <Input
          rows={3}
          value={text}
          onChange={handleChange}
          maxLength={MAX_LEN}
          name="text"
          placeholder="Write your thought here"
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Bottom>
          <Button type="submit">❤️ Send Happy Thought ❤️</Button>
          <Counter>{text.length} / {MAX_LEN}</Counter>
        </Bottom>
      </FormSection>
    </FormWrapper>
  )
}

// Styling
const FormWrapper = styled.div`
  margin: 20px;`

const FormSection = styled.form`
  background: #f2f0f0;
  border: 1px solid black;
  box-shadow: 10px 10px 0 black;
  width: 100%;
  padding: 20px;
  font-size: 10px;
`

const Input = styled.textarea`
  border: 2px solid #c9c8c8;
  width: 95%;
  font-size: 15px;
  color: black;
  margin-top: 10px;
  padding: 10px;
`

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 10px;
  `

const Counter = styled.text`
  font-size: 15px;
  color: #c9c8c8;
`

const Button = styled.button`
  background-color: #ffadad;
  border: 2px solid #ffadad;
  border-radius: 25px;
  padding: 15px;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    border: 2px solid black;
  }
`

const H1 = styled.h1`
  font-weight: 300;
`

const ErrorMsg = styled.p`
  color: #d8000c;
  margin-top: 5px;
`