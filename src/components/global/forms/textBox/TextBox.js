import React from "react";
import styled from "styled-components";

const TextBox = (props) => {
  const TextBoxLabel = styled.label`
    display: flex;
    flex-direction: column;
  `;

  const Text = styled.input`
    min-height: 2rem;
    resize: none;
  `;

  console.log("hey");

  return (
    <TextBoxLabel>
      {props.label}
      <Text
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required
      />
    </TextBoxLabel>
  );
};

export default TextBox;
