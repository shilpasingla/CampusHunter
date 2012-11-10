Feature: List of Applicants
  As an unauthorized user
  I want to view the list of applicants of a particular college
  So that I can edit their details and perform different tasks on them

  @selenium
  Scenario: Fill in the Score
    Given I am on the "/applicant/show/" page of "sample_college"
    When I fill in score of a student with "8"
    And Reload the page
    Then I should get the updated score "8"

  Scenario: Shortlist the Candidates from logic test
    Given I am on the "/applicant/show/" page of "sample_college"
    When I fill in score of a student with "8"
    And Click "Save & Proceed" button
    Then I should be redirected to the "/applicant/codePairing/sample_college" page
    And Should contain "2"

#Wrong test. Not working properly

  Scenario: Cutoff field
    Given I am on the "/applicant/show/" page of "sample_college"
    When I fill in "cutoff" with "8"
    Then I should not see a field "3"