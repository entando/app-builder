import { connect } from 'react-redux';
import { get } from 'lodash';
import { injectIntl, defineMessages } from 'react-intl';
import { setSearchAttribute, filterContentTemplateBySearch, setSearchKeyword } from 'state/content-template/actions';
import {
  getContentTemplateSearchAttribute,
  getContentTemplateSearchKeyword,
} from 'state/content-template/selectors';

import ContentTemplateSearchForm from 'ui/content-template/ContentTemplateSearchForm';

const optionMap = [
  {
    label: 'cms.contenttemplate.searchFilter.valueName',
    value: 'descr',
  },
  {
    label: 'cms.contenttemplate.form.code',
    value: 'id',
  },
];

const msgMap = optionMap.reduce((acc, { label, value }) => ({
  ...acc,
  [value]: { id: label },
}), {});

export const mapStateToProps = (state, { intl }) => {
  const msgs = defineMessages(msgMap);
  const selectOptions = optionMap.map((option) => {
    msgMap[option.value].label = intl.formatMessage(msgs[option.value]);
    return {
      ...option,
      label: msgMap[option.value].label,
    };
  });
  const value = getContentTemplateSearchAttribute(state);
  return {
    searchTerm: getContentTemplateSearchKeyword(state),
    selectOptions,
    selectedAttribute: {
      value,
      label: get(msgMap, `${value}.label`, ''),
    },
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(setSearchKeyword(''));
    dispatch(setSearchAttribute('descr'));
  },
  onChangeSearchType: evkey => (
    dispatch(setSearchAttribute(optionMap[evkey - 1].value))
  ),
  onSubmit: ({ keyword }) => {
    dispatch(filterContentTemplateBySearch(keyword));
  },
});

const ContentTemplateSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(ContentTemplateSearchForm);

export default injectIntl(ContentTemplateSearchFormContainer);
