Given /^I am on the login page/ do
  visit "/sessions/new"
end

When /^I fill in email with "(.*)"$/ do |arg2|
  fill_in 'email', :with => arg2
end

When /^I fill in password with "(.*)"$/ do |arg2|
  fill_in 'password', :with => arg2
  click_button 'Login'
end

Then /^I should be directed to the home page/ do
  page.should have_css('h1', :text => 'Listing colleges')
  save_and_open_page
end