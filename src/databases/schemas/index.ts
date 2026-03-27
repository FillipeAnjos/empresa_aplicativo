import { appSchema } from '@nozbe/watermelondb';
import { firmaSchema } from './firmaSchema';
import { usuarioSchema } from './usuarioSchema';
import { lancamentoSchema } from './lancamentoSchema';

export const schemas = appSchema({
    version: 4, // Serve para resetar o Banco local
    tables: [
        firmaSchema,
        usuarioSchema,
        lancamentoSchema
    ]
});