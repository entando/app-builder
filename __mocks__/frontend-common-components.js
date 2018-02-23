import React from 'react';

export const gotoRoute = jest.fn();
export const routerReducer = state => state || {};
export const routerConfig = jest.fn();
export const formattedText = jest.fn().mockReturnValue('test');
export const setCurrentLocale = jest.fn();
export const locales = { en: {}, it: {} };
export const Link = () => (<span />);
export const LoginPage = () => (<span />);
export const LoginForm = () => (<span />);
export const BrandMenu = () => (<span />);
export const ProjectLink = () => (<span />);
export const UserDropdown = () => (<span />);
export const HelpMenu = () => (<span />);
export const AdminAppSwitch = () => (<span />);
export const LinkMenuItem = () => (<span />);
export const FirstLevelMenuItem = () => (<span />);
export const DropdownMenuItem = () => (<span />);
export const ActivityStreamMenu = () => (<span />);
export const ActivityStream = () => (<span />);
export const Notification = () => (<span />);
export const DDTable = () => (<span />);
export const BreadcrumbItem = () => (<span />);
DDTable.Handle = () => (<span />);
DDTable.Tr = () => (<span />);
DDTable.DROP_MEDIUM = 'medium';
DDTable.DROP_HIGH = 'high';
DDTable.DROP_LOW = 'low';
export const getParams = jest.fn();
