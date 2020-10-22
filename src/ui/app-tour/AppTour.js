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

const TOTAL_STEPS = 23;
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
    this.generateSteps = this.generateSteps.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount(this.props);
  }

  componentDidUpdate(prevProps) {
    const { isTourOpen } = this.state;
    const {
      wizardEnabled, appTourProgress, onAppTourCancel, tourCreatedPageCode, publishStatus,
    } = this.props;
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
          onAppTourCancel(tourCreatedPageCode, publishStatus);
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
      document.body.style.overflow = 'auto';
    }
    this.setState({ isTourOpen: value });
  }

  generateSteps() {
    const {
      appTourLastStep, mainTitleValue,
      codeValue, ownerGroupValue, parentCodeValue, pageModelValue,
      onBackToAddPage, tourCreatedPageCode, onBackToPageTree,
      onAddLogo, onAddNavigationMenu, specificChosenPage,
      onBackToSpecificCode, onAddContent, unpublishPage,
      onBackToNavMenuConfig, onBackToContentConfig,
    } = this.props;

    const step3Element = document.querySelector('.app-tour-step-3');
    const step4Element = document.querySelector('.app-tour-step-4 > a');
    const step5Element = document.querySelector('.app-tour-step-5');
    const step8Element = document.querySelector('.PageTreeSelector__select-area');
    const step11Element = document.querySelector('.app-tour-step-11');
    const step15Element = document.querySelector('.app-tour-step-15');
    const step16Element = document.querySelector('.app-tour-step-16');
    const step16Cancel = document.querySelector('.NavigationBarConfigForm__cancel-btn');
    const step22Element = document.querySelector('.app-tour-step-22');

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
      {
        step: 1,
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
      },
      {
        step: 2,
        onNext: ({ goTo }) => this.onNextStep(3, goTo),
        onBack: ({ goTo }) => this.onNextStep(1, goTo),
      },
      {
        step: 3,
        onNext: ({ goTo }) => {
          simulateMouseClick(step3Element);
          this.onNextStep(4, goTo);
        },
        onBack: ({ goTo }) => this.onNextStep(2, goTo),
        nextButtonDisabled: step3Element === null,
        stepInteraction: true,
      },
      {
        step: 4,
        onNext: ({ goTo }) => {
          simulateMouseClick(step4Element);
          this.onNextStep(5, goTo);
        },
        onBack: ({ goTo }) => this.onNextStep(3, goTo),
        nextButtonDisabled: step4Element === null,
        stepInteraction: true,
      },
      {
        step: 5,
        onNext: ({ goTo }) => {
          simulateMouseClick(step5Element);
          this.onNextStep(6, goTo);
        },
        onBack: ({ goTo }) => {
          simulateMouseClick(step3Element);
          this.onNextStep(4, goTo);
        },
        nextButtonDisabled: step5Element == null,
        stepInteraction: true,
      },
      {
        step: 6,
        onNext: ({ goTo }) => this.onNextStep(7, goTo),
        onBack: () => onBackToPageTree(),
        nextButtonDisabled: !mainTitleValue,
        stepInteraction: true,
        focusAction: true,
      },
      {
        step: 7,
        onNext: ({ goTo }) => {
          this.onNextStep(8, goTo);
          simulateMouseClick(step8Element);
        },
        onBack: ({ goTo }) => this.onNextStep(6, goTo),
        nextButtonDisabled: !codeValue,
        stepInteraction: true,
        focusAction: true,
      },
      {
        step: 8,
        onNext: ({ goTo }) => this.onNextStep(9, goTo),
        onBack: ({ goTo }) => this.onNextStep(7, goTo),
        nextButtonDisabled: !parentCodeValue,
        stepInteraction: true,
        focusAction: true,
      },
      {
        step: 9,
        onNext: ({ goTo }) => this.onNextStep(10, goTo),
        onBack: ({ goTo }) => this.onNextStep(8, goTo),
        nextButtonDisabled: !ownerGroupValue,
        stepInteraction: true,
        focusAction: true,
      },
      {
        step: 10,
        onNext: ({ goTo }) => this.onNextStep(11, goTo),
        onBack: ({ goTo }) => this.onNextStep(9, goTo),
        nextButtonDisabled: !pageModelValue,
        stepInteraction: true,
        focusAction: true,
      },
      {
        step: 11,
        onNext: () => simulateMouseClick(step11Element),
        onBack: ({ goTo }) => this.onNextStep(10, goTo),
        nextButtonDisabled: !step11Element,
        stepInteraction: true,
      },
      {
        step: 12,
        onNext: () => onAddLogo(tourCreatedPageCode),
        onBack: () => onBackToAddPage(tourCreatedPageCode),
        stepInteraction: true,
      },
      {
        step: 13,
        onNext: () => onAddNavigationMenu(tourCreatedPageCode),
        onBack: ({ goTo }) => this.onNextStep(12, goTo),
        stepInteraction: true,
      },
      {
        step: 14,
        onNext: ({ goTo }) => this.onNextStep(15, goTo),
        onBack: ({ goTo }) => {
          simulateMouseClick(step16Cancel);
          this.onNextStep(13, goTo);
        },
        nextButtonDisabled: !specificChosenPage,
        stepInteraction: true,
      },
      {
        step: 15,
        onNext: ({ goTo }) => {
          simulateMouseClick(step15Element);
          this.onNextStep(16, goTo);
        },
        onBack: () => onBackToSpecificCode(),
        nextButtonDisabled: !step15Element,
        stepInteraction: true,
      },
      {
        step: 16,
        onNext: ({ goTo }) => {
          simulateMouseClick(step16Element);
          this.onNextStep(17, goTo);
        },
        onBack: ({ goTo }) => this.onNextStep(15, goTo),
        nextButtonDisabled: !step16Element,
        stepInteraction: true,
      },
      {
        step: 17,
        onNext: () => onAddContent(tourCreatedPageCode),
        onBack: () => onBackToNavMenuConfig(tourCreatedPageCode),
        stepInteraction: true,
      },
      {
        step: 18,
      },
      {
        step: 19,
      },
      {
        step: 20,
      },
      {
        step: 21,
      },
      {
        step: 22,
        onNext: ({ goTo }) => {
          simulateMouseClick(step22Element);
          this.onNextStep(23, goTo);
        },
        onBack: () => onBackToContentConfig(tourCreatedPageCode),
        nextButtonDisabled: !step22Element,
        stepInteraction: true,
      },
      {
        step: 23,
        onNext: () => this.setIsTourOpen(false),
        onBack: unpublishPage,
        stepInteraction: true,
        nextButtonLabelId: 'app.close',
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

  disableBody = target => disableBodyScroll(target)
  enableBody = target => enableBodyScroll(target)

  render() {
    const {
      wizardEnabled, appTourLastStep, appTourProgress, lockBodyScroll, customOffset,
    } = this.props;
    if (!wizardEnabled || appTourProgress === APP_TOUR_CANCELLED) return null;
    return (
      <Tour
        steps={this.generateSteps()}
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
        maskClassName={`${appTourLastStep === 1 || appTourLastStep === 12 || appTourLastStep === 13 || appTourLastStep === 17 ? 'Mask' : ''}`}
        className="helper"
        disableInteraction={false}
        inViewThreshold={3000}
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
  onBackToSpecificCode: PropTypes.func.isRequired,
  onAddContent: PropTypes.func.isRequired,
  unpublishPage: PropTypes.func.isRequired,
  onAddLogo: PropTypes.func.isRequired,
  onAddNavigationMenu: PropTypes.func.isRequired,
  onBackToNavMenuConfig: PropTypes.func.isRequired,
  onBackToContentConfig: PropTypes.func.isRequired,
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
  publishStatus: PropTypes.bool,
  specificChosenPage: PropTypes.string,
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
  publishStatus: false,
  specificChosenPage: '',
};

export default AppTour;
