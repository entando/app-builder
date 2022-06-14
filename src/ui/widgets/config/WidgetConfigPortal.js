import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const WidgetConfigPortal = ({ children }) => {
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    setPortalContainer(document.getElementById('widget-button-holder'));
  }, []);

  return children && portalContainer && ReactDOM.createPortal(children, portalContainer);
};

export default WidgetConfigPortal;
