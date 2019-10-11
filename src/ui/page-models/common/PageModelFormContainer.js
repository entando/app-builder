import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { clearErrors } from '@entando/messages';
import { withRouter } from 'react-router-dom';

import { getPageModelFormCellMap, getPageModelFormErrors } from 'state/page-models/selectors';
import { initPageModelForm, updatePageModel, createPageModel } from 'state/page-models/actions';
import PageModelForm from 'ui/page-models/common/PageModelForm';

export const mapStateToProps = state => ({
  previewCellMap: getPageModelFormCellMap(state),
  previewErrors: getPageModelFormErrors(state),
});

export const mapDispatchToProps = (dispatch, { mode, match: { params } }) => ({
  onSubmit: (data) => {
    const jsonData = {
      ...data,
      configuration: data.configuration ? JSON.parse(data.configuration) : {},
    };

    if (mode === 'edit') {
      dispatch(updatePageModel(jsonData));
    } else {
      dispatch(createPageModel(jsonData));
    }
  },
  onWillMount: () => {
    dispatch(clearErrors());
    if (mode === 'edit') {
      dispatch(initPageModelForm(params.pageModelCode));
    } else {
      dispatch(initialize('pageModel', {
        configuration: '{\n  "frames": []\n}',
      }));
    }
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageModelForm));
