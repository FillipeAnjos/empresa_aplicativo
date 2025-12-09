import { Alert } from "react-native";
import UsuarioRepository from "../repositories/UsuarioRepository";
import Api from "./Api";
import ApiSemUrlPadrao from "./ApiSemUrlPadrao";
import ApiRepository from "../repositories/ApiRepository";
import Geolocation from '@react-native-community/geolocation';

interface listarLivrosI{
    page: number;
    intervalo: number;
}

interface registrarAcessoI{
    id: number;
    tipo: string;
}

const INTERVALO = 10;

const urlLiberi = 'https://www.liberidigital.com.br';

async function listarLivros({page, intervalo}: listarLivrosI) {

    /*console.log(" ----------------------------- ");
    console.log("Pagina: " + page);

    let token = await new UsuarioRepository().getToken();

    const search = { pagina: page, intervalo: intervalo };
    let url = `/livro-listar`;

    try {
        let res = await BibliotecaApi.post(url, search, { headers: { "Authorization": `Bearer ${token}`} });
        let data = processarData(res.data);

        await ApiRepository.setPostItem(url, search, data.livros);

        return data.livros;
    } 
    catch(err) {
        return await ApiRepository.getPostItem(url,search);
    }*/
 
}

async function listarHistorico() {
    
    let token = await new UsuarioRepository().getToken();

    let url = `/v1/livro-listar-ultimas-leituras`;

    try {
        let res = await Api.get( url, { headers: { "Authorization": `Bearer ${token}`}} );

        let data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no listarHistorico - ApiService");
        return false;
    }

}

async function livroListar(page: number, intervalo: number) {

    let token = await new UsuarioRepository().getToken();

    const search = { 
        pagina: page, 
        intervalo: intervalo
    };
    
    let url = `/v1/livro-listar`;

    try {
        let res = await Api.post( url, search, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no livroListar - ApiService");
        return false;
    }
}

function processarData(dataRaw: any){
    let data: any = {};
    if(dataRaw[0] != '{'){
        data = dataRaw;
    }else{
        data = JSON.parse(dataRaw);
    }
    if(!data.sucesso)
        Alert.alert("Erro ", data.mensagem);
    return data;
}

async function getVersion(id: number) {
    
    let token = await new UsuarioRepository().getToken();

    const search = { "id_livro": id }

    try {

        var url = '/v1/livro-ver-versao';

        let res = await Api.post(url, search, { headers: { "Authorization": `Bearer ${token}`}});

        let data = processarData(res.data);

        return data.versao;
    } 
    catch(err) {
        console.log("Erro no getVersion - ApiService");
        return null;
    }
}

async function download(id: number) {

    let token = await new UsuarioRepository().getToken();

    const search = { "id_livro": id };

    try {

        var url = urlLiberi + '/api/v2/livro-download';

        let res = await ApiSemUrlPadrao.post(url, search, { headers: { "Authorization": `Bearer ${token}`}});

        let data = processarData(res.data);

        return data;
    } 
    catch(err) {
        console.log("erro no ApiService do livro-download");
        return null;
    }
}

async function downloadLib(){

    let token = await new UsuarioRepository().getToken();

    var url = urlLiberi + '/api/v2/download-libs';

    const search = {};
    try {
        let res = await ApiSemUrlPadrao.post(url, search, { headers: { "Authorization": `Bearer ${token}`}});
        let data = processarData(res.data);

        return data;
    } 
    catch(err) {
        return null;
    }
}

async function getCupomImpressoDigital(isbn: string) {
    
    let token = await new UsuarioRepository().getToken();

    const search = {
        isbn: isbn
    };
    
    let url = `/v2/get-cupom-impresso-digital`;

    try {
        let res = await Api.post( url, search, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no getCupomImpressoDigitalBiblioteca - ApiService");
        return false;
    }

}

async function exec(url: any, body: any) {

    let user = new UsuarioRepository();
    let token = await user.getToken();

    try {
        let res = await Api.post(url, body, { headers: { "Authorization": `Bearer ${token}`} } );
        return res.data;
    } 
    catch(err) {
        //debugge
        console.log("Erro no exec - ApiService");
        return null;
    }
}

async function registrarAcesso({id, tipo}: registrarAcessoI) {

    let token = await new UsuarioRepository().getToken();
    
    const insertUpdate = {
        id: id, 
        tipo: tipo
    };

    let url = `/registrar-acesso`;

    try {
        let res = await Api.post( url, insertUpdate, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no registrarAcesso - ApiService");
        return false;
    }

}

async function listarUltimasLeituras() {

    let token = await new UsuarioRepository().getToken();

    let url = `/v1/livro-listar-ultimas-leituras`;

    try {
        let res = await Api.get( url, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = processarData(res.data);
        
        return data.ultimasLeituras;
    }catch(err) {
        console.log("Erro no listarUltimasLeituras - ApiService");
        return false;
    }

}

async function listarBaixados(page: number) {

    let token = await new UsuarioRepository().getToken();

    const search = {
        pagina: page,
        intervalo: 1000,
        filtro: 'Lido'
    }

    let url = `/v1/livro-listar`;

    try {
        let res = await Api.post( url, search, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = processarData(res.data);

        await ApiRepository.setPostItem(url,search,data.livros);
        
        return data.livros;
    }catch(err) {
        return await ApiRepository.getPostItem(url,search);
    }

}

async function getPoliticaPrivacidade() {

    let token = await new UsuarioRepository().getToken();

    let url = `/v2/ver-politica-privacidade`;

    try {
        let res = await Api.post( url, {}, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = processarData(res.data);
        return data;
    }catch(err) {
        return await ApiRepository.getPostItem(url, {});
    }

}

async function listarBiblioteca(page: number) {

    let token = await new UsuarioRepository().getToken();

    const search = {
        pagina: page,
        intervalo: 10
    }

    let url = `/v1/livro-listar`;

    try {
        let res = await Api.post(url, search, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = processarData(res.data);
        await ApiRepository.setPostItem(url, search, data.livros);
        return data.livros;
    } 
    catch(err) {
        return await ApiRepository.getPostItem(url,search);
    }

}

async function verificarPermissaoQtdDispositivos(phoneModel: any, deviceId: any) {

    var app = 'liberi';

    let token = await new UsuarioRepository().getToken();

        var latitude = 'error';
        var longitude = 'error';

        let myPromise = new Promise(function(myResolve, myReject) {
            Geolocation.getCurrentPosition((info: any) => {
                
                const obj = { latitude: info.coords.latitude, longitude: info.coords.longitude };
                myResolve(obj);

            }, (error: any) => console.log("Erro", error.message));
        });
    
        await myPromise.then((res: any) => {
            latitude = res.latitude;
            longitude = res.longitude;
        }).catch(err => {
            console.log("Ocorreu um erro no Goo: " + err);
        })

    const search = {
        phone_model: phoneModel,
        device_id: deviceId,
        latitude: latitude,
        longitude: longitude,
        app: app
    }

    try {
        let res = await Api.post(`/v1/abertura-app`, search, { headers: { "Authorization": `Bearer ${token}`}});
        //let data = ApiService.processarData(res.data);

        return res.data;
    } 
    catch(err) {
        console.log(err);
        return null;
    }

    }

async function mostrarModalAvaliacao() {

    let token = await new UsuarioRepository().getToken();
    
    let url = urlLiberi + `/api/v2/mostrar-modal-avaliacao`;

    var search = {
        tipo : 'Primeiros'
    }

    try {
        let res = await ApiSemUrlPadrao.post( url, search, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no mostrarModalAvaliacao - ApiService");
        return false;
    }
}

async function avaliacaoSalvar(avaliacao: string) {

    let token = await new UsuarioRepository().getToken();
    
    let url = urlLiberi + `/api/v2/avaliacao-salvar`;

    const insert = {
        tipo: 'Primeiros',
        avaliacao: avaliacao
    }

    try {
        
        let res = await ApiSemUrlPadrao.post( url, insert, { headers: { "Authorization": `Bearer ${token}`}} );
        let data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no avaliacaoSalvar - ApiService");
        return false;
    }
}

async function getVersaoApp() {

    let token = await new UsuarioRepository().getToken();

    let search = { url: "primeirossaberes.intersaberes.com" };
    
    let url = `/v2/ver-versao-app`;

    try {
        let res = await Api.post( url, search, { headers: { "Authorization": `Bearer ${token}`}});        
        let data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no getVersaoApp - ApiService");
        return false;
    }
}

export {
    listarLivros,
    listarHistorico,
    livroListar,
    getVersion,
    download,
    downloadLib,
    getCupomImpressoDigital,
    exec,
    registrarAcesso,
    listarUltimasLeituras,
    listarBaixados,
    getPoliticaPrivacidade,
    listarBiblioteca,
    verificarPermissaoQtdDispositivos,
    mostrarModalAvaliacao,
    avaliacaoSalvar,
    getVersaoApp
};