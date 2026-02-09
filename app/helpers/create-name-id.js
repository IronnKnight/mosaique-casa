import { helper } from '@ember/component/helper';

export default helper(function createNameId([name, id]) {
    return name + '--' + id;
});
