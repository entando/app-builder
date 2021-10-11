import { getJoinedCategories, getNewContentsType } from 'state/edit-content/selectors';

const TEST_STATE = {
  editContent: { contentType: 'NEWS', joinedCategories: ['a', 'b'] },
};

it('verify getContentTypeList selector', () => {
  const newContentType = getNewContentsType(TEST_STATE);
  expect(newContentType).toEqual('NEWS');
});

it('verify getJoinedCategories selector', () => {
  const joinedCategories = getJoinedCategories(TEST_STATE);
  expect(joinedCategories).toBeDefined();
  expect(joinedCategories).toHaveLength(2);
});
