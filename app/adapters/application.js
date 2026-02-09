/* eslint-disable ember/no-computed-properties-in-native-classes */
import RESTAdapter from '@ember-data/adapter/rest';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

// const PROD = 'https://mosaique-casa-server.herokuapp.com';
const PROD = 'http://localhost:3000';

export default class ApplicationAdapter extends RESTAdapter {
    @service session;

    host = PROD;

    @computed('session.{data.authenticated.token,isAuthenticated}')
    get headers() {
        let headers = {};
        if (this.session.isAuthenticated) {
            headers[
                'Authorization'
            ] = `Bearer ${this.session.data.authenticated.token}`;
        }
        return headers;
    }

    isInvalid(status, headers, payload) {
        if (payload.errors[0].error === 'unauthorized') {
            this.session.invalidate();
        }
    }
}
