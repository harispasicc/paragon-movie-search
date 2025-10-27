describe('Movie Search E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the main title', () => {
    cy.contains('Paragon Movie Search').should('be.visible');
  });

  it('should render search bar', () => {
    cy.get('input[placeholder*="Type to search"]').should('be.visible');
    cy.get('button').contains('Submit').should('be.visible');
  });

  it('should render Favourites section', () => {
    cy.contains('Favourites').should('be.visible');
  });

  it('should allow user to type in search input', () => {
    cy.get('input[placeholder*="Type to search"]')
      .type('iron man')
      .should('have.value', 'iron man');
  });

  it('should search for movies when typing', () => {
    cy.get('input[placeholder*="Type to search"]')
      .type('iron man');
    
    cy.wait(2000);
    
    cy.get('.element').should('exist');
  });

  it('should reset search when clicking title', () => {
    cy.get('input[placeholder*="Type to search"]')
      .type('test search');
    
    cy.contains('Paragon Movie Search').click();
    
    cy.get('input[placeholder*="Type to search"]')
      .should('have.value', '');
  });

  it('should add movie to favourites when clicking heart', () => {
    cy.get('input[placeholder*="Type to search"]')
      .type('iron man');
    
    cy.wait(2000);
    
    cy.get('[class*="hearth"]').first().click();
    
    cy.contains('Favourites').should('be.visible');
  });

  it('should display movie details when clicking Details button', () => {
    cy.get('input[placeholder*="Type to search"]')
      .type('iron man');
    
    cy.wait(2000);
    
    cy.get('button').contains('Details').first().click();
    
    cy.get('.modal-dialog').should('be.visible');
  });

  it('should close modal when clicking close button', () => {
    cy.get('input[placeholder*="Type to search"]')
      .type('iron man');
    
    cy.wait(2000);
    
    cy.get('button').contains('Details').first().click();
    cy.get('.modal-dialog').should('be.visible');
    
    cy.get('button[aria-label="Close"]').click();
    cy.get('.modal-dialog').should('not.exist');
  });

  it('should remove movie from favourites', () => {
    cy.get('input[placeholder*="Type to search"]')
      .type('iron man');
    
    cy.wait(2000);
    
    cy.get('[class*="hearth"]').first().click();
    cy.contains('Favourites').should('be.visible');
    
    cy.get('[class*="hearth-active"]').first().click();
  });
});

