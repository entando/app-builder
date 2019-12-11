import React from 'react';
import DefaultAuthContext from 'auth/default/DefaultAuthContext';

const withDefaultAuth = (WrappedComponent) => {
  const Context = DefaultAuthContext;
  return class ComponentWithDefaultAuth extends React.Component {
    renderWrappedComponent = ({ authInitialized, auth }) => (
      <WrappedComponent
        {...this.props}
        isReady={authInitialized}
        auth={auth}
      />
    );

    render() {
      return <Context.Consumer>{this.renderWrappedComponent}</Context.Consumer>;
    }
  };
};

export default withDefaultAuth;
