import { Alert } from "react-native";
import UsuarioRepository from "../repositories/UsuarioRepository";
import Api from "./Api";
import ApiSemUrlPadrao from "./ApiSemUrlPadrao";
import ApiRepository from "../repositories/ApiRepository";

interface ICadastrarUsuário {
    nome: string;
    login: string;
    senha: string;
    confirma_senha: string;
    firma_id: number;
}

async function cadastrarFirma(nome: string) {

    const insert = { nome: nome };
    
    let url = `/cadastrarFirma`;

    try {
        let res = await Api.post(url, insert);
        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no cadastrarFirma - ApiService");
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

async function cadastrarUsuario({nome, login, senha, confirma_senha, firma_id}: ICadastrarUsuário) {

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

export {
    cadastrarFirma,
    listarFirma,
    cadastrarUsuario
};