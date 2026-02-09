import Model, { attr } from '@ember-data/model';

export default class FoodModel extends Model {
    @attr name;
    @attr price;
    @attr quantity;
}
