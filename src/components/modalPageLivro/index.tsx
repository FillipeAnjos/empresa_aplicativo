import React from 'react';
import { Text, View, Alert, Modal } from 'react-native';
import { ContainerModal, ViewModal } from './style';

export function ModalPageLivro(props: any){

    const { modalVisible } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <ContainerModal>
                <ViewModal>
                    <View>
                        <Text style={{ color: "gray" }}>Atualizando ...</Text>
                    </View>
                </ViewModal>
            </ContainerModal>
        </Modal>
    )
}