import React, { useRef } from 'react';
import { Checkbox } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRovingTabIndex, useFocusEffect } from 'react-roving-tabindex';

import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';

import { CONFIRM_KEYS, eventToConfirm } from 'ui/common/accessibility/KeyCodes';

const CategoryTreeFilterItem = ({
  i,
  checked,
  category,
  language,
  disabled,
  onExpandCategory,
  onCheckCategory,
  filterSubject,
  expanded,
}) => {
  const ref = useRef(null);

  const [
    tabIndex,
    focused,
    handleKeyDownRove,
    handleClickRove,
  ] = useRovingTabIndex(ref, disabled);

  useFocusEffect(focused, ref);

  const onClickExpand = () => {
    if (!category.isEmpty) {
      onExpandCategory(category.code);
    }
  };
  const onClickSelect = (e) => {
    const {
      clickConfirmed,
      keyConfirmed,
    } = eventToConfirm(e);
    if (clickConfirmed || keyConfirmed) {
      onCheckCategory(category, filterSubject);
    }
    if (clickConfirmed) {
      handleKeyDownRove(e);
    }
    if (keyConfirmed) {
      handleClickRove(e);
    }
  };

  const handleKeyDown = (e) => {
    if (CONFIRM_KEYS.includes(e.keyCode)) {
      onClickSelect(e);
    } else {
      handleKeyDownRove(e);
    }
  };

  const className = ['CategoryTreeSelector__column-td'];
  if (category.isEmpty) {
    className.push('CategoryTreeSelector__column-td--empty');
  }
  const leftPadding = category.depth === 1 ? 13 : category.depth * 20;
  return (
    <tr
      key={category.code}
      ref={ref}
      tabIndex={tabIndex}
      className="CategoryTreeSelector__row"
      onKeyDown={handleKeyDown}
      onClick={handleClickRove}
    >
      <td className={className.join(' ').trim()}>
        <Checkbox
          style={{ paddingLeft: leftPadding }}
          className="CategoryTreeFilter__item-cb"
          role="button"
          tabIndex={i}
          readOnly
          checked={checked}
          onKeyDown={handleKeyDown}
          onClick={onClickSelect}
        >
          <span className="CategoryTreeSelector__select-area">
            <span className="CategoryTreeSelector__category-name">{category.titles[language]}</span>
            <RowSpinner loading={!!category.loading} />
          </span>
        </Checkbox>
        <span
          role="button"
          tabIndex={i}
          className="CategoryTreeFilter__expand-area"
          onClick={onClickExpand}
          onKeyDown={onClickExpand}
        >
          {category.isEmpty ? null : <TreeNodeExpandedIcon expanded={expanded} />}
        </span>
      </td>
    </tr>
  );
};

CategoryTreeFilterItem.propTypes = {
  i: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    isEmpty: PropTypes.bool,
    code: PropTypes.string,
    expanded: PropTypes.bool,
    titles: PropTypes.shape({}),
    depth: PropTypes.number,
    loading: PropTypes.bool,
  }).isRequired,
  disabled: PropTypes.bool,
  onExpandCategory: PropTypes.func,
  onCheckCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  filterSubject: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
};

CategoryTreeFilterItem.defaultProps = {
  onExpandCategory: () => {},
  onCheckCategory: () => {},
  expanded: false,
  disabled: false,
};

export default CategoryTreeFilterItem;
