import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GuestMenuArticleComponent extends Component {
    @action updateQuantity(id, name) {
        let model = this.args.name === 'Food' ? 'food' : 'drink';
        this.args.updateQuantity(id, model, name);
    }
}
