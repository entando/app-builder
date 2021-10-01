import { xor } from 'lodash';

export const ASSET_COLUMN_HEADERS = [
  {
    name: 'preview',
    width: '10%',
  },
  {
    name: 'name',
    width: '18%',
    id: 'description',
  },
  {
    name: 'type',
    width: '8%',
    id: 'type',
  },
  {
    name: 'uploadedBy',
    width: '17%',
    id: 'owner',
  },
  {
    name: 'uploadedAt',
    width: '18%',
    id: 'createdAt',
  },
  {
    name: 'group',
    width: '10%',
    id: 'group',
  },
  {
    name: 'categories',
    width: '12%',
    id: 'categories',
  },
];

export const ARRAY_SORT_COLUMN_REPLACES = ASSET_COLUMN_HEADERS.reduce((acc, curr) => {
  if (curr.id) {
    return {
      ...acc,
      [curr.name]: curr.id,
    };
  }

  return acc;
}, {});

export const DEFAULT_ASSET_COLUMNS = ASSET_COLUMN_HEADERS.map(({ name }) => name);

export const ASSET_FILETYPES = [
  {
    name: 'All',
    id: 'all',
  },
  {
    name: 'Images',
    id: 'image',
  },
  {
    name: 'Documents',
    id: 'file',
  },
];

export const UNSORTABLE_COLUMNS = ['preview', 'categories'];

export const SORTABLE_COLUMNS = xor(UNSORTABLE_COLUMNS, DEFAULT_ASSET_COLUMNS);
