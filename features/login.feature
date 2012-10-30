#sign_up.feature
Feature: Login
  As an unauthorized user
  I want to login with my details
  So that I can use the app

  Scenario: Should be able to login
    Given I am on the login page
    When I fill in email with "test_user"
    When I fill in password with "abcd"
    Then I should be directed to the home page
