import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
};

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('AppSettingsForm', () => {
  it('renders without crashing, and display all elements when Wizard is enabled: Step 1', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={1} appTourProgress="started" />));
    expect(getByText('Welcome to Entando')).toBeInTheDocument();
    expect(getByText('Create your first application')).toBeInTheDocument();
    expect(getByText('don’t show next time')).toBeInTheDocument();
    expect(getByText('Start')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 2', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={2} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('To create your first application you start creating the home page, your first page')).toBeInTheDocument();
    expect(getByText('get familiar with the menu')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 3', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={3} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Point to Menu Pages')).toBeInTheDocument();
    expect(getByText('Click on Menu Pages')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 4', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={4} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Point to Menu Management')).toBeInTheDocument();
    expect(getByText('Click on Menu Management')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });


  it('Test step 5', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={5} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Create a Page')).toBeInTheDocument();
    expect(getByText('Click on Add Button to create a new page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 6', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={6} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Choose a title for your page')).toBeInTheDocument();
    expect(getByText('Choose a Title for your page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 7', () => {
    const { getByText, getAllByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={7} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getAllByText('Choose the code')).toHaveLength(2);
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 8', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={8} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Choose a place within your site for your page')).toBeInTheDocument();
    expect(getByText('Choose a place for your page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 9', () => {
    const { getByText, getAllByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={9} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getAllByText('Choose the Owner Group')).toHaveLength(2);
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 10', () => {
    const { getByText, getAllByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={10} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getAllByText('Choose the Page Template')).toHaveLength(2);
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 11', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={11} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Now you can save and configure your first page')).toBeInTheDocument();
    expect(getByText('Save and Configure your page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 12', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={12} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Now you can choose the widgets for your page')).toBeInTheDocument();
    expect(getByText('Drag & Drop the following widget: Custom - Logo')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 13', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={13} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Now you can choose the widgets for your page')).toBeInTheDocument();
    expect(getByText('Drag & Drop the following widget: Custom - Navigation Menu')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 14', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={14} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Choose the navigation starting point')).toBeInTheDocument();
    expect(getByText('Click on "Specific" and choose any page to show in the navigation bar')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 15', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={15} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Click Add a new expression')).toBeInTheDocument();
    expect(getByText('This will add a new expression to navigation menu')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 16', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={16} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Save the navigation menu configuration')).toBeInTheDocument();
    expect(getByText('Save the configuration and return to the page configuration screen')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 17', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={17} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Now you can choose the widgets for your page')).toBeInTheDocument();
    expect(getByText('Drag & Drop the following widget: CMS - Content')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 18', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={18} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Click on Add existing content')).toBeInTheDocument();
    expect(getByText('Click on Add existing content button to browse available published contents')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 19', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={19} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Select a published content')).toBeInTheDocument();
    expect(getByText('Select a published content to assign it to use it for the Content configuration')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 20', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={20} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Click Choose')).toBeInTheDocument();
    expect(getByText('Click Choose to finish assignment')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 21', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={21} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Click Save')).toBeInTheDocument();
    expect(getByText('Click to save the content widget configuration')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 22', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={22} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('Save & Publish your first page')).toBeInTheDocument();
    expect(getByText('Click on Publish Button to save and publish your first page')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });

  it('Test step 23', () => {
    const { getByText } =
    render(mockRenderWithIntlAndStore(<AppTour {...props} wizardEnabled appTourLastStep={23} appTourProgress="started" />));
    expect(getByText('Create your first Application')).toBeInTheDocument();
    expect(getByText('You can use the preview to check your new page')).toBeInTheDocument();
    expect(getByText('Click on Preview to see your page in the Browser')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
