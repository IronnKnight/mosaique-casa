import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | calculate-article-price', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        this.set('inputValue', '1234');

        await render(hbs`{{calculate-article-price this.inputValue}}`);

        assert.dom(this.element).hasText('1234');
    });
});
