import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DateTimeComponent extends Component {
    dateNow = new Date();

    @action
    doSomething(event) {
        console.log(event);
        let a = new Date(event);
        console.log(a.getDate());
        console.log(a.getMonth());
        console.log(a.getFullYear());
    }
}
