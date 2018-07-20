import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Icon } from 'patternfly-react';
import { Panel, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from '@entando/router';
import { ROUTE_USER_DETAIL } from 'app-init/router';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onClickDeleteComment = (recordId, commentId) => (event) => {
    event.preventDefault();
    this.props.onClickDeleteComment(recordId, commentId);
  };

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  renderComments(id) {
    return (
      <Row>
        <Col xs={12}>
          <h4 className="sr-only">Comments</h4>
          {
            this.props.comments.map(comment => (
              <div key={comment.id} className="media Notification__comment-panel">
                <Link route={ROUTE_USER_DETAIL} params={{ username: comment.username }} className="Notification__link-user pull-left">
                  <Icon name="user" />
                </Link>
                <div className="Notification__user-notification">
                  <Link route={ROUTE_USER_DETAIL} params={{ username: comment.username }} className="Notification__link-user pull-left">
                    {comment.username}
                  </Link>
                  <span className="Notification__delete-comment">
                    <a
                      href=""
                      onClick={this.onClickDeleteComment(id, comment.id)}
                      className="pull-right btn-delete-comment"
                    >
                      <span className="fa fa-times" />
                    </a>
                  </span>
                  <span className="Notification__user-comment">
                    {comment.commentText}
                  </span>
                  <p className="Notification__time-notifications">
                    <time dateTime={comment.commentDate} title={comment.commentDate}>
                      <FormattedRelative value={comment.commentDate} />
                    </time>
                  </p>
                </div>
              </div>
          ))}
        </Col>
      </Row>

    );
  }

  render() {
    const {
      id, username, notification, targetName, onClickUsername, onClickTargetName,
      onClickLike, onSubmitComment, modificationDate,

    } = this.props;

    const onSubmit = (ev) => {
      ev.preventDefault();
      onSubmitComment(id, this.state.comment);
      this.setState({ comment: '' });
    };

    const onClickUsernameHandler = (ev) => {
      ev.preventDefault();
      onClickUsername(id);
    };

    const onClickTargetNameHandler = (ev) => {
      ev.preventDefault();
      onClickTargetName(id);
    };

    const onClickTargetLikeHandler = (ev) => {
      ev.preventDefault();
      onClickLike(id);
    };

    return (
      <div className="Notification">
        <Row className="Notification__top-row">
          <Col xs={12}>
            <i className="Notification__user-icon fa fa-user fa-2x" />
            <a
              href=""
              className="Notification__user"
              onClick={onClickUsernameHandler}
            >{username}
            </a>
            <p className="Notification__notify">{notification}</p>
            <a
              href=""
              className="Notification__link"
              onClick={onClickTargetNameHandler}
            >{targetName}
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <span className="Notification__date ">
              <FormattedRelative value={modificationDate} />
            </span>
            <a
              href=""
              className="Notification__like"
              onClick={onClickTargetLikeHandler}
            >
              <i className="fa fa-thumbs-up" />
            </a>
          </Col>
        </Row>
        {this.renderComments(id)}
        <Panel className="Notification__panel-override">
          <Row className="Notification__comment-section">
            <Panel.Toggle componentClass="a" className="pull-right Notification__comment-section">
              <FormattedMessage
                id="activityStream.writeComment"
              />
            </Panel.Toggle>
          </Row>
          <Panel.Collapse>
            <Panel.Body>
              <Form onSubmit={onSubmit}>
                <Col xs={12}>
                  <textarea
                    className="Notification__text-area"
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <Button
                    type="submit"
                    className="pull-right"
                    bsStyle="primary"
                  >
                    <FormattedMessage
                      className="pull-right"
                      id="app.submit"
                    />
                  </Button>
                </Col>
              </Form>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

Notification.defaultProps = {
  onClickUsername: () => {},
  onClickTargetName: () => {},
  onClickLike: () => {},
  comments: [],
};

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  notification: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  targetName: PropTypes.string.isRequired,
  modificationDate: PropTypes.instanceOf(Date).isRequired,
  onClickTargetName: PropTypes.func,
  onClickUsername: PropTypes.func,
  onClickLike: PropTypes.func,
  onSubmitComment: PropTypes.func.isRequired,
  onClickDeleteComment: PropTypes.func.isRequired,
};

export default Notification;
