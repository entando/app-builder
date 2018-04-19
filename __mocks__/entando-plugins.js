import React from 'react';

module.exports = [
  {
    id: 'mock',
    reducer: () => ({}),
    widgetForms: {
      'plugin-widget': () => <span className="PluginWidget" />,
    },
  },
];
