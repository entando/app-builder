import 'test/enzyme-init';
import getWidget from 'api/widget';
import { BODY_OK, BODY_ERROR } from 'test/mocks/widget';

const WIDGET_CODE = 'test_widget';

jest.unmock('api/widget');

it('returns a promise', () => {
  const filledInput = getWidget(WIDGET_CODE);
  expect(typeof filledInput.then === 'function').toBeDefined();
});


it('get success response', () => {
  getWidget(WIDGET_CODE).then((response) => {
    expect(response).toEqual(BODY_OK);
  });
});

it('get error response', () => {
  getWidget('').then(() => {}, (error) => {
    expect(error).toEqual(BODY_ERROR);
  });
});
