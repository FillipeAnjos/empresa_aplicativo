// Input.styles.js
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

// Cria um componente StyledInput baseado no TextInput nativo do React Native
export const StyledInput = styled(TextInput)`
  height: 50px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 0 15px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
`;

// Opcionalmente, crie um container para o input, como para adicionar um label
export const InputContainer = styled.View`
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;
