import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | show-available-units', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        this.set('inputValue', '1234');

        await render(hbs`{{show-available-units this.inputValue}}`);

        assert.dom(this.element).hasText('1234');
    });
});
