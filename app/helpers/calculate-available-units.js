import { helper } from '@ember/component/helper';

export default helper(function calculateAvailableUnits([guests, units]) {
    let stats = {
        available: 0,
        reserved: 0,
    };

    guests.forEach((guest) => {
        stats.reserved += guest.units.length;
    });

    stats.available = units.length - stats.reserved;

    return stats;
});
