import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Heading from "../../components/global/heading/Heading";
import {
  DropdownCountries,
  DropdownGender,
} from "../../components/global/forms/dropdown/Dropdown";
import DateInput from "../../components/global/forms/dateInput/DateInput";
import TextBox from "../../components/global/forms/textBox/TextBox";
import { TextButton } from "../../components/global/buttons/Buttons";
import { FormContainer, FormInputWrapper } from "./SignUp.style";
import { auth, firestore } from "../../firebase";
// import { AppContext } from "../../utils/AppContext";

const SignUp = () => {
  const history = useHistory();

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(() => {
        delete form.password;
        firestore
          .collection("users")
          .add(form)
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      })
      .then(history.push("/my-missions"))
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
      <Heading>Before you begin...</Heading>
      <FormContainer onSubmit={handleSubmit}>
        <FormInputWrapper>
          <input
            label={"Name"}
            name={"name"}
            value={form.name}
            placeholder={"Your Name"}
            onChange={handleChange}
          />
        </FormInputWrapper>
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
            type={"password"}
            placeholder={"Please enter a password"}
            onChange={handleChange}
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <DateInput onChange={handleChange} />
        </FormInputWrapper>
        <FormInputWrapper>
          <DropdownCountries onChange={handleChange} />
        </FormInputWrapper>
        <FormInputWrapper>
          <DropdownGender onChange={handleChange} />
        </FormInputWrapper>
        <TextButton type={"submit"} text={"Get started!"} />
      </FormContainer>
    </>
  );
};

export default SignUp;
