import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { Checkbox } from 'react-bootstrap';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { FormattedMessage } from 'react-intl';
import { APP_TOUR_CANCELLED, APP_TOUR_STARTED } from 'state/app-tour/const';

const mouseClickEvents = ['mouseover', 'hover', 'mousedown', 'click', 'mouseup'];
const simulateMouseClick = (element) => {
  mouseClickEvents.forEach(mouseEventType =>
    element.dispatchEvent(new MouseEvent(mouseEventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      buttons: 1,
    })));
};

const TOTAL_STEPS = 13;
const STEP_OFFSET = -2;

class AppTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dontShow: false,
      isTourOpen: true,
    };
    this.onToggleWizard = this.onToggleWizard.bind(this);
    this.onNextStep = this.onNextStep.bind(this);
    this.setIsTourOpen = this.setIsTourOpen.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount(this.props);
  }

  componentDidUpdate(prevProps) {
    const { isTourOpen } = this.state;
    const { wizardEnabled, appTourProgress, onAppTourCancel } = this.props;
    const tourInProgress = isTourOpen && wizardEnabled && appTourProgress === APP_TOUR_STARTED;
    if (prevProps.appTourProgress !== this.props.appTourProgress) {
      if (appTourProgress === APP_TOUR_CANCELLED) {
        window.onbeforeunload = null;
        window.onunload = null;
      }
      if (tourInProgress) {
        window.onbeforeunload = (e) => {
          e.preventDefault();
          e.returnValue = '';
          return e;
        };
        window.onunload = () => {
          onAppTourCancel();
        };
      }
    }
  }

  onNextStep(step, goTo) {
    const newStep = step <= 0 ? 1 : step;
    const { onAppTourStart, setNextStep } = this.props;
    if (newStep === 2) {
      setNextStep(2);
      onAppTourStart();
    } else {
      setNextStep(newStep);
    }
    goTo(newStep);
  }

  onToggleWizard(e) {
    const { onToggleDontShow, username } = this.props;
    this.setState({ dontShow: e.target.checked });
    onToggleDontShow(e.target.checked, username);
  }

  setIsTourOpen(value) {
    const { tourCreatedPageCode, publishStatus } = this.props;
    if (value === false) {
      const { onAppTourCancel } = this.props;
      onAppTourCancel(tourCreatedPageCode, publishStatus);
    }
    this.setState({ isTourOpen: value });
  }

  disableBody = target => disableBodyScroll(target)
  enableBody = target => enableBodyScroll(target)

  render() {
    const {
      wizardEnabled, appTourLastStep, appTourProgress, mainTitleValue,
      codeValue, ownerGroupValue, parentCodeValue, pageModelValue,
      lockBodyScroll, onBackToAddPage, tourCreatedPageCode, onBackToPageTree,
      customOffset, pageConfigValid, unpublishPage,
    } = this.props;
    if (!wizardEnabled || appTourProgress === APP_TOUR_CANCELLED) return null;

    const step3Element = document.querySelector('.app-tour-step-3');
    const step4Element = document.querySelector('.app-tour-step-4 > a');
    const step5Element = document.querySelector('.app-tour-step-5');
    const step11Element = document.querySelector('.app-tour-step-11');
    const step13Element = document.querySelector('.app-tour-step-13');

    return (
      <Tour
        steps={[
          {
            // step 0
            content: ({ goTo }) => (
              <div className="TourStart">
                <div className="TourStart__header TourStart__header--cancel" />
                <div className="TourStart__body TourStart__body--cancel">
                  <h1 className="TourStart__cancel-title">
                    <FormattedMessage id="tour.step.cancel.title" />
                  </h1>
                </div>
                <div className="TourStart__footer TourStart__footer--cancel clearfix">
                  <Button
                    className="TourStart__no-button"
                    bsStyle="default"
                    onClick={() => goTo(appTourLastStep)}
                  >
                    <FormattedMessage id="app.no" />
                  </Button>
                  <Button
                    className="TourStart__yes-button"
                    onClick={() => this.setIsTourOpen(false)}
                  >
                    <FormattedMessage id="app.yes" />
                  </Button>
                </div>
              </div>
            ),
            position: 'top',
            style: {
              backgroundColor: '#fff',
              height: 'auto',
              width: '446px',
              maxWidth: '446px',
              borderRadius: '1px',
              padding: 0,
            },
            stepInteraction: false,
          },
        {
          // step 1
          content: ({ goTo }) => (
            <div className="TourStart">
              <div className="TourStart__header">
                <FormattedMessage id="tour.start.welcome" />
              </div>
              <div className="TourStart__body">
                <h1 className="TourStart__title">
                  <FormattedMessage id="tour.start.title" />
                </h1>
                <span
                  className="TourStart__description"
                >
                  <FormattedMessage id="tour.start.description" />
                </span>
                <Checkbox
                  className="TourStart__checkbox"
                  role="button"
                  tabIndex={0}
                  checked={this.state.dontShow}
                  onChange={this.onToggleWizard}
                >
                  <FormattedMessage id="tour.start.dontShow" />
                </Checkbox>
                <div className="TourStart__separator" />
              </div>
              <div className="TourStart__footer">
                <Button
                  className="pull-right TourStart__start-button"
                  onClick={() => this.onNextStep(2, goTo)}
                >
                  <FormattedMessage id="app.start" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__cancel-button"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: false,
        },
        {
          // selector: '[data-tour="my-2-step"]',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.2.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.2.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => this.onNextStep(3, goTo)}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(1, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: false,
        },
        {
          selector: '.app-tour-step-3',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.3.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.3.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    simulateMouseClick(step3Element);
                    this.onNextStep(4, goTo);
                  }}
                  disabled={step3Element === null}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(2, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-4',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.4.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.4.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    simulateMouseClick(step4Element);
                    this.onNextStep(5, goTo);
                  }}
                  disabled={step4Element === null}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(3, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-5',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.5.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.5.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    simulateMouseClick(step5Element);
                    this.onNextStep(6, goTo);
                  }}
                  disabled={step5Element == null}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => {
                    simulateMouseClick(step3Element);
                    this.onNextStep(4, goTo);
                  }}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-6',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.6.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.6.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    this.onNextStep(7, goTo);
                  }}
                  disabled={!mainTitleValue}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => onBackToPageTree()}

                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          action: (node) => {
            if (node) {
              node.focus();
            }
          },
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-7',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.7.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.7.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    this.onNextStep(8, goTo);
                  }}
                  disabled={!codeValue}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(6, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          action: (node) => {
            if (node) {
              node.focus();
            }
          },
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-8',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.8.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.8.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    this.onNextStep(9, goTo);
                  }}
                  disabled={!parentCodeValue}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(7, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          action: (node) => {
            if (node) {
              node.focus();
            }
          },
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-9',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.9.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.9.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    this.onNextStep(10, goTo);
                  }}
                  disabled={!ownerGroupValue}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(8, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          action: (node) => {
            if (node) {
              node.focus();
            }
          },
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-10',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.10.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.10.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    this.onNextStep(11, goTo);
                  }}
                  disabled={!pageModelValue}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(9, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          action: (node) => {
            if (node) {
              node.focus();
            }
          },
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-11',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.11.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.11.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    simulateMouseClick(step11Element);
                  }}
                  disabled={!step11Element}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(10, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-12',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  {
                    pageConfigValid ? (
                      <FormattedMessage id="tour.step.12.title.valid" />
                    ) : (
                      <FormattedMessage id="tour.step.12.title" />
                    )
                  }
                </h1>
                {
                  !pageConfigValid && (
                  <span
                    className="TourStart__description TourStart__description--dark"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    <FormattedMessage id="tour.step.12.description" />
                  </span>

                  )
                }
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    this.onNextStep(13, goTo);
                  }}
                  disabled={!pageConfigValid}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  // onClick={() => this.onNextStep(11, goTo)}
                  onClick={() => onBackToAddPage(tourCreatedPageCode)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-13',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.13.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.13.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    simulateMouseClick(step13Element);
                  }}
                  disabled={!step13Element}
                >
                  <FormattedMessage id="app.next" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={() => this.onNextStep(12, goTo)}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
        {
          selector: '.app-tour-step-14',
          content: ({ step, goTo }) => (
            <div className="TourStart TourStart--dark">
              <div className="TourStart__header">
                <FormattedMessage id="tour.step.2.main" />
              </div>
              <div className="TourStart__body TourStart__body--dark">
                <h1 className="TourStart__title TourStart__title--dark">
                  <FormattedMessage id="tour.step.14.title" />
                </h1>
                <span
                  className="TourStart__description TourStart__description--dark"
                >
                  <FormattedMessage id="tour.step.14.description" />
                </span>
                <div className="TourStart__separator TourStart__separator--dark" />
              </div>
              <div className="TourStart__footer TourStart__footer--dark clearfix">
                <Button
                  className="pull-right TourStart__start-button TourStart__start-button--dark"
                  onClick={() => {
                    this.setIsTourOpen(false);
                  }}
                >
                  <FormattedMessage id="app.close" />
                </Button>
                <Button
                  className="pull-right TourStart__back-button TourStart__back-button--dark"
                  bsStyle="default"
                  onClick={unpublishPage}
                >
                  <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                  <FormattedMessage id="app.back" />
                </Button>
                <div className="pull-right TourStart__step-counter">
                  {`${step + STEP_OFFSET}/${TOTAL_STEPS}`}
                </div>
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => goTo(0)}
                >
                  <FormattedMessage id="app.cancel" />
                </Button>
              </div>
            </div>
          ),
          position: 'top',
          style: {
            backgroundColor: '#fff',
            height: 'auto',
            width: '446px',
            maxWidth: '446px',
            borderRadius: '1px',
            padding: 0,
          },
          stepInteraction: true,
        },
      ]}
        isOpen={this.state.isTourOpen}
        showNumber={false}
        showNavigationNumber={false}
        showNavigation={false}
        showCloseButton={false}
        showButtons={false}
        disableDotsNavigation={false}
        onRequestClose={() => {}}
        startAt={appTourLastStep}
        goToStep={appTourLastStep}
        disableFocusLock
        highlightedMaskClassName="AppTourHighlight"
        onAfterOpen={lockBodyScroll ? this.disableBody : null}
        onBeforeClose={lockBodyScroll ? this.enableBody : null}
        maskClassName={`${appTourLastStep === 1 || appTourLastStep === 12 ? 'Mask' : ''}`}
        className="helper"
        disableInteraction={false}
        inViewThreshold={2000}
        scrollDuration={150}
        scrollOffset={customOffset}
      />
    );
  }
}

AppTour.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onToggleDontShow: PropTypes.func.isRequired,
  wizardEnabled: PropTypes.bool,
  username: PropTypes.string,
  onAppTourStart: PropTypes.func.isRequired,
  onAppTourCancel: PropTypes.func.isRequired,
  onBackToAddPage: PropTypes.func.isRequired,
  onBackToPageTree: PropTypes.func.isRequired,
  unpublishPage: PropTypes.func.isRequired,
  appTourProgress: PropTypes.string,
  appTourLastStep: PropTypes.number,
  setNextStep: PropTypes.func.isRequired,
  mainTitleValue: PropTypes.string,
  codeValue: PropTypes.string,
  ownerGroupValue: PropTypes.string,
  parentCodeValue: PropTypes.string,
  pageModelValue: PropTypes.string,
  tourCreatedPageCode: PropTypes.string,
  lockBodyScroll: PropTypes.bool,
  customOffset: PropTypes.number,
  pageConfigValid: PropTypes.bool,
  publishStatus: PropTypes.bool,
};

AppTour.defaultProps = {
  wizardEnabled: false,
  username: '',
  appTourProgress: '',
  appTourLastStep: 1,
  mainTitleValue: '',
  codeValue: '',
  ownerGroupValue: '',
  parentCodeValue: '',
  pageModelValue: '',
  tourCreatedPageCode: '',
  lockBodyScroll: true,
  customOffset: 0,
  pageConfigValid: false,
  publishStatus: false,
};

export default AppTour;
