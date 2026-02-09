import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    @service store;
    @service session;

    beforeModel(transition) {
        this.session.requireAuthentication(transition, 'login');
    }

    async model() {
        const reservations = this.store.findAll('reservation');
        const guests = await this.store.findAll('guest');
        const units = await this.store.findAll('unit');
        const foods = this.store.findAll('food');
        const drinks = this.store.findAll('drink');
        const orders = this.store.findAll('order');

        return {
            units,
            reservations,
            guests,
            foods,
            drinks,
            orders,
        };
    }
}
