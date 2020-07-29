import { mockApi } from 'test/testUtils';
import { GET_NAVIGATOR_EXPRESSIONS_FROM_NAVSPEC } from 'test/mocks/widgets';

export const getWidget = jest.fn(mockApi({ payload: {} }));
export const getWidgets = jest.fn(mockApi({ payload: [] }));
export const postWidgets = jest.fn(mockApi({ payload: {} }));
export const putWidgets = jest.fn(mockApi({ payload: {} }));
export const deleteWidgets = jest.fn(mockApi({ payload: {} }));
export const getWidgetInfo = jest.fn(mockApi({ payload: {} }));
export const getNavigatorNavspecFromExpressions = jest.fn(mockApi({ payload: {} }));
export const getNavigatorExpressionsFromNavspec =
jest.fn(mockApi({ payload: GET_NAVIGATOR_EXPRESSIONS_FROM_NAVSPEC }));
