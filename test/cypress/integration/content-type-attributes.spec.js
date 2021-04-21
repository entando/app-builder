describe('Content Type - Basic Attributes', () => {
  beforeEach(() => {
    cy.appBuilderLogin();
  });

  afterEach(() => {
    cy.appBuilderLogout();
  });

  const contentTypeCode = 'BNR';
  const basicAttributes = ['Attach', 'Boolean', 'CheckBox', 'Date', 'Email',
    'Hypertext', 'Image', 'Link', 'Monotext', 'Longtext', 'Number', 'Text', 'ThreeState', 'Timestamp'];

  it('All basic attributes should be added to a content type', () => {
    cy.openContentTypeFormWith(contentTypeCode);
    // Add all basic attributes
    basicAttributes.forEach((attr, i) => {
      cy.addNewContentTypeAttribute(contentTypeCode, attr);
      cy.fillAddListAttributeForm('', `c${i}${attr}`.substr(0, 10).toLocaleLowerCase(), contentTypeCode, attr);
      cy.wait(200);
    });
    // Verify they are succesfully added
    basicAttributes.forEach((attr, i) => cy.contains(`c${i}${attr}`.substr(0, 10).toLocaleLowerCase()).should('be.visible'));
  });

  it('All basic attributes should be edited for a content type', () => {
    cy.openContentTypeFormWith(contentTypeCode);
    // Edit all basic attributes
    basicAttributes.forEach((attr, i) => {
      cy.fillEditListAttributeForm(`name${attr}`, `c${i}${attr}`.substr(0, 10).toLocaleLowerCase(), contentTypeCode, attr);
      cy.wait(200);
    });
    // Verify they are succesfully added
    basicAttributes.forEach(attr => cy.contains(`name${attr}`).should('be.visible'));
  });

  it('All basic attributes should be deleted from a content type and be no more visible', () => {
    cy.openContentTypeFormWith(contentTypeCode);
    // Delete all basic attributes
    basicAttributes.forEach((attr, i) => {
      cy.deleteAttributeFromContentType(`c${i}${attr}`.substr(0, 10).toLocaleLowerCase(), contentTypeCode);
      cy.wait(200);
    });
    // Verify they are no more visible
    basicAttributes.forEach(attr => cy.contains(`name${attr}`).should('not.be.visible'));
  });
});
