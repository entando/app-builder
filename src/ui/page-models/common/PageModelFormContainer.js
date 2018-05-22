import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import { getPageModelFormCellMap, getPageModelFormErrors } from 'state/page-models/selectors';
import { initPageModelForm, updatePageModel, createPageModel } from 'state/page-models/actions';
import { clearErrors } from 'state/errors/actions';
import PageModelForm from 'ui/page-models/common/PageModelForm';

export const mapStateToProps = state => ({
  previewCellMap: getPageModelFormCellMap(state),
  previewErrors: getPageModelFormErrors(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (data) => {
    const jsonData = {
      ...data,
      configuration: data.configuration ? JSON.parse(data.configuration) : {},
    };

    if (ownProps.mode === 'edit') {
      dispatch(updatePageModel(jsonData));
    } else {
      dispatch(createPageModel(jsonData));
    }
  },
  onWillMount: () => {
    dispatch(clearErrors());
    if (ownProps.mode === 'edit') {
      dispatch(initPageModelForm());
    } else {
      dispatch(initialize('pageModel', {
        configuration: '{\n  "frames": []\n}',
      }));
    }
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(PageModelForm);
