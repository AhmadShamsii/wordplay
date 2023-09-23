import React, { useState, FormEvent, ChangeEvent } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";

interface FormFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultInputFields: FormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultInputFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultInputFields);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      console.log("not matched");
      return;
    }

    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (userCredential) {
        const user = userCredential.user;

        if (user) {
          console.log(user);

          await createUserDocumentFromAuth(user, { displayName });
          resetFormFields();
        } else {
          console.error("User not found in userCredential");
        }
      } else {
        console.error("User credential not found");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("Error during authentication:", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h1>Don't have an account?</h1>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <input
          value={displayName}
          onChange={handleChange}
          name="displayName"
          type="text"
          required
        ></input>
        <input
          value={email}
          onChange={handleChange}
          name="email"
          type="email"
          required
        ></input>
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          required
        ></input>
        <input
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          required
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
