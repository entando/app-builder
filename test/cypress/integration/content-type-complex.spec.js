import {
  TEST_ID_PAGE_CONTAINER,
  TEST_ID_CONTENTTYPE_FORM,
} from '../../../src/ui/test-const/contenttypes-complex-const';

describe('Content Types - Complex', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  const contentTypeCode = 'BNR';
  const TYPE_LIST = 'List';
  const TYPE_MONOLIST = 'Monolist';
  const TYPE_COMPOSITE = 'Composite';

  const attributeCompositeTest = [
    {
      type: 'Hypertext',
      codeValue: 'httext',
      nameEnValue: 'Le Hyper Text',
    }, {
      type: 'Link',
      codeValue: 'myLink',
      nameEnValue: 'My Link',
    }, {
      type: 'Timestamp',
      codeValue: 'currStamp',
      nameEnValue: 'Curr Stamp',
    },
  ];

  describe('Content Type Attribute - List', () => {
    describe('nested attribute types that are not allowed in List attribute', () => {
      it('attribute type selection should not contain Text, Longtext, Hypertext, Image, Attach, Link', () => {
        cy.openContentTypeFormWith(contentTypeCode);
        cy.addNewContentTypeAttribute(contentTypeCode, TYPE_LIST);
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'Text');
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'Longtext');
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'Hypertext');
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'Image');
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'Attach');
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'Link');
      });
    });

    describe('examples of nested attribute types that are allowed in List attribute', () => {
      beforeEach(() => {
        cy.openContentTypeFormWith(contentTypeCode);
        cy.addNewContentTypeAttribute(contentTypeCode, TYPE_LIST);
      });

      const attributeListTest = [
        {
          type: 'CheckBox',
          codeValue: 'checki',
          nameEnValue: 'Checki',
        }, {
          type: 'Email',
          codeValue: 'emaili',
          nameEnValue: 'Emaili',
        }, {
          type: 'Date',
          codeValue: 'dati',
          nameEnValue: 'Daeti',
        },
      ];

      attributeListTest.forEach(({ type, codeValue, nameEnValue }) => {
        it(`${type} attribute nested`, () => {
          cy.fillAddListAttributeForm(type, codeValue, contentTypeCode, TYPE_LIST);

          cy.fillEditListAttributeForm(nameEnValue, codeValue, contentTypeCode, TYPE_LIST);

          cy.deleteAttributeFromContentType(codeValue, contentTypeCode);
        });
      });
    });
  });

  describe('Content Type Attribute - Monolist', () => {
    describe('nested attribute types that are not allowed in Monolist attribute', () => {
      it('attribute type selection should not contain Monolist', () => {
        cy.openContentTypeFormWith(contentTypeCode);
        cy.addNewContentTypeAttribute(contentTypeCode, TYPE_MONOLIST);
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'Monolist');
        cy.getByName(TEST_ID_CONTENTTYPE_FORM.ATTRIBUTE_TYPE_DROPDOWN).should('not.contain', 'List');
      });
    });

    describe('examples of nested attribute types that are allowed in Monolist attribute', () => {
      beforeEach(() => {
        cy.openContentTypeFormWith(contentTypeCode);
        cy.addNewContentTypeAttribute(contentTypeCode, TYPE_MONOLIST);
      });

      const attributeMonolistTest = [
        {
          type: 'Text',
          codeValue: 'nicetext',
          nameEnValue: 'Nice Text',
        }, {
          type: 'Image',
          codeValue: 'myImage',
          nameEnValue: 'My Image',
        }, {
          type: 'Attach',
          codeValue: 'myAttach',
          nameEnValue: 'My Attach',
        },
      ];

      attributeMonolistTest.forEach(({ type, codeValue, nameEnValue }) => {
        it(`${type} attribute nested`, () => {
          cy.fillAddListAttributeForm(type, codeValue, contentTypeCode, TYPE_MONOLIST);

          cy.fillEditListAttributeForm(nameEnValue, codeValue, contentTypeCode, TYPE_MONOLIST);

          cy.deleteAttributeFromContentType(codeValue, contentTypeCode);
        });
      });
    });
  });

  describe('Content Type Attribute - Composite', () => {
    const compositeCode = 'compCode';
    const compName = 'compo name';

    beforeEach(() => {
      cy.openContentTypeFormWith(contentTypeCode);
    });

    it('test on adding composite', () => {
      cy.addNewContentTypeAttribute(contentTypeCode, TYPE_COMPOSITE);

      cy.fillAddListAttributeForm(TYPE_COMPOSITE, compositeCode, contentTypeCode, TYPE_COMPOSITE);
      attributeCompositeTest.forEach((subAttribute) => {
        cy.addNewCompositeAttribute(subAttribute.type, subAttribute.codeValue, contentTypeCode);
      });
      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Continue').click();
      cy.wait(1000);
      cy.log('check if new list attribute exists');
      cy.get('table').should('contain', compositeCode);
    });

    it('test on editing composite', () => {
      cy.fillEditListAttributeForm(compName, compositeCode, contentTypeCode, TYPE_COMPOSITE);
      cy.addNewCompositeAttribute('Image', 'muImage', contentTypeCode, true);

      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Save').click();
    });

    it('test on editing composite #2 - removing attributes inside composite', () => {
      const toDelete = attributeCompositeTest.slice(0, 2);

      cy.fillEditListAttributeForm(compName, compositeCode, contentTypeCode, TYPE_COMPOSITE);
      toDelete.forEach((attr) => {
        cy.deleteAttributeFromContentType(attr.codeValue, contentTypeCode, true);
      });

      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Save').click();
      cy.wait(1000);
    });

    it('test on deleting composite', () => {
      cy.deleteAttributeFromContentType(compositeCode, contentTypeCode);
    });
  });

  describe('Content Type Attribute - Monolist Composite', () => {
    const mainAttrCode = 'mocoCode';
    const mainAttrName = 'Mono compo name';

    beforeEach(() => {
      cy.openContentTypeFormWith(contentTypeCode);
    });

    it('test on adding monolist composite', () => {
      cy.addNewContentTypeAttribute(contentTypeCode, TYPE_MONOLIST);
      cy.fillAddListAttributeForm(TYPE_COMPOSITE, mainAttrCode, contentTypeCode, TYPE_MONOLIST);
      cy.wait(1000);
      attributeCompositeTest.forEach((subAttribute) => {
        cy.addNewCompositeAttribute(
          subAttribute.type,
          subAttribute.codeValue,
          contentTypeCode,
          false,
          true,
        );
      });
      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Continue').click();
      cy.wait(1000);
      cy.log('check if new list attribute exists');
      cy.get('table').should('contain', mainAttrCode);
    });

    it('test on editing monolist composite', () => {
      cy.fillEditListAttributeForm(
        mainAttrName,
        mainAttrCode,
        contentTypeCode,
        TYPE_MONOLIST,
        true,
      );
      cy.addNewCompositeAttribute('Image', 'muImage', contentTypeCode, true, true);

      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Save').click();
      cy.wait(1000);
    });

    it('test on editing monolist composite #2 - removing attributes inside', () => {
      const toDelete = attributeCompositeTest.slice(1, 2);

      cy.fillEditListAttributeForm(
        mainAttrName,
        mainAttrCode,
        contentTypeCode,
        TYPE_MONOLIST,
        true,
      );

      toDelete.forEach((attr) => {
        cy.deleteAttributeFromContentType(attr.codeValue, contentTypeCode, true);
      });

      cy.getByTestId(TEST_ID_PAGE_CONTAINER).contains('Save').click();
      cy.wait(1000);
    });

    it('test on deleting monolist composite', () => {
      cy.deleteAttributeFromContentType(mainAttrCode, contentTypeCode);
    });
  });
});
