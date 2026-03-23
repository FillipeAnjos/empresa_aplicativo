import styled from 'styled-components/native';

interface ITextProps {
  colorText?: string;
}

export const Container = styled.ScrollView`
  flex: 1;
  margin-left: 10px;
  padding-right: 15px;
  padding-left: 15px;
`;

export const TextEmpresaTitulo = styled.Text`
  margin-top: 20px;
  margin-bottom: 40px;
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

