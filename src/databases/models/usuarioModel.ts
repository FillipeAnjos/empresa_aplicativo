import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class UsuarioModel extends Model {
    static table = 'usuario'

    @field('idbanco')
    idbanco!: number;

    @field('nome')
    nome!: string;

    @field('login')
    login!: string;

    @field('senha')
    senha!: string;

    @field('firma_id')
    firma_id!: number;
}