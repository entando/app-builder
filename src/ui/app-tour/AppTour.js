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

const TOTAL_STEPS = 19;
const STEP_OFFSET = -2;

class AppTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dontShow: false,
    };
    this.onToggleWizard = this.onToggleWizard.bind(this);
    this.onNextStep = this.onNextStep.bind(this);
    this.cancelTour = this.cancelTour.bind(this);
    this.generateSteps = this.generateSteps.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount(this.props);
  }

  componentDidUpdate(prevProps) {
    const {
      wizardEnabled, appTourProgress, onAppTourCancel, tourCreatedPageCode, publishStatus,
    } = this.props;
    const tourInProgress = wizardEnabled && appTourProgress === APP_TOUR_STARTED;
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

  cancelTour(noRouting) {
    const { tourCreatedPageCode, publishStatus } = this.props;
    const { onAppTourCancel } = this.props;
    onAppTourCancel(tourCreatedPageCode, publishStatus, noRouting);
    document.body.style.overflow = 'auto';
  }

  generateSteps() {
    const {
      appTourLastStep, mainTitleValue,
      codeValue, ownerGroupValue, parentCodeValue, pageModelValue,
      onBackToAddPage, tourCreatedPageCode, onBackToPageTree,
      onAddLogo, onAddNavBarWidget, onAddSearchWidget,
      onAddLoginWidget, onAddBannerWidget,
      onAddContentListWidget, onAddSitemapMenu,
    } = this.props;

    const step3Element = document.querySelector('.app-tour-step-3');
    const step4Element = document.querySelector('.app-tour-step-4 > a');
    const step5Element = document.querySelector('.app-tour-step-5');
    const step8Element = document.querySelector('.PageTreeSelector__select-area');
    const step11Element = document.querySelector('.app-tour-step-11');
    const step20Element = document.querySelector('.app-tour-step-20');

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
                data-testid="AppTout__TourStart__NoButton"
              >
                <FormattedMessage id="app.no" />
              </Button>
              <Button
                className="TourStart__yes-button"
                onClick={() => this.cancelTour()}
                data-testid="AppTour__TourStart__YesButton"
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
                data-testid="AppTour__TourStart__CancelButton"
              >
                <FormattedMessage id="app.close" />
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
        onNext: () => onAddNavBarWidget(tourCreatedPageCode),
        onBack: ({ goTo }) => this.onNextStep(12, goTo),
        stepInteraction: true,
      },
      {
        step: 14,
        onNext: () => onAddSearchWidget(tourCreatedPageCode),
        onBack: ({ goTo }) => this.onNextStep(13, goTo),
        stepInteraction: true,
      },
      {
        step: 15,
        onNext: () => onAddLoginWidget(tourCreatedPageCode),
        onBack: ({ goTo }) => this.onNextStep(14, goTo),
        stepInteraction: true,
      },
      {
        step: 16,
        onNext: () => onAddBannerWidget(tourCreatedPageCode),
        onBack: ({ goTo }) => this.onNextStep(15, goTo),
      },
      {
        step: 17,
        onNext: () => onAddContentListWidget(tourCreatedPageCode),
        onBack: ({ goTo }) => this.onNextStep(16, goTo),
      },
      {
        step: 18,
        onNext: () => onAddSitemapMenu(tourCreatedPageCode),
        onBack: ({ goTo }) => this.onNextStep(17, goTo),
      },
      {
        step: 19,
        onNext: ({ goTo }) => this.onNextStep(20, goTo),
        onBack: ({ goTo }) => this.onNextStep(18, goTo),
        stepInteraction: true,
      },
      {
        step: 20,
        onNext: () => {
          simulateMouseClick(step20Element);
          this.cancelTour(true);
        },
        onBack: ({ goTo }) => this.onNextStep(19, goTo),
        nextButtonDisabled: !step20Element,
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
              {
                step.step !== TOTAL_STEPS + 1 && (
                <Button
                  className="pull-left TourStart__cancel-button TourStart__cancel-button--dark"
                  bsStyle="default"
                  onClick={() => args.goTo(0)}
                >
                  <FormattedMessage id="app.close" />
                </Button>
                )
              }
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
    const maskName = [1, 12, 14, 15].includes(appTourLastStep) ? 'Mask' : '';
    const scrollDuration = appTourLastStep === 5 ? 600 : 150;
    const scrollLock = window.innerWidth > 1024;
    return (
      <Tour
        steps={this.generateSteps()}
        isOpen
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
        onAfterOpen={lockBodyScroll && scrollLock ? this.disableBody : null}
        onBeforeClose={lockBodyScroll ? this.enableBody : null}
        maskClassName={maskName}
        className="helper"
        disableInteraction={false}
        inViewThreshold={3000}
        scrollDuration={scrollDuration}
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
  onAddLogo: PropTypes.func.isRequired,
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
  onAddNavBarWidget: PropTypes.func.isRequired,
  onAddSearchWidget: PropTypes.func.isRequired,
  onAddLoginWidget: PropTypes.func.isRequired,
  onAddBannerWidget: PropTypes.func.isRequired,
  onAddContentListWidget: PropTypes.func.isRequired,
  onAddSitemapMenu: PropTypes.func.isRequired,
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
};

export default AppTour;
