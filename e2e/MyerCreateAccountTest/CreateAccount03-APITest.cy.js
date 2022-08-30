/// <reference types="cypress" />
//Test Suite 03 - API Tests
//TC01 - Test Create Account API for registration using existing x-api-key
//
//TC02 - Test Create Account API without API KEY
//
//TC03 - Create Account API test with invalid json body

describe('Test Suite 03 - API Tests', () => {
  before(() => {

  })

  beforeEach(() => {

    //Generate random email
    cy.random_Alpha_Numeric(10).then(text => {
       global.clientEmail = text + "@testmyer.com";
    });

    //Generate random mobile
    cy.random_Numeric(8).then(text => {
       global.mobile = "04" + text;
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
       // returning false here prevents Cypress from
       // failing the test
       return false
    })

  })


  //Test registration API
  it('TC01 - Test Create Account API for registration using existing x-api-key', () => {
    //The API result will always be EXISTING client
    //Coz the encypted x-api-key stays the same
    //Register request
    cy.request({
      method: 'POST',
      url: 'https://prod-api.aws.myer.com.au/v1/myerone/customers',
      body: {
        "firstName": "fghgjk",
        "lastName": "cghvjkl",
        "email": global.clientEmail,
        "dob": "2000-02-02",
        "mobile": global.mobile,
        "logonPassword": "123Qwe12",
        "address": {
            "city": "GORANBA",
            "stateCode": "NSW",
            "postcode": "2421",
            "countryCode": "AU",
            "street": "48 Dahlkes Rd"
        },
        "isRegistrationPage": true
      },
      headers: {
        'x-api-key': 'DFLMv0pRm5466wR3CS3TU5569wxjodwq2LCACqgX',
        'accept': 'application/json'
      }
    }).then((response) => {
      //Verify response code is 200
      expect(response).property('status').to.equal(200)

      //Verify response body
      expect(response.body).property('customer')
                           .property('myerOne')
                           .to.have.property('myerOneStatus')
                           .to.eq('EXISTING')

    })

  })

  //Test registration API
  it('TC02 - Test Create Account API without API KEY', () => {

    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: 'https://prod-api.aws.myer.com.au/v1/myerone/customers',
      body: {
        "firstName": "fghgjk",
        "lastName": "cghvjkl",
        "email": "dvhjagkshfbjakh@adsgy6782.com",
        "dob": "2000-02-02",
        "mobile": "0467382673",
        "logonPassword": "123Qwe12",
        "address": {
            "city": "GORANBA",
            "stateCode": "QLD",
            "postcode": "4421",
            "countryCode": "AU",
            "street": "48 Dahlkes Rd"
        },
        "isRegistrationPage": true
      },
      headers: {
        'x-api-key': '',
        'accept': 'application/json'
      }
    }).then((response) => {
      //Verify response code is 403
      expect(response).property('status').to.equal(403)

      //Verify response body
      expect(response.body).property('message')
                           .to.eq('Forbidden')

    })

  })


  //Test registration API
  it('TC03 - Create Account API test with invalid json body', () => {

    //Loop and read json data from APIbodies.json
    cy.fixture('APIbodies.json').then((data) => {

      //Test API response is 500 when sending invalid json body
      for (var index in data) {

        cy.request({
          method: 'POST',
          url: 'https://prod-api.aws.myer.com.au/v1/myerone/customers',
          failOnStatusCode: false,
          body: data[index],
          headers: {
            'x-api-key': 'DFLMv0pRm5466wR3CS3TU5569wxjodwq2LCACqgX',
            'accept': 'application/json'
          }

        }).then((response) => {
          //Expect response code to be 400 or 500 for API negative test
          expect(response).property('status').to.be.oneOf([400,500])

        })

      }

    })
  })





})
