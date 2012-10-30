Feature: List of Applicants
  As an unauthorized user
  I want to click on a college name
  So that I can view its list of applicants

Scenario: View candidates of a particular college
Given I am on the "home" page
When I click on "Add New College"
Then It should direct me to the new college form

Scenario: Logout from the app
Given I am on the "home" page
And I click on "Logout"
Then I should be redirected to the "log_in" page
And "Successfully logged out!" message should flash

Scenario: Add Another User
Given I am on the "home" page
And I click on "Add User"
Then I should be redirected to the "add user" page
And "Add User" message should flash