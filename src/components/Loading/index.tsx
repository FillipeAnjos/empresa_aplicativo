import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Container, ContainerFlatlist } from './styles';

export function Loading(){
    return (
      <Container>
        <ActivityIndicator size="large" color="#66CDAA" />
      </Container>
    );
}

export function LoadingFlatlist(){
  return (
    <ContainerFlatlist>
      <ActivityIndicator size="large" color="#66CDAA" />
      <Text style={{ color: '#4F4F4F' }}>Carregando Materiais ...</Text>
    </ContainerFlatlist>
  );
}