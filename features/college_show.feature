Feature: List of Colleges
  As an unauthorized user
  I want to view the list of colleges
  So that I can view its list of applicants and perform different tasks on them

Scenario: View candidates of a particular college
Given I am on the "home" page
When I click on "Add New College"
Then It should direct me to the new college form

Scenario: Logout from the app
Given I am on the "home" page
When I click on "Logout"
Then I should be redirected to the "log_in" page

Scenario: Add Another User
Given I am on the "home" page
When I click on "Add User"
Then I should be redirected to the "add user" page
And "Add" message should flash

Scenario: Delete User
Given I am on the "home" page
When I click on "Delete User"
Then I should be redirected to the "delete user" page
And "Delete User" message should flash

Scenario: Remove an existing college
Given I am on the "home" page
When I click on "remove"
Then I should be redirected to the "home" page
And "sample_college" should not be present

Scenario: List of Applicants in a college
Given I am on the "home" page
When I click on "sample_college"
Then I should be redirected to the applicants of "sample_college" page