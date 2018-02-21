import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetForm from 'ui/widgets/WidgetForm';

const WidgetPage = () => (
  <InternalPage className="WidgetPage">
    <WidgetForm onSubmit={(values) => {
      console.log('values', values);
    }}
    />
  </InternalPage>
);

export default WidgetPage;
