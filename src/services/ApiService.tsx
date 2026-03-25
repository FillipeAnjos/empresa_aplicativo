import { Alert } from "react-native";
import UsuarioRepository from "../repositories/UsuarioRepository";
import Api from "./Api";
import ApiSemUrlPadrao from "./ApiSemUrlPadrao";
import ApiRepository from "../repositories/ApiRepository";

interface ICadastrarUsuario {
    nome: string;
    login: string;
    senha: string;
    confirma_senha: string;
    firma_id: number;
}

interface ICadastrarLancamento {
    tipo: string; 
    data_hora: string; 
    descricao: string; 
    sincronizado: boolean; 
    firma_id: number; 
    usuario_id: number;
}

async function cadastrarEditarFirma(id: number | null, nome: string) {

    const insert = { id: id, nome: nome };
    
    let url = `/cadastrarEditarFirma`;

    try {
        let res = await Api.post(url, insert);
        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no cadastrarEditarFirma - ApiService");
        return false;
    }

}

async function listarFirma() {
    
    let url = `/listarFirma`;

    try {
        let res = await Api.get(url);
        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no listarFirma - ApiService");
        return false;
    }

}

async function cadastrarUsuario({nome, login, senha, confirma_senha, firma_id}: ICadastrarUsuario) {

    const insert = { 
        nome: nome,
        login: login,
        senha: senha,
        confirma_senha: confirma_senha,
        firma_id: firma_id,
    };
    
    let url = `/cadastrarUsuario`;

    try {
        let res = await Api.post(url, insert);
        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no cadastrarUsuario - ApiService");
        return false;
    }

}

async function buscarDadosUsuario(){

    var usuarioRepository = new UsuarioRepository();

    var userLogado = await usuarioRepository.get();

    return userLogado;

}

async function cadastrarLancamento({tipo, data_hora, descricao, sincronizado, firma_id, usuario_id}: ICadastrarLancamento) {

    const insert = { 
        tipo: tipo,
        data_hora: data_hora,
        descricao: descricao,
        sincronizado: sincronizado,
        firma_id: firma_id,
        usuario_id: usuario_id
    };
    
    let url = `/cadastrarLancamento`;

    try {
        let res = await Api.post(url, insert);
        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no cadastrarLancamento - ApiService");
        return false;
    }

}

export {
    cadastrarEditarFirma,
    listarFirma,
    cadastrarUsuario,
    buscarDadosUsuario,
    cadastrarLancamento
};