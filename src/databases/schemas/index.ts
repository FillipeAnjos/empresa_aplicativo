import { appSchema } from '@nozbe/watermelondb';
import { firmaSchema } from './firmaSchema';

export const schemas = appSchema({
    version: 3, // Serve para resetar o Banco local
    tables: [
        firmaSchema
    ]
});