import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";

import {
  createAuthUserWithEmailAndPassword,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase";
import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import addUserToFirestore from "./../../redux/users/saga";
import { addUserRequest } from "../../redux/users/slice";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

interface FormFields {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultInputFields: FormFields = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ isSignUpModalOpen, setIsSignUpModalOpen }: any) => {
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [formFields, setFormFields] = useState<FormFields>(defaultInputFields);
  const { firstName, lastName, username, email, password, confirmPassword } =
    formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultInputFields);
  };

  const handleSubmit = async (values: any) => {
    const { firstName, lastName, username, email, password } = values;
    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);

      if (!user) return;
      const userDocRef = doc(db, "users", username);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        const createdAt = new Date();

        await setDoc(userDocRef, {
          firstName,
          lastName,
          username,
          email,
          createdAt,
        });

        resetFormFields();
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else console.error("errrrrrrrrrr", error);
    }
    // dispatch(addUserRequest(values));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        // createUserDocumentFromAuth(user);
        console.log(user, "uuuuuuseeeerrr");
      }
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     alert("Passwords don't match");
  //     console.log("not matched");
  //     return;
  //   }

  //   try {
  //     const userCredential = await createAuthUserWithEmailAndPassword(
  //       email,
  //       password
  //     );

  //     if (userCredential) {
  //       const user = userCredential.user;

  //       if (user) {
  //         console.log(user);

  //         await createUserDocumentFromAuth(user, {
  //           firstName,
  //           lastName,
  //           username,
  //         });
  //         resetFormFields();
  //       } else {
  //         console.error("User not found in userCredential");
  //       }
  //     } else {
  //       console.error("User credential not found");
  //     }
  //   } catch (error: any) {
  //     if (error.code === "auth/email-already-in-use") {
  //       alert("Cannot create user, email already in use");
  //     } else {
  //       console.error("Error during authentication:", error);
  //     }
  //   }
  // };
  const handleCancel = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <Modal
      title="Sign Up with your email and password"
      open={isSignUpModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Form
        style={{ marginTop: "30px" }}
        form={form}
        {...layout}
        validateMessages={validateMessages}
        layout="vertical"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    // <div className="sign-up-container">
    //   <h1>Don't have an account?</h1>
    //   <span>Sign Up with your email and password</span>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       value={displayName}
    //
    //       name="displayName"
    //       type="text"
    //       required
    //     ></input>
    //     <input
    //       value={email}
    //
    //       name="email"
    //       type="email"
    //       required
    //     ></input>
    //     <input
    //       value={password}
    //
    //       name="password"
    //       type="password"
    //       required
    //     ></input>
    //     <input
    //       value={confirmPassword}
    //
    //       name="confirmPassword"
    //       type="password"
    //       required
    //     ></input>
    //     <button type="submit">Sign Up</button>
    //   </form>
    // </div>
  );
};

export default SignUpForm;
