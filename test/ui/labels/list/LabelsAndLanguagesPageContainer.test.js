
import { mapDispatchToProps } from 'ui/labels/list/LabelsAndLanguagesPageContainer';


const dispatchMock = jest.fn();

describe('LabelsAndLanguagesPageContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalledTimes(2);
    });
  });
});
