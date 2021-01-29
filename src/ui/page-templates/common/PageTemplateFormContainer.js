import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { clearErrors } from '@entando/messages';
import { withRouter } from 'react-router-dom';

import { getPageTemplateFormCellMap, getPageTemplateFormErrors } from 'state/page-templates/selectors';
import { initPageTemplateForm, updatePageTemplate, createPageTemplate } from 'state/page-templates/actions';
import PageTemplateForm from 'ui/page-templates/common/PageTemplateForm';

import { FORM_MODE_CLONE, FORM_MODE_EDIT } from 'state/page-templates/const';

export const mapStateToProps = state => ({
  previewCellMap: getPageTemplateFormCellMap(state),
  previewErrors: getPageTemplateFormErrors(state),
});

export const mapDispatchToProps = (dispatch, { mode, match: { params } }) => ({
  onSubmit: (data) => {
    const jsonData = {
      ...data,
      configuration: data.configuration ? JSON.parse(data.configuration) : {},
    };

    if (mode === FORM_MODE_EDIT) {
      return dispatch(updatePageTemplate(jsonData));
    }
    return dispatch(createPageTemplate(jsonData));
  },
  onWillMount: () => {
    dispatch(clearErrors());
    if ([FORM_MODE_EDIT, FORM_MODE_CLONE].includes(mode)) {
      dispatch(initPageTemplateForm(params.pageTemplateCode, mode));
    } else {
      dispatch(initialize('pageTemplate', {
        configuration: '{\n  "frames": []\n}',
      }));
    }
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageTemplateForm));
