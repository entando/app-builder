import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/edit/EditWidgetFormContainer';

const GROUP = {
  code: '1',
  name: 'test',
};
const TEST_STATE = {
  mode: 'edit',
  groups: [
    GROUP,
  ],

};

const dispatchMock = jest.fn();

describe('EditWidgetFormContainer', () => {
  it('maps groups and mode property state in WidgetForm', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ mode: 'edit', groups: [GROUP] });
  });

  it('verify that onWillMount and onSubmit is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
