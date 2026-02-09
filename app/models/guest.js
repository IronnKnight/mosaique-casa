import Model, { attr } from '@ember-data/model';

export default class GuestModel extends Model {
    @attr name;
    @attr units;
}
