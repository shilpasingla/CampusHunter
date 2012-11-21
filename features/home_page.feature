Feature: Home Page
  As an unauthorized user
  I want to view the list of colleges and list of pools
  So that I can perform the required operations on colleges and pools



  Scenario: view the list of colleges
    Given I am on the "home" page
    When I click on "List of Colleges"
    Then I should be redirected to the "/college/show" page


  Scenario: view the list of pools
    Given I am on the "home" page
    When I click on "List of Pools"
    Then I should be redirected to the "/pool/show" page