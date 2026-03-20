import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: rgba(255,255,255, 0.6);
  max-width: 90%;
  max-height: 70%;
  border-radius: 20px;
    margin-top: auto;
    margin-left: 5%; //margin-left: auto;
    //margin-right: auto;
    margin-bottom: auto;
`;

export const TextInfo = styled.Text`
  padding-bottom: 10px;
  padding-top: 25px;
  font-size: 16px;
  text-align: center;
  color: 'rgba(140,140,140,1)';
`;

export const Form = styled.View`
  flex: 1;
  //padding: 0px 28px;
`;

export const TextInputLogin = styled.TextInput`
  background-color: #FFF;
  border-radius: 6px;
  padding-left: 10px;
  margin-bottom: 10px;
  color: gray;
  border: 0.5px;
`;

export const TextInputSenha = styled.TextInput`
  background-color: #FFF;
  border-radius: 6px;
  padding-left: 10px;
  margin-bottom: 10px;
  color: gray;
  border: 0.5px;
`;

export const ButtonLogar = styled.TouchableOpacity`
  background-color: #6d4598;
  border-radius: 6px;
  align-self: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const TextEntrar = styled.Text`
  color: #FFF;
  align-self: center;
`;

export const TextLogin = styled.Text`
  color: #696969;
  margin-bottom: 0px;
`;

export const TextSenha = styled.Text`
  color: #696969;
  margin-bottom: 1px;
`;

export const TextRecuperarSenha = styled.Text`
  margin-bottom: 10px;
  text-align: center;
  text-decoration: underline;
  color: #696969;
  margin-top: 10px;
`;

export const ButtonCadastro = styled.TouchableOpacity`
  background-color: #6d4598;
  border-radius: 6px;
  align-self: center;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 20px;
`;

export const TextRealizarCadastro = styled.Text`
  color: #FFF;
  align-self: center;
  font-size: 12px;
`;

