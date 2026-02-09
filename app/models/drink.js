import Model, { attr } from '@ember-data/model';

export default class DrinkModel extends Model {
    @attr name;
    @attr price;
    @attr quantity;
}
