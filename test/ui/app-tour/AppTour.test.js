import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import AppTour from 'ui/app-tour/AppTour';
import { mockRenderWithIntlAndStore } from 'test/testUtils';

const props = {
  onDidMount: jest.fn(),
  onSubmit: jest.fn(),
  username: 'test_username',
  onToggleDontShow: jest.fn(),
  onAppTourStart: jest.fn(),
  onAppTourCancel: jest.fn(),
  onBackToAddPage: jest.fn(),
  onBackToPageTree: jest.fn(),
  onBackToSpecificCode: jest.fn(),
  onAddContent: jest.fn(),
  unpublishPage: jest.fn(),
  onAddLogo: jest.fn(),
  onAddNavigationMenu: jest.fn(),
  onBackToNavMenuConfig: jest.fn(),
  onBackToContentConfig: jest.fn(),
  setNextStep: jest.fn(),
  onAddNavBarWidget: jest.fn(),
  onAddSearchWidget: jest.fn(),
  onAddLoginWidget: jest.fn(),
  onAddBannerWidget: jest.fn(),
  onAddContentListWidget: jest.fn(),
  onAddSitemapMenu: jest.fn(),
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('AppSettingsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing, and display all elements when Wizard is enabled: Step 1', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={1} appTourProgress="started" />));
    expect(getByText('Welcome to Entando')).toBeInTheDocument();
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Don’t show next time')).toBeInTheDocument();
    const nextButton = getByText('Start');
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(props.setNextStep).toBeCalledWith(2);
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 2', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={2} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Entando AppBuilder')).toBeInTheDocument();
    expect(getByText('The AppBuilder is where you\'ll go to create all of your apps using web content, micro frontends, and microservices.')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 2 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={2} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(1);
  });

  it('Test step 2 NEXT button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={2} appTourProgress="started" />));
    const nextButton = getByText('Next');
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(props.setNextStep).toBeCalledWith(3);
  });

  it('Test step 3', async () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={3} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Create the Home Page')).toBeInTheDocument();
    expect(getByText('The first step that we’ll want to do is to create our home page. Click Pages in the left sidebar.')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 3 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={3} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(2);
  });

  it('Test step 4', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={4} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Page Management')).toBeInTheDocument();
    expect(getByText('Next, click Management.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 4 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={4} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(3);
  });

  it('Test step 5', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={5} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Create a Page')).toBeInTheDocument();
    expect(getByText('Here, you\'ll see a list of pages that represent the page tree of your site. Click Add to create a new page.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 6', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={6} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Enter a Page Title')).toBeInTheDocument();
    expect(getByText('This serves as the title of your page for SEO purposes.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 7', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={7} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Enter a Page Code')).toBeInTheDocument();
    expect(getByText('The page code is used to uniquely identify a page, and is also used for search. In our example, we’ll use ‘hello_world_app’ for the page code.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 7 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={7} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(6);
  });

  it('Test step 8', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={8} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Choose a place within your site for your page')).toBeInTheDocument();
    expect(getByText('Choose a place for your page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 8 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={8} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(7);
  });

  it('Test step 9', () => {
    const { getByText, getAllByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={9} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getAllByText('Choose the Owner Group')).toHaveLength(2);
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 9 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={9} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(8);
  });

  it('Test step 10', () => {
    const { getByText, getAllByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={10} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getAllByText('Choose the Page Template')).toHaveLength(2);
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 10 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={10} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(9);
  });

  it('Test step 11', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={11} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Save and Design')).toBeInTheDocument();
    expect(getByText('Once we save our settings, we can start designing our page.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 11 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={11} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(10);
  });

  it('Test step 12', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={12} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Add Widgets')).toBeInTheDocument();
    expect(getByText('On the right sidebar, expand the Page menu. Then drag & drop the Logo widget into the dotted grey \'Logo\' section on the page.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 13', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={13} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Add Widgets')).toBeInTheDocument();
    expect(getByText('Click Next to add pre-configured Navigation Menu widget to the page design for top level horizontal menu')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 13 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={13} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(12);
  });

  it('Test step 14', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={14} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Add Widgets')).toBeInTheDocument();
    expect(getByText('On the right sidebar, expand the CMS menu. Then drag & drop the Search Form widget into the dotted grey \'Search Form\' section on the page.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 15', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={15} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Add Widgets')).toBeInTheDocument();
    expect(getByText('On the right sidebar, expand the System menu. Then drag & drop the Login widget into the dotted grey \'Login\' section on the page.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 16', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={16} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Add Widgets')).toBeInTheDocument();
    expect(getByText('Click Next to add pre-configured Content widget to the page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 16 BACK button functionality', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={16} appTourProgress="started" />));
    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(props.setNextStep).toBeCalledWith(15);
  });

  it('Test step 17', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={17} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Add Widgets')).toBeInTheDocument();
    expect(getByText('Click Next to add pre-configured Content List widget to the page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 18', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={18} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Add Widgets')).toBeInTheDocument();
    expect(getByText('Click Next to add pre-configured Navigation Menu widget to add link for sitemap in the footer')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 19', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={19} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Publish')).toBeInTheDocument();
    expect(getByText('Click Publish to see your page live.')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('Test step 20', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={20} appTourProgress="started" />));
    expect(getByText('Create Your First Application')).toBeInTheDocument();
    expect(getByText('Preview')).toBeInTheDocument();
    expect(getByText('Click Preview to see what your page will look like before you publish the page.')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });
});
