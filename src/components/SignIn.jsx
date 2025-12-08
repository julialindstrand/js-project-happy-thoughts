// import { useState } from "react"
// import styled from "styled-components"

// const initialFormData = {
//   fullName: "",
//   email: "",
//   password: "",
// }

// export const signIn = () => {
//   const [formData, setFormData] = useState(initialFormData)

//   const handleChange = (event) => {
//     const name = event.target.name
//     const value = event.target.value

//     setFormData(prev => {
//       return {
//         ...prev, //Makes the other formfieldls stay when updated and not only keeping the new thing you input
//         [name]: value
//       }
//     })
//   }

//   return (
//     <FormSection>
//       <form>
//         <h2>Sign-in</h2>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Write your name here"
//           value={formData.fullName}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Write your email here"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Write your password here"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Sign in</button>
//       </form></FormSection>
//   )
// }

// // Styling
// const FormSection = styled.form`
// display: flex;
// flex-direction: column;
// align-items: center;
// `