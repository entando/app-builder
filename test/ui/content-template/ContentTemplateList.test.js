import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, within } from '@testing-library/react';
import { mockRenderWithRouter, mockRenderWithIntl } from 'testutils/helpers';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK as contentTemplates } from 'testutils/mocks/contentTemplate';

import ContentTemplateList from 'ui/content-template/ContentTemplateList';

const props = {
  contentTemplates,
  onDidMount: jest.fn(),
  fetchList: () => {},
  page: 1,
  pageSize: 10,
  totalItems: 10,
  onClickDelete: () => {},
};

const generateWrapper = () => mockRenderWithRouter(
  mockRenderWithIntl(
    <ContentTemplateList {...props} />,
    {
      modal: { info: {}, visiableModal: '' },
    },
  ),
);

describe('content-template/ContentTemplateList', () => {
  it('renders component without crashing', () => {
    render(generateWrapper(<ContentTemplateList {...props} />));
    const actionHeader = screen.getByText('Actions');
    expect(actionHeader).toBeTruthy();
  });

  it('has class ContentTemplateList__table', () => {
    render(generateWrapper(<ContentTemplateList {...props} />));
    expect(screen.getByText('Actions').closest('table')).toBeTruthy();
  });

  it('called onDidMount and load rows same length with contentTemplates', () => {
    render(generateWrapper(<ContentTemplateList {...props} />));
    expect(props.onDidMount).toHaveBeenCalled();
    const table = within(screen.queryByRole('table'));
    const resultSet = within(table.queryAllByRole('rowgroup')[1]);
    const rows = resultSet.getAllByRole('row');
    expect(rows).toHaveLength(contentTemplates.length);
  });

  it('last column is a DropdownKebab Component', () => {
    render(generateWrapper(<ContentTemplateList {...props} />));
    const row = within(screen.queryAllByRole('row')[1]);
    const kebab = row.queryByRole('button');
    expect(kebab).toBeInTheDocument();
  });
});
