import React from "react";
import { useAuth } from "../../hooks/auth";
import ButtonComponent from "../../components/ButtonComponent";

import { 
    Container, 
    TextSobre,
    TextSobre2
} from './styles';

function Sobre() {

    const { signOut } = useAuth();
    
    return (
        <>

            <Container>

                <TextSobre>Sobre</TextSobre>

                <TextSobre2>
                    Um aplicativo de gerenciamento de empresas é uma 
                    ferramenta digital desenvolvida para centralizar, 
                    organizar e otimizar as principais atividades de um 
                    negócio em um único ambiente. "Lorem Ipsum"
                </TextSobre2>

                <ButtonComponent
                    title="Deseja deslogar?" 
                    onPress={ () => signOut() }
                    color="#808080"
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

export default Sobre;
