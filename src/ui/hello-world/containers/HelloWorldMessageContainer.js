
import { connect } from 'react-redux';

// import selectors
import { getHelloWorldMessage } from 'state/hello-world/selectors';

// import the Component to be connected
import HelloWorldMessage from '../components/HelloWorldMessage';


// map the props
export const mapStateToProps = state => ({
  message: getHelloWorldMessage(state),
});


// connect the component
const HelloWorldMessageContainer = connect(mapStateToProps, null)(HelloWorldMessage);

// export connected component (Container)
export default HelloWorldMessageContainer;
