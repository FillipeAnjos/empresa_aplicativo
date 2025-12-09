import React, { useEffect, useState } from 'react';
import { View, Alert, Modal, Text, TouchableOpacity, Image, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Loading } from '../Loading';
import { 
    avaliacaoSalvar as avaliacaoSalvarApiService 
} from '../../services/ApiService';
import { 
    ContainerModal, 
    ViewModal,
    TextX,
    ViewContainerModal,
    ViewContainerModalButtons,
} from './style';

export function ModalAvaliarApp(props: any){

    const { modalVisible, fecharAbrirMoral } = props;

    const [star1, setStar1 ] = useState<boolean>(false);
    const [starCor1, setStarCor1 ] = useState<string>('#C0C0C0');
    const [star2, setStar2 ] = useState<boolean>(false);
    const [starCor2, setStarCor2 ] = useState<string>('#C0C0C0');
    const [star3, setStar3 ] = useState<boolean>(false);
    const [starCor3, setStarCor3 ] = useState<string>('#C0C0C0');
    const [star4, setStar4 ] = useState<boolean>(false);
    const [starCor4, setStarCor4 ] = useState<string>('#C0C0C0');
    const [star5, setStar5 ] = useState<boolean>(false);
    const [starCor5, setStarCor5 ] = useState<string>('#C0C0C0');
    
    const [loading, setLoading] = useState(false);

    const [avaliarPlayStore, setAvaliarPlayStore ] = useState<boolean>(false);
    const [avaliacaoNegativa, setAvaliacaoNegativa ] = useState<boolean>(false);

    useEffect( () => {
        verificarAvaliarPlayStore();
    }, [star1, star2, star3, star4, star5]);

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

                        <TextX onPress={ () => fecharAbrirMoral()}>X</TextX>

                        {
                            loading
                                ? <Loading />
                                : !avaliacaoNegativa
                                    ? <ViewContainerModal>

                                            <Text style={{ color: 'gray' }}>
                                                Você está gostando do aplicativo Primeiros Saberes?
                                            </Text>

                                            <Text style={{ color: 'gray' }}>
                                                Sua opinião é muito importante para nós!
                                            </Text>

                                            <Text style={{ color: 'gray', marginBottom: 20 }}>
                                                Avaliar nos ajuda a melhorar cada vez mais.
                                            </Text>

                                            <View style={{ alignItems: 'center', flexDirection: 'row', gap: 15, alignSelf: 'center' }}>

                                                <Ionicons name='star' size={25} style={{ color: starCor1 }} onPress={ () => selecionarStar(1) } />
                                                <Ionicons name='star' size={25} style={{ color: starCor2 }} onPress={ () => selecionarStar(2) } />
                                                <Ionicons name='star' size={25} style={{ color: starCor3 }} onPress={ () => selecionarStar(3) } />
                                                <Ionicons name='star' size={25} style={{ color: starCor4 }} onPress={ () => selecionarStar(4) } />
                                                <Ionicons name='star' size={25} style={{ color: starCor5 }} onPress={ () => selecionarStar(5) } />
                                                    
                                            </View>

                                            {
                                                avaliarPlayStore
                                                    ? <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                                                
                                                            <Text style={{ color: 'gray', marginBottom: 10 }}>Deseja avaliar na Play Store?</Text>

                                                            <View style={{ flexDirection: 'row', gap: 20 }}>
                                                                <TouchableOpacity 
                                                                    style={{ backgroundColor: '#b72930', paddingLeft: 6, paddingRight: 6, paddingTop: 4, paddingBottom: 4, borderRadius: 4 }}
                                                                    onPress={ () => Linking.openURL('https://play.google.com/store/apps/details?id=com.appprimeirosaberes') }
                                                                >
                                                                    <Text style={{ fontSize: 12, color: '#fff' }}>Avaliar agora</Text>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity 
                                                                    style={{ backgroundColor: '#b72930', paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, borderRadius: 4 }}
                                                                    onPress={ () => fecharAbrirMoral() }
                                                                >
                                                                    <Text style={{ fontSize: 12, color: '#fff' }}>Agora não</Text>
                                                                </TouchableOpacity>
                                                            </View>

                                                        </View>
                                                    : null
                                            }

                                        </ViewContainerModal>
                                    : <ViewContainerModal>
                                        <Text style={{ color: 'gray' }}>
                                            Sua avaliação é importante. Vamos usar esse feedback para evoluir o app. Obrigado!
                                        </Text>
                                    </ViewContainerModal>
                            }

                        <ViewContainerModalButtons style={{ marginTop: 20 }}>
                            <Image style={{ width: 86, height: 30 }} source={require('../../assets/images/logo-primeirossaberes-cinza-e-vermelha.png')} /> 
                        </ViewContainerModalButtons>

                    </View>
                </ViewModal>
            </ContainerModal>
        </Modal>
    )

    function verificarAvaliarPlayStore(){
        star3 ? setAvaliarPlayStore(true) : setAvaliarPlayStore(false);
    }

    async function selecionarStar(estrela: number){

        setLoading(true);

        switch (estrela) {
            case 1:
                
                if(star1){
                    setStarCor1('#C0C0C0');
                    setStarCor2('#C0C0C0');
                    setStarCor3('#C0C0C0');
                    setStarCor4('#C0C0C0');
                    setStarCor5('#C0C0C0');
                    setStar1(false);
                    setStar2(false);
                    setStar3(false);
                    setStar4(false);
                    setStar5(false);
                }else{
                    setStarCor1('#FFD700');
                    setStar1(true);
                }
                
                setAvaliacaoNegativa(true);

                setTimeout(() => {
                    setLoading(false);
                }, 900);
                
                break;
            case 2:
                
                if(star2){
                    setStarCor2('#C0C0C0');
                    setStarCor3('#C0C0C0');
                    setStarCor4('#C0C0C0');
                    setStarCor5('#C0C0C0');
                    setStar2(false);
                    setStar3(false);
                    setStar4(false);
                    setStar5(false);
                }else{
                    setStarCor1('#FFD700');
                    setStarCor2('#FFD700');
                    setStar1(true);
                    setStar2(true);
                }

                setAvaliacaoNegativa(true);

                setTimeout(() => {
                    setLoading(false);
                }, 900);
                
                break;
            case 3:
                
                if(star3){
                    setStarCor3('#C0C0C0');
                    setStarCor4('#C0C0C0');
                    setStarCor5('#C0C0C0');
                    setStar3(false);
                    setStar4(false);
                    setStar5(false);
                }else{
                    setStarCor1('#FFD700');
                    setStarCor2('#FFD700');
                    setStarCor3('#FFD700');
                    setStar1(true);
                    setStar2(true);
                    setStar3(true);
                }

                setAvaliacaoNegativa(false);
                setLoading(false);
                
                break;
            case 4:
                
                if(star4){
                    setStarCor4('#C0C0C0');
                    setStarCor5('#C0C0C0');
                    setStar4(false);
                    setStar5(false);
                }else{
                    setStarCor1('#FFD700');
                    setStarCor2('#FFD700');
                    setStarCor3('#FFD700');
                    setStarCor4('#FFD700');
                    setStar1(true);
                    setStar2(true);
                    setStar3(true);
                    setStar4(true);
                }

                setAvaliacaoNegativa(false);
                setLoading(false);
                
                break;
            case 5:
                
                if(star5){
                    setStarCor5('#C0C0C0');
                    setStar5(false);
                }else{
                    setStarCor1('#FFD700');
                    setStarCor2('#FFD700');
                    setStarCor3('#FFD700');
                    setStarCor4('#FFD700');
                    setStarCor5('#FFD700');
                    setStar1(true);
                    setStar2(true);
                    setStar3(true);
                    setStar4(true);
                    setStar5(true);
                }

                setAvaliacaoNegativa(false);
                setLoading(false);
                
                break;
        
            default:
                console.log("Nenhuma star selecionada!");
                break;
        }

        await avaliacaoSalvarApiService(estrela.toString());

    }
    
}