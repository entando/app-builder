import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { gotoRoute } from '@entando/router';

import { getPageModelFormCellMap, getPageModelFormErrors } from 'state/page-models/selectors';
import { initPageModelForm, updatePageModel, createPageModel } from 'state/page-models/actions';
import PageModelForm from 'ui/page-models/common/PageModelForm';
import { ROUTE_PAGE_MODEL_LIST } from 'app-init/router';

export const mapStateToProps = state => ({
  previewCellMap: getPageModelFormCellMap(state),
  previewErrors: getPageModelFormErrors(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    let promise;
    if (ownProps.mode === 'edit') {
      promise = dispatch(updatePageModel());
    } else {
      promise = dispatch(createPageModel());
    }
    return promise.then(() => {
      gotoRoute(ROUTE_PAGE_MODEL_LIST);
    });
  },

  onWillMount: () => {
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
