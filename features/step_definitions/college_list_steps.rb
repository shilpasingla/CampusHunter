#Given /^I am on the homepage$/ do
#  visit "/sessions/new"
#  fill_in 'email', :with => "test_user"
#  fill_in 'password', :with => "abcd"
#  click_button 'Login'
#  visit root_path
#end

When /^I click on "(.*)"$/ do |arg|
  click_link arg
end

Then /^It should direct me to the new college form/ do
  page.should have_content("College name")
end