import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { useRovingTabIndex, useFocusEffect } from 'react-roving-tabindex';

import RowSpinner from 'ui/common/RowSpinner';
import { CONFIRM_KEYS, eventToConfirm } from 'ui/common/accessibility/KeyCodes';

const CategoryTreeItem = ({
  i,
  checked,
  category,
  language,
  disabled,
  onCheckCategory,
}) => {
  const ref = useRef(null);

  const [
    tabIndex,
    focused,
    handleKeyDownRove,
    handleClickRove,
  ] = useRovingTabIndex(ref, disabled);

  useFocusEffect(focused, ref);

  const onClickSelect = (e) => {
    const {
      clickConfirmed,
      keyConfirmed,
    } = eventToConfirm(e);
    if (clickConfirmed || keyConfirmed) {
      onCheckCategory(category);
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
          onClick={onClickSelect}
          onKeyDown={handleKeyDown}
        >
          <span className="CategoryTreeSelector__select-area">
            <span className="CategoryTreeSelector__category-name">{category.titles[language]}</span>
            <RowSpinner loading={!!category.loading} />
          </span>
        </Checkbox>
      </td>
    </tr>
  );
};

CategoryTreeItem.propTypes = {
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
  onCheckCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

CategoryTreeItem.defaultProps = {
  onCheckCategory: () => {},
  disabled: false,
};

export default CategoryTreeItem;
