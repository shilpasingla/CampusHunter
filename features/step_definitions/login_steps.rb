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
    else
      visit page
  end
end

When /^I fill in "(.*)" with "(.*)"$/ do |arg1, arg2|
  fill_in arg1, :with => arg2
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
    when "delete user"
      get delete_user_path
    else
      get page
  end
end

Then /^"(.*)" message should flash/ do |msg|
  page.should have_content(msg)
end