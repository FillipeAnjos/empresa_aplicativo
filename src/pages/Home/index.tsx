import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SelectList } from "react-native-dropdown-select-list";
import TextInputComponent from "../../components/TextInputComponent";
import { Loading } from "../../components/Loading";
import { View, Button, Platform, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonComponent from "../../components/ButtonComponent";
import { useAuth } from "../../hooks/auth";

import { 
    buscarDadosUsuario as buscarDadosUsuarioService
} from "../../services/ApiService";

import { 
    Container,
    TextEmpresaTitulo,
    TextEmpresa,
    TextDescricao,
    TextTipo,
    TextSincronizado,
    TextValorSincronizado
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function Home() {

    const { navigate } = useNavigation<NavigationPropsI>();
    
    const [loading, setLoading] = useState<Boolean>(false);

    const [idUsuario, setIdUsuario] = useState<number>(0);
    const [nomeUsuario, setNomeUsuario] = useState<string>('');
    
    const [email, setEmail] = useState<string>('');

    const [idEmpresa, setIdEmpresa] = useState<number>(0);
    const [empresa, setUEmpresa] = useState<string>('');

    const [tipo, setTipo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');

    const [sincronizado, setSincronizado] = useState<boolean>(false);

    const dadosTipo = [
      {key:'1', value:'COMPRA', disabled: false},
      {key:'2', value:'VENDA', disabled: false},
    ];

    // ------ State's DataTime ------
        const [date, setDate] = useState(new Date());
        const [mode, setMode] = useState<any>('date'); // 'date' ou 'time' ou 'datetime'
        const [show, setShow] = useState(false);
    
    useEffect( () => {
        setLoading(true);
        buscarDadosUsuario();
    }, []);
    
    return (
        <>
            <Container>

                {
                    loading
                        ?   <Loading />
                        : <>
                            <TextEmpresaTitulo>Lançamentos</TextEmpresaTitulo>

                            <TextEmpresa>Sua Empresa</TextEmpresa>
                            <TextInputComponent
                                label="Sua Empresa"
                                placeholder=""
                                value={empresa}
                                onChangeText={setUEmpresa} 
                                placeholderTextColor="#C0C0C0" 
                                editable={false}
                            />

                            <TextTipo>Tipo</TextTipo>
                            <SelectList 
                                setSelected={(val: any) => setTipo(val)} 
                                data={dadosTipo} 
                                save="value"
                            />

                            <TextDescricao>Descrição</TextDescricao>
                            <TextInputComponent
                                label="Descrição"
                                placeholder="Informe sua descrição"
                                value={descricao}
                                onChangeText={setDescricao} 
                                placeholderTextColor="#C0C0C0" 
                            />

                            { camposDataHora() }

                            <TextSincronizado>
                                Sincronizado: <TextValorSincronizado colorText={sincronizado ? '#32CD32' : '#FF6347'}>
                                                {sincronizado ? 'Sim' : 'Não'}
                                               </TextValorSincronizado>
                            </TextSincronizado>

                            <ButtonComponent
                                title="Cadastrar Lançamento" 
                                onPress={ cadastrarLancamento }
                                color="#6d4598"
                                radius="6px" 
                                paddingVertical="6px"
                                paddingHorizontal="40px"
                                marginTop="30px"
                                marginBottom="10px"
                                fontSize="14px"
                                colorText="#fff"
                            />

                        </>
                }

            </Container>
        </>
    )

    async function buscarDadosUsuario(){

        var dados = await buscarDadosUsuarioService();

        //console.log(dados.usuario.status);
        //console.log(dados.usuario.sucesso);
        setIdUsuario(dados.usuario.id);
        setNomeUsuario(dados.usuario.nome);
        setEmail(dados.usuario.login);
        setIdEmpresa(dados.usuario.idfirma);
        setUEmpresa(dados.usuario.nomefirma);
        
        setSincronizado(false);

        setTimeout(() => {
            setLoading(false);
        }, 990);
        
    }

    function cadastrarLancamento(){

        if(
            idEmpresa == 0
            || empresa == ''
            || tipo == ''
            || descricao == ''
            || date.toLocaleString() == ''
        ){  
            Alert.alert("Aviso", "Todos os campos deverão ser informados!");
            return;
        }

        if(descricao.length < 10){
            Alert.alert("Aviso", "O campo DESCRIÇÃO deve ter no mínimo 10 caracteres!");
            return;
        }



        console.log("-------------------------------------");
        console.log("-------------------------------------");

        console.log(idEmpresa);
        console.log(empresa);
        console.log(tipo);
        console.log(descricao);
        console.log(date.toLocaleString());
        console.log(sincronizado);
        
        console.log("-------------------------------------");
        console.log("-------------------------------------");
        
        console.log("Estou no cadastrarLancamento cadastrarLancamento");
    }

    // --------------------------------
    // ------ Functions DataTime ------
    // --------------------------------

    function onChange(event: any, selectedDate: any){
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    function showMode(currentMode: any){
        setShow(true);
        setMode(currentMode);
    }

    function showDatepicker(){
        showMode('date');
    }

    function showTimepicker(){
        showMode('time');
    }

    function camposDataHora(){
        return (
            <>
                <ButtonComponent
                    title="Selecionar Data" 
                    onPress={ showDatepicker }
                    color="#7B68EE"
                    radius="6px" 
                    paddingVertical="6px"
                    paddingHorizontal="130px"
                    marginTop="4px"
                    marginBottom="10px"
                    fontSize="14px"
                    colorText="#fff"
                />

                <ButtonComponent
                    title="Selecionar Hora" 
                    onPress={ showTimepicker }
                    color="#7B68EE"
                    radius="6px" 
                    paddingVertical="6px"
                    paddingHorizontal="130px"
                    marginTop="0px"
                    marginBottom="0px"
                    fontSize="14px"
                    colorText="#fff"
                />

                <View style={{ margin: 10 }}>
                    {/*
                    <Button onPress={showDatepicker} title="Selecionar Data" />
                    <Text> </Text>
                    <Button onPress={showTimepicker} title="Selecionar Hora" />
                    */}
                    
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode} // Define o modo para 'date', 'time' ou 'datetime'
                            is24Hour={true} // Define o formato de 24 horas para Android
                            display="default" // Pode ser 'default', 'spinner', 'calendar' (Android)
                            onChange={onChange}
                        />
                    )}
                </View>
            </>
        )
    }
    
}

export default Home;
