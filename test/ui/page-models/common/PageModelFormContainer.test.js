import { mapStateToProps, mapDispatchToProps } from 'ui/page-models/common/PageModelFormContainer';
import { initialize } from 'redux-form';

import { getPageModelFormCellMap, getPageModelFormErrors } from 'state/page-models/selectors';
import { initPageModelForm, updatePageModel, createPageModel } from 'state/page-models/actions';
import { clearErrors } from 'state/errors/actions';

jest.mock('state/errors/actions');

jest.mock(
  'state/page-models/selectors',
  () => jest.genMockFromModule('state/page-models/selectors'),
);

jest.mock(
  'state/page-models/actions',
  () => jest.genMockFromModule('state/page-models/actions'),
);

const ERRORS = [{ id: 'err' }];
const CELL_MAP = { some: 'value' };
const dispatch = jest.fn(() => new Promise(r => r()));

describe('PageModelFormContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      getPageModelFormCellMap.mockReturnValue(CELL_MAP);
      getPageModelFormErrors.mockReturnValue(ERRORS);
      props = mapStateToProps(null); // state is useless since we're using mocked selectors
    });

    it('maps "previewCellMap" prop', () => {
      expect(props).toHaveProperty('previewCellMap', CELL_MAP);
    });

    it('maps "previewErrors" prop', () => {
      expect(props).toHaveProperty('previewErrors', ERRORS);
    });
  });

  describe('mapDispatchToProps (mode = "add")', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatch, { mode: 'add' });
      jest.clearAllMocks();
    });

    it('onSubmit dispatches createPageModel action with no parameters', () => {
      createPageModel.mockReturnValue('createPageModel_result');
      props.onSubmit();
      expect(dispatch).toHaveBeenCalledWith('createPageModel_result');
      expect(createPageModel).toHaveBeenCalledWith();
    });

    it('onWillMount dispatches redux-form initialize action and clearErrors', () => {
      initialize.mockReturnValue('initialize_result');
      props.onWillMount();
      expect(dispatch).toHaveBeenCalledWith('initialize_result');
      expect(initialize).toHaveBeenCalledWith('pageModel', {
        configuration: '{\n  "frames": []\n}',
      });
      expect(clearErrors).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps (mode = "edit")', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatch, { mode: 'edit' });
      jest.clearAllMocks();
    });

    it('onSubmit dispatches updatePageModel action with no parameters', () => {
      updatePageModel.mockReturnValue('updatePageModel_result');
      props.onSubmit();
      expect(dispatch).toHaveBeenCalledWith('updatePageModel_result');
      expect(updatePageModel).toHaveBeenCalledWith();
    });

    it('onWillMount dispatches redux-form initialize action and clearErrors', () => {
      initPageModelForm.mockReturnValue('initPageModelForm_result');
      props.onWillMount();
      expect(dispatch).toHaveBeenCalledWith('initPageModelForm_result');
      expect(initPageModelForm).toHaveBeenCalledWith();
      expect(clearErrors).toHaveBeenCalled();
    });
  });
});
