import { helper } from '@ember/component/helper';

export default helper(function showAvailableUnits([unitId, guests]) {
    let reserved = [];
    let isReserved;

    guests.forEach((g) => {
        reserved = reserved.concat(g.units);
    });

    isReserved = reserved.find((r) => {
        return r === unitId;
    });

    return !isReserved;
});
