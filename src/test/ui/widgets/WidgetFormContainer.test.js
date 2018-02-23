import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/WidgetFormContainer';

const GROUP = {
  code: '1',
  name: 'test',
};
const TEST_STATE = {
  groups: [
    GROUP,
  ],

};

it('maps groups property state in WidgetForm', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ groups: [GROUP] });
});

it('verify that onWillMount and onSubmit is defined by mapDispatchToProps', () => {
  const dispatchMock = jest.fn();
  const result = mapDispatchToProps(dispatchMock);
  expect(result.onWillMount).toBeDefined();
  result.onWillMount();
  expect(dispatchMock).toHaveBeenCalled();
  expect(result.onSubmit).toBeDefined();
});
