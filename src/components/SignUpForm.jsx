import { useState } from "react"
import styled from "styled-components"

const API_URL = "https://js-project-api-p074.onrender.com/thoughts"


export const SignUpForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errorMsg, setErrorMsg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setErrorMsg("Both email and password are required")
      return
    }


    setIsSubmitting(true)
    setErrorMsg("")

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}))
        const msg = errBody.message || `Status ${response.status}`
        throw new Error(msg)
      }

      const newUser = await response.json()
      if (typeof onSuccess === "function") {
        onSuccess(newUser)
      }

    } catch (error) {
      console.error("Sending error:", error)
      setErrorMsg("Could not create account")
      errorMsg(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormWrapper className="signup-form" onSubmit={handleSignUp}>
      <h2>Sign up</h2>

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

      <StyledBtn type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating…" : "Sign up"}
      </StyledBtn>    </FormWrapper>
  )
}

export default SignUpForm

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