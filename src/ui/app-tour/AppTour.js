import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { Checkbox } from 'react-bootstrap';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { FormattedMessage } from 'react-intl';
import { APP_TOUR_CANCELLED, APP_TOUR_STARTED } from 'state/app-tour/const';
import { v4 as uuidv4 } from 'uuid';
import { withPermissionValues } from 'ui/auth/withPermissions';

// This mutes warnings and errors of the library
// eslint-disable-next-line no-console
const originalWarn = console.warn;

// eslint-disable-next-line no-console
console.warn = (message, ...args) => {
  if (
    typeof message === 'string' &&
    message.includes("Please check the 'steps' Tour prop Array at position")
  ) {
    return; // Ignore the warning
  }

  // Log the warning
  originalWarn.apply(console, [message, ...args]);
};

const mouseClickEvents = ['mouseover', 'hover', 'mousedown', 'click', 'mouseup'];
export const simulateMouseClick = (element) => {
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

const LISTEN_TUTORIAL_START = 'tutorial:start';
const LISTEN_TUTORIAL_NEXT_STEP = 'tutorial';

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
    this.listenTutorialStart = this.listenTutorialStart.bind(this);
    this.listenTutorialNextStep = this.listenTutorialNextStep.bind(this);
  }

  componentDidMount() {
    window.addEventListener(LISTEN_TUTORIAL_START, this.listenTutorialStart);
    window.addEventListener(LISTEN_TUTORIAL_NEXT_STEP, this.listenTutorialNextStep);
    this.props.checkIfWizardCanBeShown(this.props.isSuperuser);
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
  componentWillUnmount() {
    window.removeEventListener(LISTEN_TUTORIAL_START, this.listenTutorialStart);
    window.removeEventListener(LISTEN_TUTORIAL_NEXT_STEP, this.listenTutorialNextStep);
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

  listenTutorialStart() {
    const { onAppTourStart, setNextStep } = this.props;
    setNextStep(2);
    onAppTourStart();
  }

  listenTutorialNextStep(event) {
    const { setNextStep } = this.props;
    const { nextStep } = event.detail;
    setNextStep(nextStep);
  }

  generateSteps() {
    const {
      appTourLastStep, languages,
      onBackToAddPage, tourCreatedPageCode, onBackToPageTree,
      onAddLogo, onAddNavBarWidget, onAddSearchWidget,
      onAddLoginWidget, onAddBannerWidget,
      onAddContentListWidget, onAddSitemapMenu,
      onAppTourFinish, innerRef,
    } = this.props;

    const addPageformikValues = innerRef ? (innerRef.current || {}).values || {} : {};

    const defaultLang = languages.find(lang => lang.isDefault) || { code: 'en' };
    const defaultLangCode = defaultLang.code;

    const mainTitleValue = (addPageformikValues.titles || {})[defaultLangCode] || '';
    const codeValue = addPageformikValues.code || '';
    const ownerGroupValue = addPageformikValues.ownerGroup || '';
    const parentCodeValue = addPageformikValues.parentCode || '';
    const pageModelValue = addPageformikValues.pageModel || '';

    const mfeAppBuilderMenu = document.getElementsByTagName('app-builder-menu') ? document.getElementsByTagName('app-builder-menu')[0] : null;
    const getStep3Element = () => (mfeAppBuilderMenu ? mfeAppBuilderMenu.shadowRoot.querySelector('.app-tour-step-3 > a') : document.querySelector('.app-tour-step-3 > a'));
    const getStep4Element = () => (mfeAppBuilderMenu ? mfeAppBuilderMenu.shadowRoot.querySelector('.app-tour-step-4 > a') : document.querySelector('.app-tour-step-4 > a'));

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
              >
                <FormattedMessage id="app.no" />
              </Button>
              <Button
                className="TourStart__yes-button"
                onClick={() => this.cancelTour(true)}
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
          simulateMouseClick(getStep3Element());
          this.onNextStep(4, goTo);
        },
        onBack: ({ goTo }) => this.onNextStep(2, goTo),
        stepInteraction: true,
      },
      {
        step: 4,
        onNext: ({ goTo }) => {
          simulateMouseClick(getStep4Element());
          this.onNextStep(5, goTo);
        },
        onBack: ({ goTo }) => this.onNextStep(3, goTo),
        stepInteraction: true,
      },
      {
        step: 5,
        onNext: ({ goTo }) => {
          simulateMouseClick(step5Element);
          this.onNextStep(6, goTo);
        },
        onBack: ({ goTo }) => {
          simulateMouseClick(getStep3Element());
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
        onNext: ({ goTo }) => {
          this.onNextStep(13, goTo);
          onAddLogo(tourCreatedPageCode);
        },
        onBack: () => onBackToAddPage(tourCreatedPageCode),
        stepInteraction: true,
      },
      {
        step: 13,
        onNext: ({ goTo }) => {
          this.onNextStep(14, goTo);
          onAddNavBarWidget(tourCreatedPageCode);
        },
        onBack: ({ goTo }) => this.onNextStep(12, goTo),
        stepInteraction: true,
      },
      {
        step: 14,
        onNext: ({ goTo }) => {
          this.onNextStep(15, goTo);
          onAddSearchWidget(tourCreatedPageCode);
        },
        onBack: ({ goTo }) => this.onNextStep(13, goTo),
        stepInteraction: true,
      },
      {
        step: 15,
        onNext: ({ goTo }) => {
          this.onNextStep(16, goTo);
          onAddLoginWidget(tourCreatedPageCode);
        },
        onBack: ({ goTo }) => this.onNextStep(14, goTo),
        stepInteraction: true,
      },
      {
        step: 16,
        onNext: ({ goTo }) => {
          this.onNextStep(17, goTo);
          onAddBannerWidget(tourCreatedPageCode);
        },
        onBack: ({ goTo }) => this.onNextStep(15, goTo),
      },
      {
        step: 17,
        onNext: ({ goTo }) => {
          this.onNextStep(18, goTo);
          onAddContentListWidget(tourCreatedPageCode);
        },
        onBack: ({ goTo }) => this.onNextStep(16, goTo),
      },
      {
        step: 18,
        onNext: ({ goTo }) => {
          this.onNextStep(19, goTo);
          onAddSitemapMenu(tourCreatedPageCode);
        },
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
          onAppTourFinish();
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
      wizardEnabled, appTourLastStep, appTourProgress, lockBodyScroll, customOffset, isDismissed,
      isSuperuser, wizardCanBeShown,
    } = this.props;
    // sessionStorage is persistent between rerenders
    // and is cleared out when the current tab is closed,
    // if the wizard is completed or close on a session live, users won't see it anymore.
    if (!wizardEnabled || appTourProgress === APP_TOUR_CANCELLED || isDismissed || !isSuperuser ||
      !wizardCanBeShown) {
      return null;
    }
    const maskName = [1, 12, 14, 15].includes(appTourLastStep) ? 'Mask' : '';
    const scrollDuration = appTourLastStep === 5 ? 600 : 150;
    const scrollLock = window.innerWidth > 1024;
    const needsUpdate = appTourLastStep === 11 ? `give-me-force-update-${uuidv4()}` : 'no-force-update';
    return (
      <Tour
        key={needsUpdate}
        steps={this.generateSteps()}
        isOpen={wizardEnabled}
        showNumber={false}
        showNavigationNumber={false}
        showNavigation={false}
        showCloseButton={false}
        showButtons={false}
        disableDotsNavigation={false}
        onRequestClose={() => {}}
        startAt={appTourLastStep}
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
  onAppTourFinish: PropTypes.func.isRequired,
  isDismissed: PropTypes.bool,
  isSuperuser: PropTypes.bool.isRequired,
  wizardCanBeShown: PropTypes.oneOfType([PropTypes.bool, undefined]),
  checkIfWizardCanBeShown: PropTypes.func.isRequired,
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    isActive: PropTypes.bool,
    isDefault: PropTypes.bool,
  })),
};

AppTour.defaultProps = {
  wizardEnabled: false,
  username: '',
  appTourProgress: '',
  appTourLastStep: 1,
  tourCreatedPageCode: '',
  lockBodyScroll: true,
  customOffset: 0,
  publishStatus: false,
  isDismissed: false,
  wizardCanBeShown: undefined,
  innerRef: null,
  languages: [],
};

export default withPermissionValues(AppTour);
