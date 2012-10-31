Given /^I am on the "(.*)" page of "(.*)"$/ do |page, collegename|
  path = page + collegename
  visit "/applicant/show/sample_college"
end
When /^I fill in score of a student with "(.*)"$/ do |score|
  fill_in '4', :with => score.to_i
end
When /^Reload the page$/ do
  visit "/applicant/show/sample_college"
end
Then /^I should get the updated score "(.*)"$/ do |score|
  #page.should have_content()
  field_labeled('1').value.should =~ /#{score}/
end