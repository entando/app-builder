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
