Feature: List of Pools
  As an unauthorized user
  I want to view the list of pools
  So that I can view its list of colleges and perform different tasks on them

  Scenario: View candidates of a particular college
    Given I am on the "home" page
    When I click on "List of Pools"
    When I click on "Add New Pool"
    Then It should direct me to the new pool form

  Scenario: Remove an existing pool
    Given I am on the "home" page
    When I click on "List of Pools"
    When I click on "Delete"
    Then I should be redirected to the "/pool/show" page
    And "sample_pool" should not be present

  Scenario: List of colleges in a pool
    Given I am on the "home" page
    When I click on "List of Pools"
    When I click on "List Of Colleges"
    Then I should be redirected to the "/college/show/sample_pool" page