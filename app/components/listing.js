import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ListingComponent extends Component {
    @action updateReservation(reservation) {
        this.args.updateReservation(true, {
            name: 'listing',
            isGuest: false,
            reservation,
        });
    }
}
