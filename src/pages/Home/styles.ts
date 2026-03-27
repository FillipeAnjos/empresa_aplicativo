import styled from 'styled-components/native';

interface ITextProps {
  colorText?: string;
}

export const Container = styled.View`
  flex: 1;
  margin-left: 10px;
  padding-right: 15px;
  padding-left: 15px;
`;

export const TextEmpresaTitulo = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #696969;
  font-size: 18px;
`;

export const TextEmpresa = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextDescricao = styled.Text`
  color: #696969;
  margin-top: 14px;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextTipo = styled.Text`
  color: #696969;
  margin-bottom: 0px;
  font-size: 16px;
`;


export const TextSincronizado = styled.Text`
  color: #696969;
  margin-top: 4px;
  margin-bottom: 0px;
  font-size: 16px;
`;

export const TextValorSincronizado = styled.Text<ITextProps>`
  color: ${props => props.colorText ? props.colorText : '#FF6347' };
`;

export const TextListaLancamento = styled.Text`
  color: #696969;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
`;

export const ViewListaLancamentos = styled.View`
  background-color: #eda9f5;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const TextListaLancamentos = styled.Text`
  font-size: 18px;
  color: #4d4848;
`;

export const TextExibirEsconder = styled.Text`
  font-size: 18px;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextLinhaExibirEsconder = styled.Text`
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const TouchableOpacityListaLancamentos = styled.TouchableOpacity`
  background-color: #f6d9fa;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
`;