import React from 'react';
import { mount } from 'enzyme';

import {
  configEnzymeAdapter,
  mockRenderWithIntl,
  mockRenderWithRouter,
  createMockHistory,
} from 'testutils/helpers';

import ContentTemplateListPage from 'ui/content-template/ContentTemplateListPage';
import ContentTemplateListContainer from 'ui/content-template/ContentTemplateListContainer';

configEnzymeAdapter();

const initState = {
  loading: {},
  apps: {
    cms: {
      contentTemplate: {
        list: [],
        opened: {},
        filters: {
          filterProps: {},
          attribute: 'descr',
        },
      },
    },
  },
  tableColumnOrder: {
    contentTemplates: [],
  },
  modal: { visibleModal: '', info: {} },
  pagination: {
    global: {
      page: 1,
      pageSize: 10,
      lastPage: 1,
      totalItems: 0,
    },
  },
};

let component;

describe('content-template/ContentTemplateListPage', () => {
  beforeEach(() => {
    component = mount(
      mockRenderWithRouter(
        mockRenderWithIntl(<ContentTemplateListPage />, initState),
        createMockHistory(),
      ),
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has Grid', () => {
    expect(component.find('Grid').exists()).toBe(true);
  });

  it('contains ContentTemplateListContainer', () => {
    expect(component.find(ContentTemplateListContainer).exists()).toBe(true);
  });
});
