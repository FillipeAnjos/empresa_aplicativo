import styled from 'styled-components/native';

interface IButtonProps {
  color?: string;
  radius?: string;
  paddingHorizontal?: string;
  paddingVertical?: string; 
  marginTop?: string;
  marginBottom?: string;
}

interface ITextProps {
  fontSize?: string;
  colorText?: string;
}

export const ButtonContainer = styled.TouchableOpacity<IButtonProps>`
  background-color: ${props => props.color ? props.color : 'lime' };
  border-radius: ${props => props.radius ? props.radius : '8px' };
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: ${props => props.marginTop ? props.marginTop : '0px' };
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0px' };
  padding-top: ${props => props.paddingVertical ? props.paddingVertical : '10px' };
  padding-bottom: ${props => props.paddingVertical ? props.paddingVertical : '10px' };
  padding-left: ${props => props.paddingHorizontal ? props.paddingHorizontal : '20px' };
  padding-right: ${props => props.paddingHorizontal ? props.paddingHorizontal : '20px' };
`;

export const ButtonText = styled.Text<ITextProps>`
  color: ${props => props.colorText ? props.colorText : '#fff' };
  font-size: ${props => props.fontSize ? props.fontSize : '14px' };
`;
