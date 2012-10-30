Feature: List of Applicants
  As an unauthorized user
  I want to click on a college name
  So that I can view its list of applicants

Scenario: View candidates of a particular college
Given I am on the homepage
When I click on "Add New College"
Then It should direct me to the new college form

Scenario: Logout from the app
Given I am on the homepage
And I click on "Logout"
Then It should direct me to the Login page
And "Successfully logged out!" message should flash