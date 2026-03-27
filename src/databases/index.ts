import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas';
import { FirmaModel } from './models/firmaModel';
import { UsuarioModel } from './models/usuarioModel';
import { LancamentoModel } from './models/lancamentoModel';

const adapter = new SQLiteAdapter({
    schema: schemas
});

export const database = new Database({
    adapter,
    modelClasses: [
        FirmaModel,
        UsuarioModel,
        LancamentoModel
    ]
});
