#sign_up.feature
Feature: Sign up
  As an unauthorized user
  I want to login with my details
  So that I can use the app

  Scenario: Password doesn't match confirmation
    Given I am on the login page
    When I fill in email with "test_user"
    When I fill in password with "abcd"
#    And Click "Login" Button

    Then I should be directed to the home page
