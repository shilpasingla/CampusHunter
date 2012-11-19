#sign_up.feature
Feature: Login
  As an unauthorized user
  I want to login with my details
  So that I can use the app

  Scenario: Should be able to login
    Given I am on the "log_in" page
    When I fill in "email" with "test_user"
    And I fill in "password" with "abcd"
    And Click "Login" button
    Then I should be directed to the "List of Colleges" page

  Scenario: Should not be able to login
    Given I am on the "log_in" page
    When I fill in "email" with "test_user"
    And I fill in "password" with "wrongpass"
    And Click "Login" button
    Then I should be redirected to the "log_in" page
    And "Invalid email or password" message should flash