import { helper } from '@ember/component/helper';

export default helper(function calculateArticlePrice([
    article,
    articles,
    type,
]) {
    const id = type === 'foods' ? article.foodId : article.drinkId;
    const item = articles.find((a) => {
        return a.id === id;
    });

    return article.quantity * item.price;
});
