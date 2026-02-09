import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import fade from 'ember-animated/transitions/fade';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
    @service store;

    @tracked menuStatus = false;
    @tracked isGuest = false;
    @tracked guestName = '';
    @tracked reservationId = '';
    @tracked guestId = '';
    @tracked order;

    transition = fade;
    // date = new Date();

    @action
    async updateMenu(status, data) {
        this.menuStatus = status;

        if (this.menuStatus) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'visible';
        }

        if (!data) {
            this.model.foods.forEach((f) => {
                f.rollbackAttributes();
            });
            this.model.drinks.forEach((d) => {
                d.rollbackAttributes();
            });
            return;
        }

        this.isGuest = data.isGuest;

        if (data.name === 'guest') {
            this.guestId = data.guest.id;
            this.guestName = data.guest.name;
            return;
        }

        this.guestName = data.reservation.name;
        this.reservationId = data.reservation.id;
    }

    // RESERVATION
    @action createReservation(event) {
        event.preventDefault();
        let data = {};
        let elements = event.target;

        if (Number(elements[1].value) < 1 || !elements[0].value.trim()) {
            return;
        }

        for (let i = 0; i < elements.length - 1; i++) {
            data[elements[i].name] = elements[i].value;
        }

        elements[0].value = '';
        elements[1].value = 1;
        this.store.createRecord('reservation', data).save();
    }

    @action async deleteReservation(id) {
        let reservation = this.store.peekRecord('reservation', id);
        await reservation.destroyRecord();
    }

    // GUESTS
    @action async confirmReservation(event) {
        event.preventDefault();
        let elements = event.target;
        let units = [];

        if (!this.guestName.trim()) {
            return;
        }

        for (let i = 0; i < elements.length - 1; i++) {
            if (elements[i].name === 'unit' && elements[i].checked) {
                units.push(elements[i].value);
            }
        }

        if (units.length < 1) {
            return;
        }

        await this.store
            .createRecord('guest', {
                name: this.guestName,
                units,
            })
            .save();
        await this.deleteReservation(this.reservationId);
        this.menuStatus = false;
    }

    // ORDERS
    @action updateQuantity(id, model, name) {
        let article = this.store.peekRecord(model, id);

        if (name === 'inc') {
            article.quantity++;
        } else {
            if (article.quantity === 0) {
                return;
            }

            article.quantity--;
        }
    }

    @action async createOrder(event) {
        event.preventDefault();
        let elements = event.target;
        let foods = [];
        let drinks = [];
        let elementName = [];
        let model = '';

        for (let i = 0; i < elements.length - 1; i++) {
            if (elements[i].value > 0) {
                elementName = elements[i].name.split('--');
                if (elementName[0] === 'Food') {
                    foods.push({
                        foodId: elementName[1],
                        quantity: parseInt(elements[i].value),
                    });
                    model = 'food';
                } else {
                    drinks.push({
                        drinkId: elementName[1],
                        quantity: parseInt(elements[i].value),
                    });
                    model = 'drink';
                }

                this.store
                    .peekRecord(model, elementName[1])
                    .rollbackAttributes();
            }
        }

        if (foods.length === 0 && drinks.length === 0) {
            return;
        }

        const order = await this.store.queryRecord('order', {
            filter: {
                guestId: this.guestId,
            },
        });

        if (order) {
            const existingFoods = [...order.foods];
            const existingDrinks = [...order.drinks];

            foods.forEach((f) => {
                const index = existingFoods.findIndex((eo) => {
                    return eo.foodId === f.foodId;
                });

                if (index < 0) {
                    order.foods.push(f);
                } else {
                    order.foods[index].quantity += f.quantity;
                }
            });

            drinks.forEach((d) => {
                const index = existingDrinks.findIndex((eo) => {
                    return eo.drinkId === d.drinkId;
                });

                if (index < 0) {
                    order.drinks.push(d);
                } else {
                    order.drinks[index].quantity += d.quantity;
                }
            });

            await order.save();
            return;
        }

        this.store
            .createRecord('order', {
                guestId: this.guestId,
                foods,
                drinks,
            })
            .save();
    }

    @action async checkout(event) {
        event.preventDefault();
        if (!this.guestId) {
            return;
        }

        let guest = await this.store.peekRecord('guest', this.guestId);
        guest.destroyRecord();
        this.updateMenu(false, '');
    }
}
