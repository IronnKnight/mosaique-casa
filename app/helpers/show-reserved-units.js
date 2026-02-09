import { helper } from '@ember/component/helper';

export default helper(function showReservedUnits([id, units]) {
    const unit = units.find((u) => u.id === id);
    return unit.name;
});
