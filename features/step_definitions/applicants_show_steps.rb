Given /^I am on the "(.*)" page of "(.*)"$/ do |page, collegename|
  path = page + collegename
  visit "/sessions/new"
  fill_in 'email', :with => "test_user"
  fill_in 'password', :with => "abcd"
  click_button 'Login'
  visit path

end
When /^I fill in score of a student with "(.*)"$/ do |score|

  fill_in '4', :with => score
  fill_in '5', :with => score

end
When /^Reload the page$/ do
  visit "/applicant/show/sample_college"

end
Then /^I should get the updated score "(.*)"$/ do |score|
  field_labeled('4').value.should =~ /#{score}/
end