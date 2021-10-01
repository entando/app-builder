export const LIST_VERSIONING_OK = [
  {
    id: 1,
    description: 'Content 1',
    contentId: 'NWS1',
    username: 'ichalagashvili',
    versionDate: '2020-04-06',
    approved: true,
    version: '1.6',
    contentType: 'News',
    status: 'PUBLIC',
  },
  {
    id: 2,
    description: 'Content 2',
    contentId: 'PRS2',
    username: 'admin',
    versionDate: '2020-08-05',
    approved: true,
    version: '2.2',
    contentType: 'Press',
    status: 'ready',
  },
  {
    id: 3,
    description: 'Content 3',
    contentId: 'NWS3',
    username: 'admin',
    versionDate: '2020-04-05',
    approved: true,
    version: '1.0',
    contentType: 'News',
    status: 'unpublished',
  },
];

export const LIST_SINGLE_VERSIONING_OK = [
  {
    id: 1,
    description: 'Content numero single 1',
    contentId: 'CNTNT1',
    username: 'admin',
    versionDate: '2020-04-06',
    approved: true,
    version: '1.6',
    contentType: 'type 1',
    status: 'PUBLIC',
  },
  {
    id: 2,
    description: 'This Content numero single 0',
    contentId: 'CNTNT3',
    username: 'admin',
    versionDate: '2020-04-05',
    approved: true,
    version: '1.2',
    contentType: 'type 1',
    status: 'ready',
  },
];

export const LIST_ATTACHMENTS_OK = [
  {
    id: 'ATTCH_0001',
    description: 'ATTCH 0001 desc',
    lastVersion: '0.1',
    lastModify: '2020-06-09T18:13:28.704Z',
    fileName: 'attch-1.pdf',
    size: '1 KB',
  },
  {
    id: 'ATTCH_0002',
    description: 'Attachment 0002 description',
    lastVersion: '0.2',
    lastModify: '2020-06-10T18:13:28.704Z',
    fileName: 'attachment-file-2.pdf',
    size: '10 KB',
  },
  {
    id: 'ATTCH_0003',
    description: 'This is a description of attachment number 0003. This is a long description',
    lastVersion: '0.33',
    lastModify: '2000-01-01T00:00:00.001Z',
    fileName: 'interesting-attachment-file-3-name-final-final-really-final.pdf',
    size: '10 GB',
  },
  {
    id: 'ATTCH_0004',
    description: 'This is a very long description of attachment number 0004 (zero zero zero four). As you can see, this is a very long text. Maybe you will be able to notice some breaking views. Hope this helps.',
    lastVersion: '1.2',
    lastModify: '1988-07-25T16:00:00.000Z',
    fileName: 'interesting-attachment-file-4-this-is-a-very-long_file_name_for_YOU_TO_TEST-LONG_NAMES-name-final-final-really-final.jpg',
    size: '100 GB',
  },
  {
    id: 'ATTCH_0005',
    description: 'Large file size',
    lastVersion: '1.12',
    lastModify: '1988-07-25T16:00:00.000Z',
    fileName: 'large.jpg',
    size: '1 TB',
  },
];

export const LIST_IMAGES_OK = [
  {
    id: 'img1',
    description: 'IMG1 desc',
    lastVersion: '0.1',
    lastModify: '2020-06-09T18:13:28.704Z',
    fileName: 'img-1.pdf',
    versions: [
      {
        dimensions: null,
        path: 'https://picsum.photos/200/300',
        size: '130 Kb',
      },
      {
        dimensions: '90x90 px',
        path: 'https://picsum.photos/90/90',
        size: '1 Kb',
      },
      {
        dimensions: '130x130 px',
        path: 'https://picsum.photos/130/130',
        size: '3 Kb',
      },
      {
        dimensions: '150x150 px',
        path: 'https://picsum.photos/150/150',
        size: '3 Kb',
      },
    ],
  },
  {
    id: 'img2',
    description: 'This is a very long description of attachment number 0004 (zero zero zero four). As you can see, this is a very long text. Maybe you will be able to notice some breaking views. Hope this helps.',
    lastVersion: '1.2',
    lastModify: '1988-07-25T16:00:00.000Z',
    fileName: 'interesting-image-file-2-this-is-a-very-long_file_name_for_YOU_TO_TEST-LONG_NAMES-name-final-final-really-final.jpg',
    versions: [
      {
        dimensions: null,
        path: 'https://picsum.photos/200/300',
        size: '130 Kb',
      },
      {
        dimensions: '90x90 px',
        path: 'https://picsum.photos/90/90',
        size: '1 Kb',
      },
      {
        dimensions: '130x130 px',
        path: 'https://picsum.photos/130/130',
        size: '3 Kb',
      },
      {
        dimensions: '150x150 px',
        path: 'https://picsum.photos/150/150',
        size: '3 Kb',
      },
    ],
  },
];

export const CONTENT_DETAILS_OK = {
  id: 'TST6',
  typeCode: 'TST',
  typeDescription: 'This is a test',
  description: 'This is my first test',
  mainGroup: 'free',
  attributes: [
    {
      code: 'Text',
      value: null,
      values: {
        en: 'Hello World!',
      },
      elements: [],
      compositeelements: [],
      listelements: {},
    },
  ],
  status: 'DRAFT',
  onLine: false,
  viewPage: null,
  listModel: null,
  defaultModel: null,
  created: '2020-06-08 15:30:46',
  lastModified: '2020-06-10 12:01:44',
  version: '1.5',
  firstEditor: 'admin',
  lastEditor: 'admin',
  restriction: null,
  html: null,
};

export const DELETE_ATTACHMENT_OK = { success: true };
export const RESTORE_ATTACHMENT_OK = { success: true };

export const DELETE_IMAGE_OK = { success: true };
export const RESTORE_IMAGE_OK = { success: true };

export const DELETE_CONTENT_OK = { success: true };
export const RESTORE_CONTENT_OK = { success: true };

export const VERSIONING_CONFIG_GET_OK = {
  deleteMidVersions: true,
  contentsToIgnore: ['AAB1', 'CC2'],
  contentTypesToIgnore: ['ABC'],
};

export const VERSIONING_CONFIG_PUT_OK = { success: true };
