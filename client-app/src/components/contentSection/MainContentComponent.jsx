import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MemodNewsComponent from './NewsComponent.jsx';
import SearchFormComponent from './SearchFormComponent.jsx';
import MemodSearchAndSpinnerComponent from './SearchAndSpinnerComponent.jsx';
import MemodPaginationComponent from './PaginationComponent.jsx';
import { NEWS_ON_PAGE } from '../../utils/const.js';
import { requestNewsFromServer } from '../../store/news/newsActions';

class MainContentComponent extends PureComponent {

  componentDidMount() {
    const { requestNewsFromServer: requestNewsFromServerExec } = this.props;

    requestNewsFromServerExec();
  }

  render() {
    const { newsToView, news, newsAfterSearch } = this.props;

    return (
      <section className="main-content">
        { news.length > 0 ? (
          <Fragment>
            <SearchFormComponent />
            {newsToView.length > 0 ? (
              <Fragment>
                {newsAfterSearch.length > NEWS_ON_PAGE && <MemodPaginationComponent />}
                <MemodNewsComponent newsToView={newsToView} />
              </Fragment>
            ) : (
              <MemodSearchAndSpinnerComponent newsToView={newsToView} news={news} />
            )
            }
          </Fragment>
        ) : (
          <span>We have not any news...</span>
        ) }
      </section>
    );
  }

}

const mapStateToProps = state => ({
  news: state.newsReducer.news,
  newsAfterSearch: state.newsReducer.newsAfterSearch,
  newsToView: state.newsReducer.newsToView,
});

const mapDispatchToProps = { requestNewsFromServer };

export default connect(mapStateToProps, mapDispatchToProps)(MainContentComponent);

MainContentComponent.propTypes = {
  news: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  newsAfterSearch: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  newsToView: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  requestNewsFromServer: PropTypes.func.isRequired,
};


