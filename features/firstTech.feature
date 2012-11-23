Feature: List of pairing pursues
  As an unauthorized user
  I want to view the list of applicants of a particular college who have pursued the pairing test
  So that I can edit their details and perform different tasks on them

  Scenario: Fill in the First Tech Status
    Given I am on the "/applicant/firstTech/" page of "sample_college"
    When Check the pursue box of a student
    And I should be directed to the "First Technical" page
    Then I should get the updated radio button

  @selenium
  Scenario: Click Shortlist Button on Pairing Pursued Page
    Given I am on the "/applicant/firstTech/" page of "sample_college"
    When Check the pursue box of a student
    And Click "Next Round" button
    Then I should be directed to the "Second Technical" page
    And Should contain "2"

  Scenario: Fill in the Result
    Given I am on the "/applicant/secondTech/" page of "sample_college"
    When Check the pursue box of a student
    And I should be directed to the "Second Technical" page
    Then I should get the updated radio button

  @selenium
  Scenario: Click Shortlist Button on Fist Tech Pursued Page
    Given I am on the "/applicant/secondTech/" page of "sample_college"
    When Check the pursue box of a student
    And Click "Next Round" button
    Then I should be directed to the "Final Pursues" page
#    And Should contain "2"
