import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { FormattedMessage } from 'react-intl';
import { APP_TOUR_CANCELLED, APP_TOUR_STARTED } from 'state/app-tour/const';

const mouseClickEvents = ['mouseover', 'hover', 'mousedown', 'click', 'mouseup'];
const simulateMouseClick = (element) => {
  mouseClickEvents.forEach(mouseEventType => element.dispatchEvent(new MouseEvent(mouseEventType, {
    view: window,
    bubbles: true,
    cancelable: true,
    buttons: 1,
  })));
};

const TOTAL_STEPS = 23;
const STEP_OFFSET = -2;

const disableBody = target => disableBodyScroll(target);
const enableBody = target => enableBodyScroll(target);

class SingleContentConfigTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTourOpen: true,
    };
    this.onNextStep = this.onNextStep.bind(this);
    this.setIsTourOpen = this.setIsTourOpen.bind(this);
    this.generateSteps = this.generateSteps.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isTourOpen } = this.state;
    const { wizardEnabled, appTourProgress, onAppTourCancel } = this.props;
    const tourInProgress = isTourOpen && wizardEnabled && appTourProgress === APP_TOUR_STARTED;
    if (prevProps.appTourProgress !== appTourProgress) {
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
    const { setNextStep } = this.props;
    setNextStep(step);
    goTo(step);
  }

  setIsTourOpen(value) {
    const { tourCreatedPageCode, publishStatus } = this.props;
    if (value === false) {
      const { onAppTourCancel } = this.props;
      onAppTourCancel(tourCreatedPageCode, publishStatus);
      document.body.style.overflow = 'auto';
    }
    this.setState({ isTourOpen: value });
  }

  generateSteps() {
    const {
      appTourLastStep, onNextSelectContent, contents,
    } = this.props;

    const step18Element = document.querySelector('.app-tour-step-18');
    const step19Cancel = document.querySelector('.GenericModal__cancel');
    const step20Element = document.querySelector('.app-tour-step-20');
    const step21Element = document.querySelector('.app-tour-step-21');
    const step21Cancel = document.querySelector('.AddContentTypeFormBody__cancel--btn');

    const steps = [
      {
        step: 0,
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
      },
      { step: 1 },
      { step: 2 },
      { step: 3 },
      { step: 4 },
      { step: 5 },
      { step: 6 },
      { step: 7 },
      { step: 8 },
      { step: 9 },
      { step: 10 },
      { step: 11 },
      { step: 12 },
      { step: 13 },
      { step: 14 },
      { step: 15 },
      { step: 16 },
      { step: 17 },
      {
        step: 18,
        onNext: ({ goTo }) => {
          simulateMouseClick(step18Element);
          this.onNextStep(19, goTo);
        },
        nextButtonDisabled: !step18Element,
        onBack: ({ goTo }) => {
          simulateMouseClick(step21Cancel);
          this.onNextStep(17, goTo);
        },
        stepInteraction: true,
      },
      {
        step: 19,
        onNext: () => onNextSelectContent(contents[0]),
        onBack: ({ goTo }) => {
          simulateMouseClick(step19Cancel);
          this.onNextStep(18, goTo);
        },
        stepInteraction: true,
      },
      {
        step: 20,
        onNext: () => simulateMouseClick(step20Element),
        nextButtonDisabled: !step20Element,
        onBack: ({ goTo }) => {
          this.onNextStep(19, goTo);
        },
        stepInteraction: true,
      },
      {
        step: 21,
        onNext: () => simulateMouseClick(step21Element),
        nextButtonDisabled: !step21Element,
        onBack: ({ goTo }) => {
          simulateMouseClick(step18Element);
          this.onNextStep(19, goTo);
        },
        stepInteraction: true,
      },
    ];
    return steps.map(step => ({
      selector: `.app-tour-step-${step.step}`,
      content: step.content || (
        args => (
          <div className="TourStart TourStart--dark">
            <div className="TourStart__header">
              <FormattedMessage id="tour.step.2.main" />
            </div>
            <div className="TourStart__body TourStart__body--dark">
              <h1 className="TourStart__title TourStart__title--dark">
                <FormattedMessage id={`tour.step.${step.step}.title`} />
              </h1>
              <span
                className="TourStart__description TourStart__description--dark"
              >
                <FormattedMessage id={`tour.step.${step.step}.description`} />
              </span>
              <div className="TourStart__separator TourStart__separator--dark" />
            </div>
            <div className="TourStart__footer TourStart__footer--dark clearfix">
              <Button
                className="pull-right TourStart__start-button TourStart__start-button--dark"
                onClick={() => step.onNext(args)}
                disabled={step.nextButtonDisabled}
              >
                <FormattedMessage id={step.nextButtonLabelId || 'app.next'} />
              </Button>
              <Button
                className="pull-right TourStart__back-button TourStart__back-button--dark"
                bsStyle="default"
                onClick={() => step.onBack(args)}
              >
                <i className="fa fa-angle-left TourStart__start-icon TourStart__start-icon--dark" />
                <FormattedMessage id="app.back" />
              </Button>
              <div className="pull-right TourStart__step-counter">
                {`${args.step + STEP_OFFSET}/${TOTAL_STEPS}`}
              </div>
              <Button
                className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                bsStyle="default"
                onClick={() => args.goTo(0)}
              >
                <FormattedMessage id="app.cancel" />
              </Button>
            </div>
          </div>
        )
      ),
      stepInteraction: step.stepInteraction || false,
      action: step.focusAction && (
        (node) => {
          if (node) {
            node.focus();
          }
        }
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
    }));
  }

  render() {
    const { isTourOpen } = this.state;
    const {
      wizardEnabled, appTourLastStep, appTourProgress, lockBodyScroll, contents,
    } = this.props;
    if (!wizardEnabled || appTourProgress === APP_TOUR_CANCELLED) return null;
    return (
      <Tour
        steps={this.generateSteps()}
        isOpen={isTourOpen}
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
        onAfterOpen={lockBodyScroll ? disableBody : null}
        onBeforeClose={enableBody}
        className="helper"
        disableInteraction={false}
        inViewThreshold={3000}
        scrollDuration={50}
        update={contents}
        updateDelay={1000}
      />
    );
  }
}

SingleContentConfigTour.propTypes = {
  wizardEnabled: PropTypes.bool,
  onAppTourCancel: PropTypes.func.isRequired,
  onNextSelectContent: PropTypes.func.isRequired,
  appTourProgress: PropTypes.string,
  appTourLastStep: PropTypes.number,
  setNextStep: PropTypes.func.isRequired,
  tourCreatedPageCode: PropTypes.string,
  lockBodyScroll: PropTypes.bool,
  publishStatus: PropTypes.bool,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
};

SingleContentConfigTour.defaultProps = {
  wizardEnabled: false,
  appTourProgress: '',
  appTourLastStep: 1,
  tourCreatedPageCode: '',
  lockBodyScroll: true,
  publishStatus: false,
  contents: [],
};

export default SingleContentConfigTour;
