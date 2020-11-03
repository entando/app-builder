import React from 'react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';
import useScript from 'helpers/useScript';

const renderWithReactIntl = component => render(<IntlProvider locale="en">{component}</IntlProvider>);

const widgetConfig = { name: 'John' };

const onSubmit = jest.fn();

jest.mock('helpers/useScript');

jest.mock('helpers/microfrontends', () => ({
  getResourcePath: res => res,

  getMicrofrontend: () => ({
    config: { name: 'John' },
  }),

  renderMicrofrontend: () => (<div id="sample-widget-config">Sample Widget Config</div>),
}));

const sampleWidget = {
  code: 'sample',
  used: 0,
  titles: {
    en: 'Sample Widget',
    it: 'Widget di esempio',
  },
  group: null,
  pluginCode: null,
  pluginDesc: null,
  guiFragments: [],
  hasConfig: true,
  configUi: {
    customElement: 'sample-widget',
    resources: [
      'runtime.js',
      'vendor.js',
      'main.js',
    ],
  },
};

const widgetWithNoConfig = {
  code: 'sample',
  used: 0,
  titles: {
    en: 'Sample Widget',
    it: 'Widget di esempio',
  },
  group: null,
  pluginCode: null,
  pluginDesc: null,
  guiFragments: [],
  hasConfig: false,
};

describe('WidgetConfigMicrofrontend', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows microfrontend', () => {
    useScript.mockImplementation(() => [true, false]);
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={widgetConfig} />);
    expect(getByText('Sample Widget Config')).toBeInTheDocument();
    expect(queryByText('widget.page.config.error')).not.toBeInTheDocument();
  });

  it('shows microfrontend if no config', () => {
    useScript.mockImplementation(() => [true, false]);
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={null} />);
    expect(getByText('Sample Widget Config')).toBeInTheDocument();
    expect(queryByText('widget.page.config.error')).not.toBeInTheDocument();
  });

  it('shows config error if scripts are not loaded', () => {
    useScript.mockImplementation(() => [false, false]);
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.error')).toBeInTheDocument();
  });

  it('shows config error if scripts are loaded with error', () => {
    useScript.mockImplementation(() => [true, true]);
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.error')).toBeInTheDocument();
  });

  it('shows config error if no scripts are provided', () => {
    useScript.mockImplementation(() => [true, false]);
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={widgetWithNoConfig} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.error')).toBeInTheDocument();
  });

  it('shows config error if widget is null', () => {
    useScript.mockImplementation(() => [true, false]);
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={null} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.error')).toBeInTheDocument();
  });
});
