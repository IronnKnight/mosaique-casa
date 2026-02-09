import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminRoute extends Route {
    @service store;
    @service session;

    beforeModel(transition) {
        this.session.requireAuthentication(transition, 'login');
    }

    async model() {
        const units = this.store.findAll('unit');
        const foods = this.store.findAll('food');
        const drinks = this.store.findAll('drink');
        const users = this.store.findAll('user');

        return {
            units,
            foods,
            drinks,
            users,
        };
    }

    resetController(controller) {
        controller.setProperties({
            activeItem: 'unit',
            activeModel: null,
        });
    }
}
