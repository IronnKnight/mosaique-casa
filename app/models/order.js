import Model, { attr } from '@ember-data/model';

export default class OrderModel extends Model {
    @attr guestId;
    @attr foods;
    @attr drinks;
}
