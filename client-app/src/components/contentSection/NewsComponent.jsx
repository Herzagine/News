import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

const NewsComponent = props => {
  const { newsToView } = props;

  return (newsToView.map(item => {
    const { tags } = item;

    const tagsArray = tags.map(tag => (<p className="card-link" key={`${tag}`}>{tag}</p>));

    return (
      <div className="card mb-4 current-event" key={item.id}>
        <div className="card-body title-container">
          <h5 className="card-title">{item.title}</h5>
        </div>
        {item.picpath && (
          <div className="img-container">
            <img src={item.picpath && `${config.host}/news/images/${item.id}`} alt="News" />
          </div>
        )}
        <div className="card-body text">
          <p className="card-text">
            {item.text}
          </p>
        </div>
        {Boolean(tagsArray.length) && (
          <div className="card-body tags">
            {tagsArray}
          </div>
        )}
        <span className="card-footer text-muted card user">
          <Link to={`/user/${item.user_login}`}>{item.user_login}</Link>
        </span>
      </div>
    );
  }));
};

export default memo(NewsComponent);
