import React, { memo } from 'react';
import { changeCurrentPage } from '../../store/news/newsActions';
import { useSelector, useDispatch } from 'react-redux';

import { FOUR, TWO, BUTTONS_IN_STACK, NEWS_ON_PAGE } from '../../utils/const.js';

const PaginationComponent = () => {
  const { newsAfterSearch, currentPage } = useSelector(state => ({
    currentPage: state.newsReducer.currentPage,
    newsAfterSearch: state.newsReducer.newsAfterSearch,
  }));
  const dispatch = useDispatch();
  const pagesQuantity = Math.ceil(newsAfterSearch.length / NEWS_ON_PAGE);
  const pageButtons = [];
  const pageClickHandler = event => {
    dispatch(changeCurrentPage(Number(event.target.value)));
  };

  if (currentPage <= FOUR) {
    for (let i = 0; i < BUTTONS_IN_STACK; i++) {
      if (i < pagesQuantity) {
        pageButtons.push(
          <li className={currentPage === i + 1 ? 'page-item active' : 'page-item'} key={String(i + 1)}>
            <button
              type="button"
              className="page-link"
              value={i + 1}
              onClick={pageClickHandler}
            >
              {i + 1}
            </button>
          </li>);
      }
    }
  } else if (currentPage >= FOUR && currentPage <= pagesQuantity - TWO) {
    let tempPage = currentPage;

    for (let i = 0; i < BUTTONS_IN_STACK; i++) {
      pageButtons.push(
        <li
          className={currentPage === tempPage - TWO ? 'page-item active' : 'page-item'}
          key={String(tempPage - TWO)}
        >
          <button
            type="button"
            className="page-link"
            value={tempPage - TWO}
            onClick={pageClickHandler}
          >
            {tempPage - TWO}
          </button>
        </li>);
      tempPage++;
    }
  } else if (currentPage >= pagesQuantity - TWO) {
    for (let i = pagesQuantity - BUTTONS_IN_STACK; i < pagesQuantity; i++) {
      pageButtons.push(
        <li className={currentPage === i + 1 ? 'page-item active' : 'page-item'} key={String(i + 1)}>
          <button type="button" className="page-link" value={i + 1} onClick={pageClickHandler}>{i + 1}</button>
        </li>);
    }
  }

  return (
    <div>
      <ul className="pagination pagination-lg">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <button
            type="button"
            className="page-link"
            value={currentPage - 1}
            onClick={pageClickHandler}
          >
          &laquo;
          </button>
        </li>
        {pageButtons}
        <li className={currentPage === pagesQuantity ? 'page-item disabled' : 'page-item'}>
          <button
            type="button"
            className="page-link"
            value={currentPage + 1}
            onClick={pageClickHandler}
          >
          &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default memo(PaginationComponent);
