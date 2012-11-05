Given /^I am on the "(.*)" page of "(.*)"$/ do |page, collegename|
  path = page + collegename
  visit "/sessions/new"
  fill_in 'email', :with => "test_user"
  fill_in 'password', :with => "abcd"
  click_button 'Login'
  visit path
  save_and_open_page
end

When /^I fill in score of a student with "(.*)"$/ do |score|
  fill_in '2', :with => score
  fill_in '3', :with => '1'
end

When /^Reload the page$/ do
  visit "/applicant/show/sample_college"
end

Then /^I should get the updated score "(.*)"$/ do |score|
  field_labeled('2').value.should =~ /#{score}/
end

Then /^I should not see a field "(.*)"$/ do |name|
  #field = find_field(name)
  #field.present? == true
end