import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GuestMenuComponent extends Component {
    @action confirmReservation(event) {
        this.args.confirmReservation(event);
    }
}
