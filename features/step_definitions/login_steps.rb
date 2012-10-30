Given /^I am on the "(.*)" page$/ do |page|
  if(page != "log_in")
    visit "/sessions/new"
    fill_in 'email', :with => "test_user"
    fill_in 'password', :with => "abcd"
    click_button 'Login'
  end
  case page
    when "log_in"
      visit log_in_path
    when "home"
      visit root_path
  end
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

Then /^I should be redirected to the "(.*)" page/ do |page|
  case page
    when "log_in"
      get log_in_path
    when "home"
      get root_path
    when "add user"
      get sign_up_path
  end
end

Then /^"(.*)" message should flash/ do |msg|
  page.should have_content(msg)
end