import { tableSchema } from '@nozbe/watermelondb';

export const usuarioSchema = tableSchema({
    name: 'usuario',
    columns: [
        {
            name: 'idbanco',
            type: 'number'
        },
        {
            name: 'nome',
            type: 'string'
        },
        {
            name: 'login',
            type: 'string'
        },
        {
            name: 'senha',
            type: 'string'
        },
        {
            name: 'firma_id',
            type: 'number'
        }
    ]
});