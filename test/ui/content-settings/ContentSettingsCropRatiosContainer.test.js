import React from 'react';
import { render } from 'enzyme';

import { configEnzymeAdapter, mockRenderWithIntl } from 'testutils/helpers';
import ContentSettingsCropRatiosContainer from 'ui/content-settings/ContentSettingsCropRatiosContainer';
import ContentSettingsCropRatios from 'ui/content-settings/ContentSettingsCropRatios';

configEnzymeAdapter();

jest.mock('ui/content-settings/ContentSettingsCropRatios', () => jest.fn(() => <div>ContentSettingsCropRatios</div>));

const initialState = {
  apps: {
    cms: {
      contentSettings: {
        cropRatios: ['4:9', '16:9'],
      },
    },
  },
};

const actionList = ['onAdd', 'onDelete', 'onUpdate'];

describe('ContentSettingsCropRatiosContainer', () => {
  it('should render ContentSettingsCropRatios with correct props', () => {
    render(mockRenderWithIntl(<ContentSettingsCropRatiosContainer />, initialState));

    expect(ContentSettingsCropRatios).toHaveBeenCalledWith(
      expect.objectContaining({
        ...initialState.contentSettings,
        ...actionList.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: expect.any(Function),
          }),
          {},
        ),
      }),
      {},
      expect.any(Object),
    );
  });
});
