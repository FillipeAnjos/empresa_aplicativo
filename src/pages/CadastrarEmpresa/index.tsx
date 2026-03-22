import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useLogged } from "../../hooks/logged";
import { useAuth } from "../../hooks/auth";

import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from "../../components/ButtonComponent";

import {  } from "../../services/ApiService";

import { 
    Container, 
    TextFirma
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function CadastrarEmpresa() {

    const { } = useLogged();
    const { signOut } = useAuth();

    const { navigate } = useNavigation<NavigationPropsI>();

    const [firma, setFirma] = useState();
    
    useEffect( () => {
        
    }, []);
    
    return (
        <>
            <Container>

                <ButtonComponent
                    title="<- Voltar" 
                    onPress={ () => navigate("Login") } 
                    color="#000"
                    radius="6px" 
                    paddingVertical="4px"
                    paddingHorizontal="40px"
                    marginTop="20px"
                    marginBottom="20px"
                    fontSize="12px"
                    colorText="#fff"
                />

                <TextFirma>Qual o nome da Empresa?</TextFirma>
                <TextInputComponent
                    label="Qual o nome da Empresa?"
                    placeholder=""
                    value={firma}
                    onChangeText={setFirma}
                    keyboardType="email-address" 
                    placeholderTextColor="#C0C0C0" 
                />

                <ButtonComponent
                        title="Cadastrar Empresa" 
                        onPress={ () => navigate("Login") }
                        color="#6d4598"
                        radius="6px" 
                        paddingVertical="4px"
                        paddingHorizontal="40px"
                        marginTop="4px"
                        marginBottom="40px"
                        fontSize="12px"
                        colorText="#fff"
                    />

            </Container>
        </>
    )

    
}

export default CadastrarEmpresa;
