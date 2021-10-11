import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useRovingTabIndex, useFocusEffect } from 'react-roving-tabindex';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';
import {
  CONFIRM_KEYS,
  HORIZONTAL_ARROW_KEYS,
  KEY_RIGHT,
  eventToConfirm,
} from 'ui/common/accessibility/KeyCodes';

const ExtCategoryTreeSelectorRow = ({
  i,
  category,
  language,
  disabled,
  onJoinCategory,
  onToggleExpandCategory,
  onExpandCategory,
  selectedRow,
  setSelectedRow,
  input: { onChange },
}) => {
  const ref = useRef(null);

  const [
    tabIndex,
    focused,
    handleKeyDownRove,
    handleClickRove,
  ] = useRovingTabIndex(ref, disabled);

  useFocusEffect(focused, ref);

  const categoryJoinable = category.depth !== 0;
  const categoryNotEmpty = !category.isEmpty;

  const onClickExpand = (e) => {
    const {
      clickConfirmed,
      keyConfirmed,
    } = eventToConfirm(e);

    if (categoryNotEmpty && (clickConfirmed || keyConfirmed)) {
      onToggleExpandCategory(category.code);
    }
    if (clickConfirmed) {
      handleKeyDownRove(e);
    }
    if (keyConfirmed) {
      handleClickRove(e);
    }
  };

  const onClickSelect = () => setSelectedRow(category.code);
  const onClickJoin = (e) => {
    const {
      clickConfirmed,
      keyConfirmed,
    } = eventToConfirm(e);
    if (categoryJoinable && (clickConfirmed || keyConfirmed)) {
      onJoinCategory(category.code);
      setSelectedRow(category.code);
      onChange(category.code);
    }
    if (clickConfirmed) {
      handleKeyDownRove(e);
    }
    if (keyConfirmed) {
      handleClickRove(e);
    }
  };

  const handleKeyDown = (e) => {
    if (categoryNotEmpty && HORIZONTAL_ARROW_KEYS.includes(e.keyCode)) {
      onExpandCategory(category.code, e.keyCode === KEY_RIGHT);
    } else if (categoryJoinable && CONFIRM_KEYS.includes(e.keyCode)) {
      onClickJoin(e);
    } else {
      handleKeyDownRove(e);
    }
  };

  const className = ['ExtCategoryTreeSelector__column-td'];
  if (category.isEmpty) {
    className.push('ExtCategoryTreeSelector__column-td--empty');
  }
  // higlight selected code
  if (category.code === selectedRow) {
    className.push('info');
  }

  const joinMark = categoryJoinable ? (
    <span
      className="icon fa fa-plus ExtCategoryTreeSelector__join-mark"
      role="button"
      tabIndex={-1}
      onClick={onClickJoin}
      onKeyDown={onClickJoin}
    />
  ) : null;
  return (
    <tr
      key={category.code}
      ref={ref}
      tabIndex={tabIndex}
      className="ExtCategoryTreeSelector__row"
      onKeyDown={handleKeyDown}
      onClick={handleClickRove}
    >
      <td className={className.join(' ').trim()}>
        <span
          role="button"
          tabIndex={i}
          className="ExtCategoryTreeSelector__expand-area"
          style={{ paddingLeft: category.depth * 24 }}
          onClick={onClickExpand}
          onKeyDown={onClickExpand}
        >
          <TreeNodeExpandedIcon expanded={category.expanded} />
        </span>
        <span
          className="ExtCategoryTreeSelector__select-area"
          role="button"
          tabIndex={i}
          onClick={onClickSelect}
          onKeyDown={onClickSelect}
        >
          <TreeNodeFolderIcon empty={category.isEmpty} />
          <span className="ExtCategoryTreeSelector__category-name">{category.titles[language]}</span>
          <RowSpinner loading={!!category.loading} />
        </span>
      </td>
      <td className="text-center">{joinMark}</td>
    </tr>
  );
};

ExtCategoryTreeSelectorRow.propTypes = {
  i: PropTypes.number.isRequired,
  category: PropTypes.shape({
    isEmpty: PropTypes.bool,
    code: PropTypes.string,
    expanded: PropTypes.bool,
    titles: PropTypes.shape({}),
    depth: PropTypes.number,
    loading: PropTypes.bool,
  }).isRequired,
  disabled: PropTypes.bool,
  onToggleExpandCategory: PropTypes.func,
  onExpandCategory: PropTypes.func,
  onJoinCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  selectedRow: PropTypes.string,
  setSelectedRow: PropTypes.func.isRequired,
};

ExtCategoryTreeSelectorRow.defaultProps = {
  onToggleExpandCategory: () => {},
  onExpandCategory: () => {},
  onJoinCategory: () => {},
  selectedRow: '',
  disabled: false,
};

export default ExtCategoryTreeSelectorRow;
