#sign_up.feature
Feature: Sign up
  As an unauthorized user
  I want to sign_up with my details
  So that I can login

  Scenario: Password doesn't match confirmation
    Given I am on the sign_up page
    When I fill in email with "manisiva19@gmail.com"
    When I fill in password with "Secret"
    When I fill in password_confirmation with "Password"
#    And I press "Sign Up"
    Then the Sign up form should be shown again
#    And I should see "Password doesn't match confirmation"
#    And I should not be registered