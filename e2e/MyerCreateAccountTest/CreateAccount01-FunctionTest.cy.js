/// <reference types="cypress" />
//Test Suite 01 - Function Tests
//TC01 - Enter email and register via JOIN button
//
//TC02 - Enter email and register via Create Account button
//
//TC03 - Register and enter address manually

describe('Test Suite 01 - Function Tests', () => {
  before(() => {

  })

  beforeEach(() => {

    //CLient information for registration
    cy.random_Alpha_Numeric(10).then(text => {
       global.clientEmail = text + "@testmyer.com";
    });
    cy.random_Numeric(8).then(text => {
       global.mobile = "04" + text;
    });

    cy.fixture('profile.json').then((data) => {
      global.clientPassword = data.clientPassword
      global.firstName = data.firstName
      global.lastName = data.lastName
      global.dob = data.dob
      global.address = data.address
      global.succeedMsg = data.succeedMsg1
      global.addressLine1 = data.addressLine1
      global.addressLine2 = data.addressLine2
      global.city = data.city
      global.postcode = data.postcode
      global.statecode = data.statecode
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
       // returning false here prevents Cypress from
       // failing the test
       return false
    })

    //Navigate to https://www.myer.com.au/join
    cy.visit('https://www.myer.com.au/join')

    cy.get('h1',{ timeout: 3000 }).first()
      .should('have.text', 'Create Account')

  })


  //Test registration via JOIN button
  it('TC01 - Enter email and register via JOIN button', () => {

    //Input email
    cy.get('#email')
      .click()
      .type(global.clientEmail, { delay: 0 })

    //Click JOIN button
    cy.contains("JOIN").click()

    //'Back' linktext should be visible
    cy.contains('Back')
      .should('be.visible')

    fill_in_registration_form();

    address_auto();

    //Submit
    cy.get('#create-account', { timeout: 2000 })
      .click()

    verify_registration_result(global.succeedMsg)

  })

  //Test registration via Create Account
  it('TC02 - Enter email and register via Create Account button', () => {
    //Input email
    cy.get('#email')
      .click()
      .type(global.clientEmail, { delay: 0 })

    //Click JOIN button
    cy.contains('button', 'Create Account').click()

    //'Back' linktext should be visible
    cy.contains('Back')
      .should('be.visible')

    fill_in_registration_form();

    address_auto();

    //Submit
    cy.get('#create-account', { timeout: 2000 })
      .click()

    //Update succeed message for second registration
    cy.fixture('profile.json').then((data) => {
      global.succeedMsg = data.succeedMsg2
    }).then((data) => {
      verify_registration_result(global.succeedMsg)
    })
  })


//Test reegistration with manual input address
it('TC03 - Register and enter address manually', () => {
  //Input email
  cy.get('#email')
    .click()
    .type(global.clientEmail, { delay: 0 })

  //Click JOIN button
  cy.contains('button', 'Create Account').click()

  //'Back' linktext should be visible
  cy.contains('Back')
    .should('be.visible')

  fill_in_registration_form();

  address_manual();

  //Submit
  cy.get('#create-account', { timeout: 2000 })
    .click()

  //Update succeed message for second registration
  cy.fixture('profile.json').then((data) => {
    global.succeedMsg = data.succeedMsg2
  }).then((data) => {
    verify_registration_result(global.succeedMsg)
  })
})


  //Fill in the second page and submit for user creation
  function fill_in_registration_form() {
      //Check email staying the same
      cy.get('#email')
        .should('have.value', global.clientEmail)

      //Input password
      cy.get('#password')
        .scrollIntoView()
        .type(global.clientPassword)
        .should('have.value', global.clientPassword)

      //Input first name
      cy.get('#first-name')
        .type(global.firstName, { delay: 0 })
        .should('have.value', global.firstName)

      //Input last name
      cy.get('#last-name')
        .type(global.lastName, { delay: 0 })
        .should('have.value', global.lastName)

      //Input mobile number
      cy.get('#mobile-phone')
        .type(global.mobile, { delay: 0 })
        .should('have.value', global.mobile)

      //Input date of birth if visible, otherwise skip to address
      cy.get("body").then($body => {
        if ($body.find("#date-of-birth").length > 0) {
           cy.get("#date-of-birth")
             .type(global.dob, { delay: 0 })
             .should('have.value', global.dob)

        } else {
           assert.isOk('everything','everything is OK');

        }

      })


    }



  //Entering address and auto selection
  function address_auto() {
    //Input address
    cy.get('#address')
      .type(global.address, { delay: 0 })

    //Select first from dropdown list
    cy.get('.MuiListItem-button')
      .first()
      .click()
  }


  //Entering address manually
  function address_manual() {
    //Input address
    cy.get('#address')
      .type(global.address, { delay: 0 })

    //Click Enter Address Manually
    cy.contains('button', 'Enter Address Manually')
      .click()

    //Input addressLine1
    cy.get('#addressLine1')
      .type(global.addressLine1)
      .should('have.value', global.addressLine1)

    //Input addressLine2
    cy.get('#addressLine2')
      .type(global.addressLine2)
      .should('have.value', global.addressLine2)

    //Input city
    cy.get('#city')
      .type(global.city)
      .should('have.value', global.city)

    //Input postcode
    cy.get('#postcode')
      .type(global.postcode)
      .should('have.value', global.postcode)

    //Click on stateCode
    cy.get('#stateCode')
      .click()

    cy.get('.MuiMenu-list')
      .first()
      .click()

  }

  //Verification after submission of registration form
  function verify_registration_result(succeedMsg) {
    //Verify the succeed msg
    cy.get('#messageText', { timeout: 15000 })
      .should('have.text', succeedMsg)

    //Verify the URL has /account
    cy.location('pathname')
      .should('include', 'account')
  }


})
