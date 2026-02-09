import Base from 'ember-simple-auth/authenticators/base';
// const PROD = 'https://mosaique-casa-server.herokuapp.com';
const PROD = 'http://localhost:3000';

export default Base.extend({
    async restore(data) {
        let { token } = data;
        if (token) {
            return data;
        } else {
            throw 'no valid session data';
        }
    },

    async authenticate(username, password) {
        let response = await fetch(PROD + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username,
                    password,
                },
            }),
        });

        if (response.ok) {
            return response.json();
        } else {
            let error = await response.text();
            throw new Error(error);
        }
    },

    async invalidate(data, args) {
        let logoutApi =
            args === 'admin' ? '/users/logout/all' : '/users/logout';
        let response = await fetch(PROD + logoutApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.token}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            let error = await response.text();
            return error;
        }
    },
});
