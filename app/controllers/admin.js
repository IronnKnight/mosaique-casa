import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AdminController extends Controller {
    @service store;
    @service session;

    @tracked activeItem = 'unit';
    @tracked activeModel;

    get activeItems() {
        return this.model[this.activeItem + 's'];
    }

    @action
    updateActiveItem(index, item) {
        let elements = document.getElementsByClassName(
            'casa-admin-navigation-item'
        );

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active');
        }

        elements[index].classList.add('active');
        this.activeItem = item;
        this.activeModel = null;
    }

    @action
    async deleteItem(id) {
        let item = this.store.peekRecord(this.activeItem, id);
        await item.destroyRecord();
    }

    @action
    selectItem(id) {
        this.activeModel = this.store.peekRecord(this.activeItem, id);
    }

    @action
    cancel() {
        this.activeModel = null;
    }

    @action
    async saveItem(event) {
        event.preventDefault();
        let elements = event.target;

        if (!this.activeModel) {
            const item = {};
            let data;
            for (let i = 0; i < elements.length - 1; i++) {
                if (!elements[i].value) {
                    return;
                }
                item[elements[i].name] = elements[i].value;
            }

            for (let i = 0; i < elements.length - 1; i++) {
                elements[i].value = '';
            }

            try {
                data = this.store.createRecord(this.activeItem, item);
                await data.save();
            } catch (error) {
                data.deleteRecord();
            }
        } else {
            for (let i = 0; i < elements.length - 2; i++) {
                if (!elements[i].value && elements[i].name !== 'password') {
                    return;
                }

                this.activeModel[elements[i].name] = elements[i].value;
            }

            for (let i = 0; i < elements.length - 2; i++) {
                elements[i].value = '';
            }

            try {
                await this.activeModel.save();
                this.activeModel = null;
            } catch (error) {
                this.activeModel.rollbackAttributes();
            }
        }
    }
}
