import Model, { attr } from '@ember-data/model';

export default class ReservationModel extends Model {
    @attr name;
    @attr people;
}
