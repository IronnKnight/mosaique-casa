import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
    @service session;

    @tracked error;
    @tracked username;
    @tracked password;

    @action async login(event) {
        event.preventDefault();
        try {
            await this.session.authenticate(
                'authenticator:token',
                this.username,
                this.password
            );
            this.session.set('store.cookieExpirationTime', 86400);
        } catch (e) {
            this.error = e;
        }
    }

    @action update(attr, event) {
        this[attr] = event.target.value.trim();
    }
}
