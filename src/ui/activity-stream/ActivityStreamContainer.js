import { connect } from 'react-redux';
import { ActivityStream } from '@entando/menu';


import { toggleNotificationDrawer } from 'state/activity-stream/actions';
import { getHidden } from 'state/activity-stream/selectors';


export const mapStateToProps = state => (
  {
    hidden: getHidden(state),
  });

export const mapDispatchToProps = dispatch => ({
  closeDrawer: () => {
    dispatch(toggleNotificationDrawer());
  },
});

const ActivityStreamContainer = connect(mapStateToProps, mapDispatchToProps)(ActivityStream);

export default ActivityStreamContainer;
