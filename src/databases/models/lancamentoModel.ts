import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class LancamentoModel extends Model {
    static table = 'lancamento'

    @field('idbanco')
    idbanco!: number;

    @field('tipo')
    tipo!: string;

    @field('data_hora')
    data_hora!: string;

    @field('descricao')
    descricao!: string;

    @field('sincronizado')
    sincronizado!: boolean;

    @field('firma_id')
    firma_id!: number;

    @field('usuario_id')
    usuario_id!: number;
}