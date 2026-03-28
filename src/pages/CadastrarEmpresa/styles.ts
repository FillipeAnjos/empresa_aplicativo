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

export const TextFirma = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextListaEmpresa = styled.Text`
  color: #696969;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
`;

export const TouchableOpacityListaEmpresas = styled.TouchableOpacity`
  background-color: #f6d9fa;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const TextEmpresaNome = styled.Text`
  color: #000;
`;

export const TextEmpresaSync = styled.Text`
  color: #000;
`;

export const TextVazio = styled.Text`
`;

export const TextValorSincronizado = styled.Text<ITextProps>`
  color: ${props => props.colorText ? props.colorText : '#c71919' };
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