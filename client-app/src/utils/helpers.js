export const searchInNews = (state, action) => {
  const { payload } = action;
  const { value, type } = payload;

  let filteredNews = state.news.slice();

  if (type === '' && value) {
    filteredNews = filteredNews.filter(item => item.text.indexOf(value) + 1 || item.title.indexOf(value) + 1
    || item.user_login.indexOf(value) + 1 || item.tags.join(',').indexOf(value) + 1);
  } else if (type === 'tags' && value) {
    filteredNews = filteredNews.filter(item => item.tags.join(',').indexOf(value) + 1);
  } else if (type === 'user' && value) {
    filteredNews = filteredNews.filter(item => item.user_login.indexOf(value) + 1);
  }

  return filteredNews;
};
