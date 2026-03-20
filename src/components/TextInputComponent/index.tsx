import React, { useState } from 'react';
import { StyledInput, InputContainer, Label} from './styles';

const TextInputComponent = ({ label, value, onChangeText, placeholder, ...props }: any) => {

  return (
    <InputContainer>
      {/*label && <Label>{label}</Label>*/}
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...props} // Passa quaisquer outras props nativas do TextInput (como keyboardType, secureTextEntry)
      />
    </InputContainer>
  );
}

export default TextInputComponent;
