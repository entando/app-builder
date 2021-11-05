import { clearErrors } from '@entando/messages';

import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/page-templates/common/PageTemplateFormContainer';
import { FORM_MODE_ADD, FORM_MODE_EDIT, FORM_MODE_CLONE, CONTINUE_SAVE_TYPE, DEFAULT_FORM_VALUES } from 'state/page-templates/const';

import {
  setSelectedPageTemplate,
  initPageTemplateForm,
  updatePageTemplate,
  createPageTemplate,
} from 'state/page-templates/actions';

jest.mock('state/page-templates/selectors', () =>
  jest.genMockFromModule('state/page-templates/selectors'));

jest.mock('state/page-templates/actions', () =>
  jest.genMockFromModule('state/page-templates/actions'));

const routerProps = {
  match: {
    params: {
      pageTemplateCode: 'pageTemplateCode',
    },
  },
};

const dispatch = jest.fn(() => new Promise(r => r()));

describe('PageTemplateFormContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(null); // state is useless since we're using mocked selectors
    });

    it('maps "initialValues" prop', () => {
      expect(props).toHaveProperty('initialValues', DEFAULT_FORM_VALUES);
    });
  });

  describe('mapDispatchToProps (mode = FORM_MODE_ADD)', () => {
    let props;
    const ownProps = {
      ...routerProps,
      mode: FORM_MODE_ADD,
    };
    beforeEach(() => {
      props = mapDispatchToProps(dispatch, ownProps);
      jest.clearAllMocks();
    });

    it('onSubmit dispatches createPageTemplate action', () => {
      createPageTemplate.mockReturnValue('createPageTemplate_result');
      props.onSubmit({ data: true }, CONTINUE_SAVE_TYPE);
      expect(dispatch).toHaveBeenCalledWith('createPageTemplate_result');
      expect(createPageTemplate).toHaveBeenCalledWith({
        data: true,
        configuration: {},
      }, CONTINUE_SAVE_TYPE);
    });

    it('onDidMount dispatches', () => {
      setSelectedPageTemplate.mockReturnValue('initialize_result');
      props.onDidMount();
      expect(dispatch).toHaveBeenCalledWith('initialize_result');
      expect(setSelectedPageTemplate).toHaveBeenCalledWith(DEFAULT_FORM_VALUES);
      expect(clearErrors).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps (mode = FORM_MODE_EDIT)', () => {
    let props;
    const ownProps = {
      ...routerProps,
      mode: FORM_MODE_EDIT,
    };
    beforeEach(() => {
      props = mapDispatchToProps(dispatch, ownProps);
      jest.clearAllMocks();
    });

    it('onSubmit dispatches updatePageTemplate action', () => {
      updatePageTemplate.mockReturnValue('updatePageTemplate_result');
      props.onSubmit({ data: true }, CONTINUE_SAVE_TYPE);
      expect(dispatch).toHaveBeenCalledWith('updatePageTemplate_result');
      expect(updatePageTemplate).toHaveBeenCalledWith({
        data: true,
        configuration: {},
      }, CONTINUE_SAVE_TYPE);
    });

    it('onDidMount dispatches', () => {
      initPageTemplateForm.mockReturnValue('initPageTemplateForm_result');
      props.onDidMount();
      expect(dispatch).toHaveBeenCalledWith('initPageTemplateForm_result');
      expect(initPageTemplateForm).toHaveBeenCalledWith('pageTemplateCode', FORM_MODE_EDIT);
      expect(clearErrors).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps (mode = FORM_MODE_CLONE)', () => {
    let props;
    const ownProps = {
      ...routerProps,
      mode: FORM_MODE_CLONE,
    };
    beforeEach(() => {
      props = mapDispatchToProps(dispatch, ownProps);
      jest.clearAllMocks();
    });

    it('onSubmit dispatches createPageTemplate action', () => {
      createPageTemplate.mockReturnValue('createPageTemplate_result');
      props.onSubmit({ data: true }, CONTINUE_SAVE_TYPE);
      expect(dispatch).toHaveBeenCalledWith('createPageTemplate_result');
      expect(createPageTemplate).toHaveBeenCalledWith({
        data: true,
        configuration: {},
      }, CONTINUE_SAVE_TYPE);
    });

    it('onDidMount dispatches redux-form initialize action and clearErrors', () => {
      initPageTemplateForm.mockReturnValue('initPageTemplateForm_result');
      props.onDidMount();
      expect(dispatch).toHaveBeenCalledWith('initPageTemplateForm_result');
      expect(initPageTemplateForm).toHaveBeenCalledWith('pageTemplateCode', FORM_MODE_CLONE);
      expect(clearErrors).toHaveBeenCalled();
    });
  });
});
