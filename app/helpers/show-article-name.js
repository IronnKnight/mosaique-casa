import { helper } from '@ember/component/helper';

export default helper(function showArticleName([id, articles]) {
    const article = articles.find((a) => {
        return a.id === id;
    });

    return article.name;
});
