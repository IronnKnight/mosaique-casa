import { helper } from '@ember/component/helper';

export default helper(function calculateTotal([
    guestId,
    orders,
    foods,
    drinks,
]) {
    let sum = {
        total: 0,
        foods: 0,
        drinks: 0,
    };

    const order = orders.find((o) => {
        return guestId === o.guestId;
    });

    if (!order) {
        return sum;
    }

    order.foods.forEach((o) => {
        let item = foods.find((f) => {
            if (f.id === o.foodId) {
                return f;
            }
        });
        sum.foods = sum.foods + item.price * o.quantity;
    });

    order.drinks.forEach((o) => {
        let item = drinks.find((d) => {
            if (d.id === o.drinkId) {
                return d;
            }
        });
        sum.drinks = sum.drinks + item.price * o.quantity;
    });

    sum.total = sum.drinks + sum.foods;

    return sum;
});
