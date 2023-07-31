import IssueModal from "/home/mihkelhobemagi/Desktop/jira-clone-e2e/cypress/pages/IssueModal.js"

describe('Add, edit, remove estimation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');
      const issueDetails = {
        title: "TEST_TITLE",
        type: "Bug",
        description: "TEST_DESCRIPTION",
        assignee: "Lord Gaben",
      };
      // creating a new issue
      const EXPECTED_AMOUNT_OF_ISSUES = '5';
      IssueModal.createIssue(issueDetails);
      IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
    });
  });

  it('Check that ESTIMATION can be added, edited and removed', () => {
    const title = 'TEST_TITLE'
    const number = 10
    const newNumber = 20

    // adding an estimation under created issued
    cy.get('[data-testid="list-issue"]')
      .contains(title)
      .click()
    cy.get('[class="sc-dxgOiQ HrhWu"]')
      .type(number)
    cy.wait(3000)
    cy.get('[data-testid="icon:close"]').first().click()
    cy.get('[data-testid="list-issue"]')
      .contains(title)
      .click()
    cy.get('[class="sc-rBLzX irwmBe"]')
      .contains('10h estimated')

    // editing the estimation under created issued
    cy.get('[class="sc-dxgOiQ HrhWu"]')
      .clear()
      .type(newNumber)
    cy.wait(3000)
    cy.get('[data-testid="icon:close"]').first().click()
    cy.get('[data-testid="list-issue"]')
      .contains(title)
      .click()
    cy.get('[class="sc-rBLzX irwmBe"]')
      .contains('20h estimated')

    // removing the estimation under created issued
    cy.get('[class="sc-dxgOiQ HrhWu"]').clear()
    cy.wait(3000)
    cy.get('[data-testid="icon:close"]').first().click()
    cy.get('[data-testid="list-issue"]')
      .contains(title)
      .click()
    cy.get('[class="sc-dxgOiQ HrhWu"]')
      .should('be.empty')
  });

  it('Check that TIME LOG can be added and removed', () => {
    const title = 'TEST_TITLE'
    const timeSpent = 2
    const timeRemaining = 5

    // adding time log under created issued
    cy.get('[data-testid="list-issue"]')
      .contains(title)
      .click()
    cy.get('[class="sc-bMvGRv IstSR"]')
      .click()
    cy.get('[data-testid="modal:tracking"]')
      .should('be.visible')
    cy.get('[class="sc-dxgOiQ HrhWu"]')
      .eq(1)
      .type(timeSpent)
    cy.get('[class="sc-dxgOiQ HrhWu"]')
      .eq(2)
      .type(timeRemaining)
    cy.get('[class="sc-bwzfXH dIxFno"]')
      .click()
    cy.wait(1000)
    cy.get('[class="sc-fhYwyz jxvanQ"]')
      .contains('2h logged')
    cy.get('[class="sc-fhYwyz jxvanQ"]')
      .contains('5h remaining')

    // removing time log under created issue
    cy.get('[class="sc-bMvGRv IstSR"]')
      .click()
    cy.get('[data-testid="modal:tracking"]')
      .should('be.visible')
    cy.get('[class="sc-dxgOiQ HrhWu"]')
      .eq(1)
      .clear()
    cy.get('[class="sc-dxgOiQ HrhWu"]')
      .eq(2)
      .clear()
    cy.get('[class="sc-bwzfXH dIxFno"]')
      .click()
    cy.wait(1000)
    cy.get('[class="sc-fhYwyz jxvanQ"]')
      .contains('No time logged')
  });
})