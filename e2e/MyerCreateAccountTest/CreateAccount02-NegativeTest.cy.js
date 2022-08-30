/// <reference types="cypress" />
//Test Suite 02 - Negative Tests
//TC01 - Empty Email
//TC02 - Invalid input for email
//TC03 - Invalid input for password
//TC04 - Invalid input for firstName
//TC05 - Invalid input for lastName
//TC06 - Invalid input for mobile
//TC07 - Invalid input for dob
//TC08 - Register with existing email address

describe('Test Suite 02 - Negative Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.myer.com.au/join')
    cy.get('h1',{ timeout: 3000 }).first()
      .should('have.text', 'Create Account')

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })

    cy.fixture('profile.json').then((data) => {
      global.clientPassword = data.clientPassword
      global.firstName = data.firstName
      global.lastName = data.lastName
      global.dob = data.dob
      global.address = data.address
      global.succeedMsg = data.succeedMsg1
      global.dupEmailMsg = data.dupEmailMsg
    })

    cy.random_Numeric(8).then(text => {
       global.mobile = "04" + text;
    });

  })


  it('TC01 - Empty Email', () => {
    //Leave email input Empty

    //Click JOIN button
    cy.contains("JOIN").click()

    //Check error msg
    cy.get('#email-error-text')
      .should('have.text', 'Please enter a valid email address')

  })

  it('TC02 - Invalid input for email', () => {

    cy.fixture('emailTest.json').then((data) => {
      //Loop and read json data
      for (var index in data) {
          //Input email
          cy.get('#email')
            .clear()
            .type(data[index].email, { delay: 0 })

          //Click JOIN button
          cy.contains("JOIN").click()

          //Check error msg
          cy.get('#email-error-text')
            .should('have.text', 'Please enter a valid email address')
      }

    })

  })

  it('TC03 - Invalid data test for password', () => {

    //Step1 - input email and click JOIN button
    //Input random_Alpha_Numeric email
    cy.random_Alpha_Numeric(10).then(text => {
      //Input email
      cy.get('#email')
        .click()
        .type(text + "@testmyer.com", { delay: 0 })

    });

    //Click JOIN button
    cy.contains("JOIN").click()

    //'Back' linktext should be visible
    cy.contains('Back')
      .should('be.visible')

    //Step2 - data driven test for password
    //Loop and read json data
    cy.fixture('passwordTest.json').then((data) => {
      //Loop and read json data
      for (var index in data) {
          //Input email
          cy.get('#password')
            .clear()
            .type(data[index].password, { delay: 0 })

          //Click to check error msg
          cy.get('#first-name')
            .click()

          cy.contains(data[index].errmsg).should('be.visible')

      }

    })

  })


  it('TC04 - Invalid data test for firstName', () => {

    //Step1 - input email and click JOIN button
    //Input random_Alpha_Numeric email
    cy.random_Alpha_Numeric(10).then(text => {
      //Input email
      cy.get('#email')
        .click()
        .type(text + "@testmyer.com", { delay: 0 })

    });

    //Click JOIN button
    cy.contains("JOIN").click()

    //'Back' linktext should be visible
    cy.contains('Back')
      .should('be.visible')

    //Input password
    cy.get('#password')
      .scrollIntoView()
      .type(global.clientPassword)
      .should('have.value', global.clientPassword)


    //Step2 - data driven test for firstName
    //Loop and read json data
    cy.fixture('firstNameTest.json').then((data) => {
      //Loop and read json data
      for (var index in data) {
          //Input first-name
          cy.get('#first-name')
            .clear()
            .type(data[index].firstName, { delay: 0 })

          //Click to check error msg
          cy.get('#last-name')
            .click()

          cy.contains(data[index].errmsg).should('be.visible')

      }

    })

  })


  it('TC05 - Invalid data test for lastName', () => {

    //Step1 - input email and click JOIN button
    //Input random_Alpha_Numeric email
    cy.random_Alpha_Numeric(10).then(text => {
      //Input email
      cy.get('#email')
        .click()
        .type(text + "@testmyer.com", { delay: 0 })

    });

    //Click JOIN button
    cy.contains("JOIN").click()

    //'Back' linktext should be visible
    cy.contains('Back')
      .should('be.visible')

    //Input password
    cy.get('#password')
      .scrollIntoView()
      .type(global.clientPassword)
      .should('have.value', global.clientPassword)

    //Input firstName
    cy.get('#first-name')
      .clear()
      .type(global.firstName, { delay: 0 })
      .should('have.value', global.firstName)

    //Step2 - data driven test for lastName
    //Loop and read json data
    cy.fixture('lastNameTest.json').then((data) => {
      //Loop and read json data
      for (var index in data) {
          //Input first-name
          cy.get('#last-name')
            .clear()
            .type(data[index].firstName, { delay: 0 })

          //Click to check error msg
          cy.get('#mobile-phone')
            .click()

          cy.contains(data[index].errmsg).should('be.visible')

      }

    })

  })

  it('TC06 - Invalid data test for mobile', () => {

    //Step1 - input email and click JOIN button
    //Input random_Alpha_Numeric email
    cy.random_Alpha_Numeric(10).then(text => {
      //Input email
      cy.get('#email')
        .click()
        .type(text + "@testmyer.com", { delay: 0 })

    });

    //Click JOIN button
    cy.contains("JOIN").click()

    //'Back' linktext should be visible
    cy.contains('Back')
      .should('be.visible')

    //Input password
    cy.get('#password')
      .scrollIntoView()
      .type(global.clientPassword)
      .should('have.value', global.clientPassword)

    //Input firstName
    cy.get('#first-name')
      .clear()
      .type(global.firstName, { delay: 0 })
      .should('have.value', global.firstName)

    //Input lastName
    cy.get('#last-name')
      .clear()
      .type(global.lastName, { delay: 0 })
      .should('have.value', global.lastName)

    //Step2 - data driven test for mobile
    //Loop and read json data
    cy.fixture('mobileTest.json').then((data) => {
      //Loop and read json data
      for (var index in data) {
          //Input first-name
          cy.get('#mobile-phone')
            .clear()
            .type(data[index].mobile, { delay: 0 })

          //Click to check error msg
          cy.get('#date-of-birth')
            .click()

          cy.contains(data[index].errmsg).should('be.visible')

      }

    })

  })

  it('TC07 - Invalid data test for dob', () => {

    //Step1 - input email and click JOIN button
    //Input random_Alpha_Numeric email
    cy.random_Alpha_Numeric(10).then(text => {
      //Input email
      cy.get('#email')
        .click()
        .type(text + "@testmyer.com", { delay: 0 })

    });

    //Click JOIN button
    cy.contains("JOIN").click()

    //'Back' linktext should be visible
    cy.contains('Back')
      .should('be.visible')

    //Input password
    cy.get('#password')
      .scrollIntoView()
      .type(global.clientPassword)
      .should('have.value', global.clientPassword)

    //Input firstName
    cy.get('#first-name')
      .clear()
      .type(global.firstName, { delay: 0 })
      .should('have.value', global.firstName)

    //Input lastName
    cy.get('#last-name')
      .clear()
      .type(global.lastName, { delay: 0 })
      .should('have.value', global.lastName)

    //Input mobile
    cy.get('#mobile-phone')
      .clear()
      .type(global.mobile, { delay: 0 })
      .should('have.value', global.mobile)


    //Step2 - data driven test for date-of-birth
    //Loop and read json data
    cy.fixture('dobTest.json').then((data) => {
      //Loop and read json data
      for (var index in data) {
          //Input first-name
          cy.get('#date-of-birth')
            .clear()
            .type(data[index].dob, { delay: 0 })

          //Click to check error msg
          cy.get('#address')
            .click()

          cy.contains(data[index].errmsg).should('be.visible')

      }

    })

  })


    it('TC08 - Register with existing email address', () => {

      //Step1 - input email and click JOIN button
      //Input 123@123.com as email(registered before)
      cy.get('#email')
        .click()
        .type("123@123.com", { delay: 0 })

      //Click JOIN button
      cy.contains("JOIN").click()

      //'Back' linktext should be visible
      cy.contains('Back')
        .should('be.visible')

      //Input password
      cy.get('#password')
        .scrollIntoView()
        .type(global.clientPassword)
        .should('have.value', global.clientPassword)

      //Input firstName
      cy.get('#first-name')
        .clear()
        .type(global.firstName, { delay: 0 })
        .should('have.value', global.firstName)

      //Input lastName
      cy.get('#last-name')
        .clear()
        .type(global.lastName, { delay: 0 })
        .should('have.value', global.lastName)

      //Input mobile
      cy.get('#mobile-phone')
        .clear()
        .type(global.mobile, { delay: 0 })
        .should('have.value', global.mobile)

      //Input date-of-birth
      cy.get('#date-of-birth')
        .clear()
        .type(global.dob, { delay: 0 })
        .should('have.value', global.dob)

      //Input address
      cy.get('#address')
        .type(global.address, { delay: 0 })

      //Select first from dropdown list
      cy.get('.MuiListItem-button')
        .first()
        .click()

      //Submit
      cy.get('#create-account', { timeout: 2000 })
        .click()

      //Should show up warning message for existing email
      cy.get('[data-automation="notification-strip-title"]', { timeout: 15000 })
        .should('contains.text', global.dupEmailMsg)

    })



})
