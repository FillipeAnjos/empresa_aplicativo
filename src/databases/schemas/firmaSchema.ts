import { tableSchema } from '@nozbe/watermelondb';


export const firmaSchema = tableSchema({
    name: 'firma',
    columns: [
        {
            name: 'idbanco',
            type: 'number'
        },
        {
            name: 'nome',
            type: 'string'
        }
    ]
});