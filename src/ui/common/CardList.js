/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { withPermissionValues } from 'ui/auth/withPermissions';
import CardItem from 'ui/common/CardItem';

const CardList = ({ list, actions, route }) =>
  (
    <div className="CardList">
      {list.map(item => (
        <CardItem
          key={item.code}
          title={item.title}
          code={item.code}
          subtitle={item.subtitle}
          description={item.description}
          used={item.used}
          route={route}
          actions={actions(item)}
        />
    ))}
    </div>
  );
CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    used: PropTypes.number,
  })).isRequired,
  actions: PropTypes.func,
  route: PropTypes.shape({
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default withPermissionValues(CardList);
