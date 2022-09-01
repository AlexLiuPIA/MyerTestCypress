# MyerTestCypress

Test Suite 01 - Function Tests

Include creating account via both JOIN button and Create Account button, with auto-selected address and manual-input address.

TC01 - Enter email and register via JOIN button

TC02 - Enter email and register via Create Account button

TC03 - Register and enter address manually


Test Suite 02 - Negative Tests

Include using empty email and existing email address to create account, reading invalid data from Json files and testing invalid value for input fields. SQL injection and JS injection is also included in the invalid data.

TC01 - Empty Email

TC02 - Invalid input for email

TC03 - Invalid input for password

TC04 - Invalid input for firstName

TC05 - Invalid input for lastName

TC06 - Invalid input for mobile

TC07 - Invalid input for dob

TC08 - Register with existing email address


Test Suite 03 - API Tests

Include API test so that can skip the FE restriction to test how BE handling invalid data in Json body.

TC01 - Test Create Account API for registration using existing x-api-key

TC02 - Test Create Account API without API KEY

TC03 - Create Account API test with invalid json body

