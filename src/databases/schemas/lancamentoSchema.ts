import { tableSchema } from '@nozbe/watermelondb';

export const lancamentoSchema = tableSchema({
    name: 'lancamento',
    columns: [
        {
            name: 'idbanco',
            type: 'number'
        },
        {
            name: 'tipo',
            type: 'string'
        },
        {
            name: 'data_hora',
            type: 'string'
        },
        {
            name: 'descricao',
            type: 'string'
        },
        {
            name: 'sincronizado',
            type: 'boolean'
        },
        {
            name: 'firma_id',
            type: 'number'
        },
        {
            name: 'usuario_id',
            type: 'number'
        }
    ]
});