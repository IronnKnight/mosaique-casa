import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GuestsComponent extends Component {
    @action updateGuestOrder(guest) {
        this.args.updateGuestOrder(true, {
            name: 'guest',
            isGuest: true,
            guest,
        });
    }
}
