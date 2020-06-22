import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Heading from "../../components/global/heading/Heading";
import { TextButton } from "../../components/global/buttons/Buttons";
import { FormContainer, FormInputWrapper } from "../signUpPage/SignUp.style";
import { auth, firestore } from "../../firebase";

const Login = () => {
  const history = useHistory();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(() => history.push("/my-missions"))
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
  };

  return (
    <>
      <Heading>Login...</Heading>
      <FormContainer onSubmit={handleSubmit}>
        <FormInputWrapper>
          <input
            label={"Email"}
            name={"email"}
            value={form.email}
            placeholder={"Your Email"}
            onChange={handleChange}
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <input
            label={"Password"}
            name={"password"}
            value={form.password}
            placeholder={"Please enter a password"}
            onChange={handleChange}
            type={"password"}
          />
        </FormInputWrapper>
        <TextButton type={"submit"} text={"Get started!"} />
      </FormContainer>
    </>
  );
};

export default Login;
