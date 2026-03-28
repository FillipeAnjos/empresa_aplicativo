import styled from 'styled-components/native';

interface ITextProps {
  colorText?: string;
}

export const Container = styled.View`
  flex: 1;
  margin-left: 10px;
  padding-right: 30px;
  padding-left: 30px;
`;

export const TextNome = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextSenha = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextSelecioneEmpresa = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextConfirmarSenha = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextInfirmativoSenhas = styled.Text`
  color: #696969;
  margin-top: 30px;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const TextNaoPossuiEmpresa = styled.Text`
  color: #696969;
  margin-top: 0px;
  font-size: 16px;
  margin-bottom: 4px;
  text-align: center;
`;

export const TextInfirmativoSenhas2 = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 12px;
  margin-bottom: 10px
`;

export const TextListaUsuario = styled.Text`
  color: #696969;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
`;

export const TouchableOpacityListaUsuarios = styled.TouchableOpacity`
  background-color: #f6d9fa;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const TextUsuarioNome = styled.Text`
  color: #000;
`;

export const TextUsuarioSync = styled.Text`
  color: #000;
`;

export const TextVazio = styled.Text`
`;

export const TextValorSincronizado = styled.Text<ITextProps>`
  color: ${props => props.colorText ? props.colorText : '#c71919' };
`;

export const TextLinhaExibirEsconder = styled.Text`
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const TextExibirEsconder = styled.Text`
  font-size: 18px;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
`;



































export const LivrosBaixadosTexto = styled.Text`
  margin-top: 10px;
  color: gray;
  font-size: 18px;
  padding-Top: 5px;
  font-weight: bold;
`;

export const ViewNenhumaObra = styled.View`
  height: 70px;
  align-items: center;
  justify-content: center;
`;

export const MinhaBibliotecaTexto = styled.Text`
  color: gray;
  font-size: 18px;
  padding-Top: 5px;
  font-weight: bold;
`;

export const UltimasLeiturasTexto = styled.Text`
  color: gray;
  font-size: 18px;
  padding-Top: 5px;
  font-weight: bold;
`;