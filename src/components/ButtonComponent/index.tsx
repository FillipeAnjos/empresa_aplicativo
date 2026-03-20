import React from "react";
import { ButtonContainer, ButtonText } from './styles';

interface IButtonComponent {
  title: string;
  onPress: any;
  color?: string;
  radius?: string;
  paddingHorizontal?: string;
  paddingVertical?: string; 
  fontSize?: string;
  colorText?: string;
  marginTop?: string;
  marginBottom?: string;
}

function ButtonComponent({ title, onPress, color, radius, paddingHorizontal, paddingVertical, marginTop, marginBottom, fontSize, colorText }: IButtonComponent) {    
    return (
    <ButtonContainer 
      onPress={onPress} 
      color={color} 
      radius={radius} 
      paddingHorizontal={paddingHorizontal} 
      paddingVertical={paddingVertical} 
      marginTop={marginTop} 
      marginBottom={marginBottom}
    >
      <ButtonText 
        fontSize={fontSize} 
        colorText={colorText}
      >
        {title}
      </ButtonText>
    </ButtonContainer>
  );
}

export default ButtonComponent;
