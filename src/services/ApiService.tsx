import { Alert } from "react-native";
import UsuarioRepository from "../repositories/UsuarioRepository";
import Api from "./Api";
import ApiSemUrlPadrao from "./ApiSemUrlPadrao";
import ApiRepository from "../repositories/ApiRepository";

interface ICadastrarUsuario {
    id: number | null;
    nome: string;
    login: string;
    senha: string;
    confirma_senha: string | null;
    firma_id: number;
}

interface ICadastrarLancamento {
    id: number | null;
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

async function cadastrarEditarUsuario({id, nome, login, senha, confirma_senha, firma_id}: ICadastrarUsuario) {

    const insert = { 
        id: id,
        nome: nome,
        login: login,
        senha: senha,
        confirma_senha: confirma_senha,
        firma_id: firma_id,
    };
    
    let url = `/cadastrarEditarUsuario`;

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

async function cadastrarEditarLancamento({id, tipo, data_hora, descricao, sincronizado, firma_id, usuario_id}: ICadastrarLancamento) {

    const insert = { 
        id: id,
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
        console.log("Erro no cadastrarEditarLancamento - ApiService");
        return false;
    }

}

async function listarLancamento() {
    
    let url = `/buscarLancamento`;

    try {

        let res = await Api.get(url);
        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no listarLancamento - ApiService");
        return false;
    }

}

async function listarUsuarios() {
    
    let url = `/listarUsuarios`;

    try {
        let res = await Api.get(url);
        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no listarUsuarios - ApiService");
        return false;
    }

}

export {
    cadastrarEditarFirma,
    listarFirma,
    cadastrarEditarUsuario,
    buscarDadosUsuario,
    cadastrarEditarLancamento,
    listarLancamento,
    listarUsuarios
};