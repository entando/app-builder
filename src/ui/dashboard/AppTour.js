import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { Checkbox } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

class AppTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dontShow: false,
      isTourOpen: true,
    };
    this.onToggleWizard = this.onToggleWizard.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount(this.props);
  }

  onToggleWizard(e) {
    const { onToggleDontShow, username } = this.props;
    this.setState({ dontShow: e.target.checked });
    onToggleDontShow(e.target.checked, username);
  }

  setIsTourOpen(value) {
    this.setState({ isTourOpen: value });
  }

  render() {
    const { wizardEnabled } = this.props;
    if (!wizardEnabled) return null;
    return (
      <Tour
        steps={[
        {
          selector: '[data-tour="my-first-step"]',
          content: () => (
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
                  type="submit"
                >
                  <FormattedMessage id="app.start" />
                  <i className="fa fa-angle-right TourStart__start-icon" />
                </Button>
                <Button
                  className="pull-right TourStart__cancel-button"
                  bsStyle="default"
                  onClick={() => this.setIsTourOpen(false)}
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
      ]}
        isOpen={this.state.isTourOpen}
        showNumber={false}
        showNavigationNumber={false}
        showNavigation={false}
        showCloseButton={false}
        showButtons={false}
        disableDotsNavigation={false}
        onRequestClose={() => {}}
      />
    );
  }
}

AppTour.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onToggleDontShow: PropTypes.func.isRequired,
  wizardEnabled: PropTypes.bool,
  username: PropTypes.string,
};

AppTour.defaultProps = {
  wizardEnabled: false,
  username: '',
};

export default AppTour;
