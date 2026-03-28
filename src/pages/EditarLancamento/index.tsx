import React, { useEffect, useState } from "react";
import { useNavigation, StaticScreenProps } from '@react-navigation/native';
import { SelectList } from "react-native-dropdown-select-list";
import TextInputComponent from "../../components/TextInputComponent";
import { Loading } from "../../components/Loading";
import { View, Platform, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonComponent from "../../components/ButtonComponent";
import { useNetInfo } from "@react-native-community/netinfo";
import { database } from '../../databases';
import { LancamentoModel } from '../../databases/models/lancamentoModel';

import { 
    cadastrarEditarLancamento as cadastrarEditarLancamentoService 
} from "../../services/ApiService";

import { 
    Container,
    TextEmpresaTitulo,
    TextDescricao,
    TextTipo
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

type Props = StaticScreenProps<{
  idLancamento: number;
  descricao: string;
  tipo: string;
  idEmpresa: number;
  idUsuario: number;
  idWatermelon: string;
}>;

function EditarLancamento({ route }: Props) {
    
    const [idLancamentoParams, setIdLancamentoParams] = useState<number>(route.params.idLancamento);
    const [descricaoParams, setDescricaoParams] = useState<string>(route.params.descricao);
    const [tipoParams, setTipoParams] = useState<string>(route.params.tipo);
    const [idEmpresaParams, setIdEmpresaParams] = useState<number>(route.params.idEmpresa);
    const [idUsuarioParams, setIdUsuarioParams] = useState<number>(route.params.idUsuario);
    const [idWatermelonParams, setIdWatermelonParams] = useState<string>(route.params.idWatermelon);

    console.log(route.params.idWatermelon);
    console.log(route.params.idWatermelon);
    console.log(route.params.idWatermelon);
    console.log(route.params.idWatermelon);
    console.log(route.params.idWatermelon);
    console.log(route.params.idWatermelon);
    
    const netInfo = useNetInfo();
    const { navigate } = useNavigation<NavigationPropsI>();
    
    const [loading, setLoading] = useState<Boolean>(false);

    const dadosTipo = [
      {key:'1', value:'COMPRA', disabled: false},
      {key:'2', value:'VENDA', disabled: false},
    ];

    // ------ State's DataTime ------
        const [date, setDate] = useState(new Date());
        const [mode, setMode] = useState<any>('date'); // 'date' ou 'time' ou 'datetime'
        const [show, setShow] = useState(false);
    
    useEffect( () => {
        
    }, []);
    
    return (
        <>
            <Container>

                {
                    loading
                        ?   <Loading />
                        : <>

                            <ButtonComponent
                                title="<- Voltar" 
                                onPress={ () => navigate("Home") } 
                                color="#000"
                                radius="6px" 
                                paddingVertical="4px"
                                paddingHorizontal="40px"
                                marginTop="20px"
                                marginBottom="20px"
                                fontSize="12px"
                                colorText="#fff"
                            />

                            <TextEmpresaTitulo>Editar Lançamento: {idLancamentoParams}</TextEmpresaTitulo>

                            <TextTipo>Tipo</TextTipo>
                            <SelectList 
                                inputStyles={{color: 'gray', fontSize: 16}}
                                dropdownTextStyles={{color: 'gray'}}
                                setSelected={(val: any) => setTipoParams(val)} 
                                data={dadosTipo} 
                                save="value"
                            />

                            <TextDescricao>Descrição</TextDescricao>
                            <TextInputComponent
                                label="Descrição"
                                placeholder="Informe sua descrição"
                                value={descricaoParams}
                                onChangeText={setDescricaoParams} 
                                placeholderTextColor="#C0C0C0" 
                            />

                            { camposDataHora() }

                            <ButtonComponent
                                title="Editar Lançamento" 
                                onPress={ cadastrarLancamentoLocalBanco }
                                color="#6d4598"
                                radius="6px" 
                                paddingVertical="6px"
                                paddingHorizontal="40px"
                                marginTop="10px"
                                marginBottom="20px"
                                fontSize="14px"
                                colorText="#fff"
                            />
                            
                        </>
                }

            </Container>
        </>
    )


    async function cadastrarLancamentoLocalBanco() {

        setLoading(true);

        if(idLancamentoParams == 0 || tipoParams == '' || descricaoParams == '' || date.toLocaleString() == ''){  
            setLoading(false);
            Alert.alert("Aviso", "Todos os campos deverão ser informados!");
            return;
        }

        if(descricaoParams.length < 10){
            setLoading(false);
            Alert.alert("Aviso", "O campo DESCRIÇÃO deve ter no mínimo 10 caracteres!");
            return;
        }

        var lancamento = { 
            id: idLancamentoParams,
            tipo: tipoParams,
            data_hora: date.toLocaleString(),
            descricao: descricaoParams,
            sincronizado: true,
            firma_id: idEmpresaParams,
            usuario_id: idUsuarioParams
        };
        
        var res = await cadastrarEditarLancamentoService(lancamento); 

        var idbanco = !res ? 0 : res.lancamento.idCadastrado;

        await database.write(async () => {

            var lacamentoAtualizar = await database.get<LancamentoModel>('lancamento').find(idWatermelonParams);

            await lacamentoAtualizar.update(() => {
                //lacamentoAtualizar.idbanco = idbanco,
                lacamentoAtualizar.tipo = tipoParams,
                lacamentoAtualizar.data_hora = date.toLocaleString(),
                lacamentoAtualizar.descricao = descricaoParams,
                lacamentoAtualizar.sincronizado = idbanco == 0 ? false : true,
                lacamentoAtualizar.firma_id = idEmpresaParams,
                lacamentoAtualizar.usuario_id = idUsuarioParams
            })
        });

        setLoading(false);
        Alert.alert("Importante", "Lançamento editado com sucesso!");
        navigate("Home");

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
                    paddingHorizontal="110px"
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
                    paddingHorizontal="110px"
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

export default EditarLancamento;
