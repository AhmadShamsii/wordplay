import { useEffect, useState, ChangeEvent, FormEvent } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";

const defaultInputFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultInputFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultInputFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();

      console.log("user signin");
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/wrong-password":
          alert("wrong password");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h1>Already have an account?</h1>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <button type="submit">Sign In</button>
          <button type="button" onClick={signInWithGoogle}>
            Google Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
