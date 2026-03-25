import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class FirmaModel extends Model {
    static table = 'firma'

    @field('idbanco')
    idbanco!: number;

    @field('nome')
    nome!: string;
}