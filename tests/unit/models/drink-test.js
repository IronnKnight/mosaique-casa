import { module, test } from 'qunit';
import { setupTest } from 'mosaique-casa/tests/helpers';

module('Unit | Model | drink', function (hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function (assert) {
        let store = this.owner.lookup('service:store');
        let model = store.createRecord('drink', {});
        assert.ok(model);
    });
});
