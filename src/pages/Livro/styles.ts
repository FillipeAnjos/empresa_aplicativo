import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ContainerImage = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const ImageLivro = styled.Image`
  width: 100px;
  height: 150px; 
`;

export const ViewTextImage = styled.View`
  flex: 1;
  padding-left: 15px;
  width: auto;
`;

export const TituloText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: gray;
  padding-bottom: 10px;
`;

export const AutorText = styled.Text`
  font-size: 14px;
  color: gray;
  padding-bottom: 10px;
`;

export const ContainerButons = styled.View`
  flex-direction: row;
`;

export const ViewButtonDownload = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const ViewButtonLer = styled.View`
  margin-top: 15px;
`;

export const ViewButtonRemover = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
`;

export const TouchableOpacityButtonDownload = styled.TouchableOpacity`
  background-color: #3DB3BF;
  padding: 5px;
  align-items: center;
  border-radius: 20px;
  width: 130px;
`;

export const TouchableOpacityButtonLer = styled.TouchableOpacity`
  background-color: #3DB3BF;
  padding: 5px;
  align-items: center;
  border-radius: 20px;
  width: 130px;
`;

export const TouchableOpacityButtonRemover = styled.TouchableOpacity`
  background-color: #B22222;
  padding: 5px;
  align-items: center;
  border-radius: 20px;
  width: 130px;
`;

export const TextButtonDownload = styled.Text`
  color: #FFF;
  font-size: 12px;
`;

export const TextButtonLer = styled.Text`
  color: #FFF;
  font-size: 12px;
`;

export const TextButtonRemover = styled.Text`
  color: #FFF;
  font-size: 12px;
`;

export const TextDescricao = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: gray;
  margin-bottom: 10px;
`;

export const TextSinopse = styled.Text`
  color: gray;
`;

export const TextDetalhes = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: gray;
  margin-bottom: 8px;
  margin-top: 10px;
`;

export const ViewItensDetalhes = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 5px;
  margin-right: 10px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
`;

export const Text1ItensDetalhes = styled.Text`
  margin-right: 5px;
  font-weight: bold;
  color: #4F4F4F;
`;

export const Text2ItensDetalhes = styled.Text`
  color: #4F4F4F;
`;