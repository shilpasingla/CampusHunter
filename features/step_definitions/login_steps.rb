Given /^I am on the login page/ do
  visit "/sessions/new"
end

When /^I fill in email with "(.*)"$/ do |arg2|
  fill_in 'email', :with => arg2
end

When /^I fill in password with "(.*)"$/ do |arg2|
  fill_in 'password', :with => arg2
end

When /^Click "(.*)" button/ do |button|
  click_button button
end

Then /^I should be directed to the home page/ do
  page.should have_css('h1', :text => 'Listing colleges')
end

Then /^I should be redirected to login page/ do
  get "/sessions/new"
end

Then /^"(.*)" message should flash/ do |error_msg|
  page.should have_content(error_msg)
end