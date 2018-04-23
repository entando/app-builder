import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class DetailCategoryTable extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const { category } = this.props;

    const renderTitles = () => {
      if (category.titles) {
        return Object.keys(category.titles).map(langKey => (
          <span key={langKey} className="DetailCategory__detail-titles">
            <span className="DetailCategory__detail-titles-key">{langKey}</span>
            {category.titles[langKey]}
          </span>
        ));
      }
      return '';
    };

    return (
      <div className="DetailCategory">
        <dl className="DetailCategory__detail-list">
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.code" /></dt>
          <dd className="col-xs-10 DetailCategory__detail-item">{category.code}</dd>
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.name" /></dt>
          <dd className="col-xs-10 DetailCategory__detail-item">{renderTitles()}</dd>
        </dl>
      </div>
    );
  }
}

DetailCategoryTable.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  category: PropTypes.shape({
    code: PropTypes.string,
    titles: {},
  }),
};

DetailCategoryTable.defaultProps = {
  category: {
    code: '',
    titles: {},
  },
};

export default DetailCategoryTable;
