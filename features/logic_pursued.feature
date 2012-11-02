Feature: List of logic pursues
  As an unauthorized user
  I want to view the list of applicants of a particular college who have pursued the logic test
  So that I can edit their details and perform different tasks on them

#@selenium
Scenario: Fill in the Pairing Status
Given I am on the "/applicant/logic_pursued/" page of "sample_college"
When Check the pursue box of a student
And I should be redirected to the "/applicant/logic_pursued/sample_college" page
Then I should get the updated radio button

@selenium
Scenario: Click Shortlist Button on Logic Pursued Page
Given I am on the "/applicant/logic_pursued/" page of "sample_college"
When Check the pursue box of a student
And Click "Shortlist" button
Then I should be redirected to the "/applicant/pairing_pursued/sample_college" page
And Should contain "2"