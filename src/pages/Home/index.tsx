import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SelectList } from "react-native-dropdown-select-list";
import TextInputComponent from "../../components/TextInputComponent";
import { Loading } from "../../components/Loading";
import { View, Platform, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonComponent from "../../components/ButtonComponent";
import { useNetInfo } from "@react-native-community/netinfo";
import { database } from '../../databases';
import { LancamentoModel } from '../../databases/models/lancamentoModel';
import { useLogged } from "../../hooks/logged";

import { 
    buscarDadosUsuario as buscarDadosUsuarioService,
    cadastrarEditarLancamento as cadastrarEditarLancamentoService,
    listarLancamento as listarLancamentoService
} from "../../services/ApiService";

import { 
    Container,
    TextEmpresaTitulo,
    TextEmpresa,
    TextDescricao,
    TextTipo,
    TextSincronizado,
    TextValorSincronizado,
    TextListaLancamento,
    TextListaLancamentos,
    ViewListaLancamentos,
    TextExibirEsconder,
    TextLinhaExibirEsconder,
    TouchableOpacityListaLancamentos
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function Home() {

    const netInfo = useNetInfo();
    const { navigate } = useNavigation<NavigationPropsI>();
    const { buscarLancamentoLocalLogged } = useLogged();
    
    const [loading, setLoading] = useState<Boolean>(false);
    const [idUsuario, setIdUsuario] = useState<number>(0);
    const [nomeUsuario, setNomeUsuario] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [idEmpresa, setIdEmpresa] = useState<number>(0);
    const [empresa, setUEmpresa] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [sincronizado, setSincronizado] = useState<boolean>(false);
    const [lancamentos, setLancamentos] = useState<LancamentoModel[]>([]);
    const [exibirCampos, setExibirCampos] = useState<boolean>(true);

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
        setTimeout(() => {
            const fetchBuscarLancamentoLocalLogged = async () => {
                var kkk: any = await buscarLancamentoLocalLogged(); // buscarLancamentoLocal();
                setLancamentos(kkk);
            };
            fetchBuscarLancamentoLocalLogged();
            setLoading(false);
        }, 990);
    }, []);

    useEffect( () => {
        setTimeout(() => {

        }, 990);
    }, [sincronizado]);
    
    return (
        <>
            <Container>

                {
                    loading
                        ?   <Loading />
                        : <>
                            <TextEmpresaTitulo>Lançamentos</TextEmpresaTitulo> 

                            <ButtonComponent
                                title="Sincronizar" 
                                onPress={ () => sincronizar() } 
                                color="gray"
                                radius="6px" 
                                paddingVertical="4px"
                                paddingHorizontal="40px"
                                marginTop="0px"
                                marginBottom="10px"
                                fontSize="14px"
                                colorText="#fff"
                            />

                            {
                                exibirCampos
                                    ? <TextExibirEsconder onPress={ () => exibirEsconderCampos(false) }>Esconder Campos</TextExibirEsconder>
                                    : <TextExibirEsconder onPress={ () => exibirEsconderCampos(true) }>Exibir Campos</TextExibirEsconder>
                            }
                            
                            <TextLinhaExibirEsconder />

                            {
                                exibirCampos
                                    ? <>
                                        { camposCadastrar() }
                                    </>
                                : null
                            }

                            <TextListaLancamento>Listas das Lançamentos Cadastrados</TextListaLancamento>
                                                        
                            <FlatList
                                data={lancamentos}
                                style={{ marginLeft: -10 }}
                                renderItem={({ item }) => (
                                    <TouchableOpacityListaLancamentos 
                                        onPress={ 
                                            () => navigate("EditarLancamento", { idLancamento: item.idbanco, descricao: item.descricao, tipo: item.tipo, idEmpresa: item.firma_id, idUsuario: item.usuario_id, idWatermelon: item.id }) 
                                        }
                                    >
                                        <Text style={{ color: '#000' }}>{item.descricao.substring(0, 30)}</Text>
                                        <Text style={{ color: '#000' }}>
                                            {
                                                item.sincronizado 
                                                    ? <Text>Sync: <Text style={{ color: '#3CB371' }}>Sim</Text></Text>
                                                    : <Text>Sync: <Text style={{ color: '#c71919' }}>Não</Text></Text>
                                            }
                                        </Text>
                                    </TouchableOpacityListaLancamentos>
                                )}
                                keyExtractor={item => item.id}
                            />

                        </>
                }

            </Container>
        </>
    )

    function exibirEsconderCampos(condicao: boolean){
        setLoading(true);
        setExibirCampos(condicao);
        setTimeout(async () => {
            setLoading(false);
        }, 800);
    }

    async function cadastrarLancamentoLocalBanco() {
        
        setLoading(true);

        if(
            idEmpresa == 0
            || empresa == ''
            || tipo == ''
            || descricao == ''
            || date.toLocaleString() == ''
        ){  
            setLoading(false);
            Alert.alert("Aviso", "Todos os campos deverão ser informados!");
            return;
        }

        if(descricao.length < 10){
            setLoading(false);
            Alert.alert("Aviso", "O campo DESCRIÇÃO deve ter no mínimo 10 caracteres!");
            return;
        }

        var lancamento = { 
            id: null,
            tipo: tipo,
            data_hora: date.toLocaleString(),
            descricao: descricao,
            sincronizado: true,
            firma_id: idEmpresa,
            usuario_id: idUsuario
        };
        
        var res = await cadastrarEditarLancamentoService(lancamento); 

        var idbanco = !res ? 0 : res.lancamento.idCadastrado;

        await database.write(async () => {
            await database.get<LancamentoModel>('lancamento').create(data => {
                data.idbanco = idbanco,
                data.tipo = tipo,
                data.data_hora = date.toLocaleString(),
                data.descricao = descricao,
                data.sincronizado = idbanco == 0 ? false : true,
                data.firma_id = idEmpresa,
                data.usuario_id = idUsuario
            })
        });

        setLoading(false);
        Alert.alert("Importante", "Lançamento criado com sucesso!");
        limparCampos();
        await buscarLancamentoLocal();

    }

    async function buscarLancamentoLocal() {
        
        const lancamentosLocal = database.get<LancamentoModel>('lancamento');
        const res = await lancamentosLocal.query().fetch();

        var resposta: LancamentoModel[] = [];
    
        new Promise(() => {
            res.forEach(async (l: any) => {
                l._raw.usuario_id == idUsuario ? resposta.push(l) : false;
            });
        });

        setLancamentos(resposta);
    }

    async function buscarDadosUsuario(){

        var dados = await buscarDadosUsuarioService();
        
        setIdUsuario(dados.usuario.id);
        setNomeUsuario(dados.usuario.nome);
        setEmail(dados.usuario.login);
        setIdEmpresa(dados.usuario.idfirma);
        setUEmpresa(dados.usuario.nomefirma);
        setSincronizado(false);
    }

    function limparCampos(){
        setTipo('');
        setDescricao('');
    }

    //async function removerLancamentoLocalBanco(item: LancamentoModel) {
    //
    //    await database.write(async () => {
    //        await item.destroyPermanently();
    //    });
    //
    //    Alert.alert("Importante", "Lançamento excluso com sucesso!");
    //
    //}

    // ----------------------------------
    // -------- Functions Campos --------
    // ----------------------------------

    function camposCadastrar(){
        return (
            <>
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
                    inputStyles={{color: 'gray', fontSize: 16}}
                    dropdownTextStyles={{color: 'gray'}}
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

                <ButtonComponent
                    title="Cadastrar Lançamento" 
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
        )
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

    // ---------------------------------------
    // -------- Functions Sincronizar --------
    // ---------------------------------------

    async function sincronizar(){

        setLoading(true);

        var sincronizar = null;

        sincronizar = await sincronizarBackLancamento();

        if(sincronizar){
            setTimeout(async () => {
                await sincronizarFrontLancamento();
            }, 1000);
        }

        if(!sincronizar){
            await buscarLancamentoLocal();
            setLoading(false);
            return;
        }

    }

    async function sincronizarBackLancamento(){

        var isConnected = netInfo.isConnected ? true : false;

        if(isConnected){

            const lancamentosLocal = database.get<LancamentoModel>('lancamento');
            const lan = await lancamentosLocal.query().fetch();
    
            lan.forEach(async (l: any) => {
                var id = l._raw.idbanco == 0 ? null : l._raw.idbanco;

                var lancamentos = {
                    id: id,
                    tipo: l._raw.tipo,
                    data_hora: l._raw.data_hora,
                    descricao: l._raw.descricao,
                    sincronizado: true, //l._raw.sincronizado,
                    firma_id: l._raw.firma_id,
                    usuario_id: l._raw.usuario_id
                }

                await cadastrarEditarLancamentoService(lancamentos);
            });
            
            return true;

        }else{
            await buscarLancamentoLocal();
            Alert.alert("Local", "Banco local atualizado com sucesso! 1");
            return false;
        }

    }

    async function sincronizarFrontLancamento(){

        var isConnected = netInfo.isConnected ? true : false;

        if(isConnected){
            
            var l: any = await listarLancamentoService();

            if(l.lancamento){

                await database.write(async () => {
                    await database.collections.get('lancamento').query().destroyAllPermanently();
                });

                new Promise((resolve, reject) => {
                    l.lancamento.forEach(async (l: any) => {

                        await database.write(async () => {
                            await database.get<LancamentoModel>('lancamento').create(data => {
                                data.idbanco = l.id,
                                data.tipo = l.tipo,
                                data.data_hora = l.data_hora,
                                data.descricao = l.descricao,
                                data.sincronizado = true, //l.sincronizado,
                                data.firma_id = l.firma_id,
                                data.usuario_id = l.usuario_id
                            })
                        });
                        
                    });
                });

                setTimeout(async () => {
                    await buscarLancamentoLocal();
                    setLoading(false);
                    Alert.alert("API e Local", "Banco Local e API atualizado com sucesso!!!")
                }, 1000);
                return true;              
                
            }else{
                await buscarLancamentoLocal();
                Alert.alert("Local", "Banco Local atualizado com sucesso! 2");
                return false;
            }

        }else{
            await buscarLancamentoLocal();
            Alert.alert("Local", "Banco Local atualizado com sucesso! 3");
            return false;
        }

    }
    
}

export default Home;
