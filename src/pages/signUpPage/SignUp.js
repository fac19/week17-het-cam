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
import { auth } from "../../firebase";
// import { AppContext } from "../../utils/AppContext";

const SignUp = () => {
  // const { isUserInfoComplete, setIsUserInfoComplete } = useContext(AppContext);
  // const { loginInfo, setLoginInfo } = useContext(AppContext);

  const history = useHistory();
  // const token = JSON.parse(localStorage.getItem("token"));

  // const name = token ? token.full_name : "";
  // const email = token ? token.email : "";

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
    // console.log(form);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form.email, form.password);

    auth
      .createUserWithEmailAndPassword(form.email, form.password)
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

  //   await fetch("../../../.netlify/functions/post-student/post-student.js", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(form),
  //   });
  //   history.push("/my-missions");
  // };

  // Retreive data from airtable, then check if user is already registered with all neccessary information
  // React.useEffect(() => {
  // get user email from state
  // let userEmail = loginInfo.email;

  //   const func = async () => {
  //     const post = await fetch(
  //       `../../../.netlify/functions/fetch-student/fetch-student.js?email=${userEmail}`
  //     );

  //     const finalFetch = await post.json();
  //     setIsUserInfoComplete(finalFetch);
  //   };

  //   func();
  // }, [loginInfo, setIsUserInfoComplete]);

  // React.useEffect(() => {
  //   if (isUserInfoComplete) {
  //     return history.push("/my-missions");
  //   }
  // }, [isUserInfoComplete, history]);

  // React.useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   if (token) {
  //     setLoginInfo({
  //       email: token.email,
  //       name: token.full_name,
  //     });
  //   }
  // }, [setLoginInfo]);

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
            placeholder={"Please enter a password"}
            onChange={handleChange}
          />
        </FormInputWrapper>
        {/* <FormInputWrapper>
          <DateInput onChange={handleChange} />
        </FormInputWrapper>
        <FormInputWrapper>
          <DropdownCountries onChange={handleChange} />
        </FormInputWrapper>
        <FormInputWrapper>
          <DropdownGender onChange={handleChange} />
        </FormInputWrapper> */}
        <TextButton type={"submit"} text={"Get started!"} />
      </FormContainer>
    </>
  );
};

export default SignUp;
