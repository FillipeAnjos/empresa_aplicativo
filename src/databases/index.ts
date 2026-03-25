import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas';
import { FirmaModel } from './models/firmaModel';

const adapter = new SQLiteAdapter({
    schema: schemas
});

export const database = new Database({
    adapter,
    modelClasses: [
        FirmaModel
    ]
});

// https://www.youtube.com/watch?v=r4aAlsbF1DM&t=3560s

// 57:20