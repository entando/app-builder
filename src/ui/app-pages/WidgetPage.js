import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetForm from 'ui/widgets/WidgetForm';

const WidgetPage = () => (
  <InternalPage className="WidgetPage">
    <WidgetForm handleSubmit={() => {}} />
  </InternalPage>
);

export default WidgetPage;
