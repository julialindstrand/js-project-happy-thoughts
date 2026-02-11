import { useState } from "react"
import styled from "styled-components"

const API_URL = "https://js-project-api-p074.onrender.com/thoughts"

export const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields")
      return
    }

    setError("")

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      handleLogin(data.response)
      setFormData({ email: "", password: "" })

    } catch (error) {
      setError("Invalid email or password")
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  return (
    <FormWrapper className="login-form" onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <StyledDiv className="login-inputs">
        <Styledlabel>
          Email
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </Styledlabel>
        <Styledlabel>
          Password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </Styledlabel>
      </StyledDiv>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <StyledBtn type="submit">Log In</StyledBtn>
    </FormWrapper>
  )
}

export default LoginForm

const FormWrapper = styled.div`
background: #f2f0f0;
border: 1px solid black;
box-shadow: 10px 10px 0 black;
padding: 20px;
margin-bottom: 50px;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
`

const Styledlabel = styled.label`
  display: flex;
  flex-direction: column;
`

const StyledBtn = styled.button`
  background-color: white;
  border: 2px solid #c9c8c8;
  padding: 4px;

    &:hover {
    border: 2px solid black;
    cursor: pointer;
  }
`