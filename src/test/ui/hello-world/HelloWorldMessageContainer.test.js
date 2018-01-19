import React from 'react';
import configureStore from 'redux-mock-store';

import HelloWorldMessageContainer, { mapStateToProps } from 'ui/hello-world/containers/HelloWorldMessageContainer';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const WRAPPED_COMPONENT_NAME = 'HelloWorldMessage';
const mockStore = configureStore();
const initialState = { helloWorld: { message: 'Hello Mock' } }; // FIXME create mocks

describe('HelloWorldMessageContainer', () => {
  let store;
  let state;
  let component;
  let mappedProps;

  beforeEach(() => {
    store = mockStore(initialState);
    state = store.getState();
    mappedProps = mapStateToProps(state);
    component = shallow(<HelloWorldMessageContainer store={store} />);
  });

  // check if it wraps the correct Component
  it(`should wrap ${WRAPPED_COMPONENT_NAME}`, () => {
    expect(component.name()).toEqual(WRAPPED_COMPONENT_NAME);
  });

  // check props mapping
  describe('mapStateToProps() should map:', () => {
    it('message -> state.helloWorld.message', () => {
      expect(mappedProps.message).toEqual(state.helloWorld.message);
    });
  });
});
