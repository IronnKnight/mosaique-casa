import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
    @service session;

    beforeModel() {
        // prohibitAuthentication is used when we want to redirect to another route in case the session is already authenticated
        this.session.prohibitAuthentication('index');
    }
}
