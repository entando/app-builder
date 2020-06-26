
import store, { generatePersistedPathsForApps } from 'state/store';

describe('state/store', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = store.getState();
  });

  describe('default state', () => {
    it('contains at least one property', () => {
      expect(defaultState).toBeDefined();
    });
  });

  describe('Test persisted paths generator funcion', () => {
    let apps = [
      {
        id: 'cms',
        persistData: {
          path1: ['route1', 'route2'],
          path2: ['route3'],
        },
      },
      {
        id: 'pda',
        persistData: {
          attribute: ['att1', 'att2'],
          pages: ['page1', 'page2'],
        },
      },
    ];

    const defaultLocalStates = {
      content: ['prop1', 'prop2'],
    };

    it('Test generated paths are correct', () => {
      const generatedStates = generatePersistedPathsForApps(apps, defaultLocalStates);
      expect(generatedStates).toEqual({
        content: ['prop1', 'prop2'],
        apps: {
          cms: {
            path1: ['route1', 'route2'],
            path2: ['route3'],
          },
          pda: {
            attribute: ['att1', 'att2'],
            pages: ['page1', 'page2'],
          },
        },
      });
    });

    it('Test generated paths are correct despite persistData not being available', () => {
      apps = [
        {
          id: 'cms',
        },
      ];
      const generatedStates = generatePersistedPathsForApps(apps, defaultLocalStates);
      expect(generatedStates).toEqual({
        content: ['prop1', 'prop2'],
        apps: {
          cms: {},
        },
      });
    });
  });
});
