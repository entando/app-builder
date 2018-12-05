import React from 'react';
import { Row } from 'patternfly-react';

import ComponentListContainer from 'ui/digital-exchange/components/list/ComponentListContainer';

const ComponentListContent = () => (
  <div className="ComponentListContent">
    <Row>
      <ComponentListContainer />
    </Row>
  </div>
);
export default ComponentListContent;
