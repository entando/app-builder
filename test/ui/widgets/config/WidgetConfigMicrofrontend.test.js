import React from 'react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import WidgetConfigMicrofrontend from 'ui/widgets/config/WidgetConfigMicrofrontend';

const renderWithReactIntl = component => render(<IntlProvider locale="en">{component}</IntlProvider>);

const widgetConfig = { name: 'John' };

const onSubmit = jest.fn();

jest.mock('helpers/resourcePath', () => ({
  getResourcePath: res => res,
}));

jest.mock('helpers/microfrontends', () => ({
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

let mockedLoading = false;
let mockedHasError = false;

jest.mock('hooks/useMfe', () => jest.fn(({ initialMfe: mfe }) => ({ assetLoading: mockedLoading, mfe, hasError: mockedHasError })));

describe('WidgetConfigMicrofrontend', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockedLoading = false;
    mockedHasError = false;
  });

  it('shows microfrontend', () => {
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={widgetConfig} />);
    expect(getByText('Sample Widget Config')).toBeInTheDocument();
    expect(queryByText('widget.page.config.error')).not.toBeInTheDocument();
  });

  it('shows microfrontend if no config', () => {
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={null} />);
    expect(getByText('Sample Widget Config')).toBeInTheDocument();
    expect(queryByText('widget.page.config.error')).not.toBeInTheDocument();
  });

  it('shows loding message if scripts are not yet loaded', () => {
    mockedLoading = true;
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.loading')).toBeInTheDocument();
  });

  it('shows config error if scripts are loaded with error', () => {
    mockedHasError = true;
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.error')).toBeInTheDocument();
  });

  it('shows config error if no scripts are provided', () => {
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={widgetWithNoConfig} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.error')).toBeInTheDocument();
  });

  it('shows config error if widget is null', () => {
    const { getByText, queryByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={null} widgetConfig={widgetConfig} />);
    expect(queryByText('Sample Widget Config')).not.toBeInTheDocument();
    expect(getByText('widget.page.config.error')).toBeInTheDocument();
  });

  // The save button component is now rendered outside WidgetConfigMicrofrontend and thus,
  // it is can not be accessed by RTL selectors
  xit('calls onSubmit if user clicks on save button', () => {
    const { getByText } = renderWithReactIntl(<WidgetConfigMicrofrontend onSubmit={onSubmit} widget={sampleWidget} widgetConfig={widgetConfig} />);
    const saveButton = getByText('app.save');
    fireEvent.click(saveButton);
    expect(onSubmit).toHaveBeenCalledWith(widgetConfig);
  });
});
