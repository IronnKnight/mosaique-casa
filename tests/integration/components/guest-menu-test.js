import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | guest-menu', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.set('myAction', function(val) { ... });

        await render(hbs`<GuestMenu />`);

        assert.dom(this.element).hasText('');

        // Template block usage:
        await render(hbs`
      <GuestMenu>
        template block text
      </GuestMenu>
    `);

        assert.dom(this.element).hasText('template block text');
    });
});
