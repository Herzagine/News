const combineTags = (news, tags) => {
    const newsLocal = news.slice();


    newsLocal.forEach(item => {
        const tagsObjects = tags.filter(tag => tag.news_id === item.id);
        const tagsArray = Array.from(new Set(tagsObjects.map(tag => tag.tag)));
        if (item['dataValues']) {
            item['dataValues'].tags = tagsArray;
        } else {
            item.tags = tagsArray;
        }
    });

    return newsLocal;
};

module.exports = combineTags;
