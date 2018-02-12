import React from 'react';
import PropTypes from 'prop-types';
import { BrandMenu, ProjectLink, UserDropdown, HelpMenu, AdminAppSwitch } from 'frontend-common-components';

const PROJECT_LINK = 'http://www.entando.com';
const PROJECT_NAME = 'ENTANDO';
const USERNAME = 'Admin';

const TITLE = 'Title';
const menuHeader = [
  <ProjectLink key="projectLink" projectLink={PROJECT_LINK} projectName={PROJECT_NAME} />,
  <UserDropdown key="userDropdown" userName={USERNAME} />,
  <AdminAppSwitch key="adminAppSwitch" />,
  <HelpMenu key="helpMenu" />,
];


const InternalPage = ({ children }) => (
  <div className="InternalPage">
    <BrandMenu title={TITLE} header={menuHeader} />
    {children}
  </div>
);

InternalPage.propTypes = {
  children: PropTypes.node,
};

InternalPage.defaultProps = {
  children: null,
};

export default InternalPage;
