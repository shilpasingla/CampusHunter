Given /^I am on the "(.*)" page$/ do |page|
  if (page != "log_in")
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

Then /^I should be directed to the home page/ do
  page.should have_css('h1', :text => 'Listing colleges')
end

Then /^I should be directed to the "(.*)" page$/ do |arg|
  page.should have_content(arg)
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

Then /^It should direct me to the new college form/ do
  page.should have_content("Create")
end

Then /^I should be redirected to the applicants of "(.*)" page$/ do |collegename|
  path = "/applicant/show/"+collegename
  get path
end

Given /^I am on the "(.*)" page of "(.*)"$/ do |page, collegename|
  id = (College.find_by_name(collegename)).id
  path = page + id.to_s
  visit "/sessions/new"
  fill_in 'email', :with => "test_user"
  fill_in 'password', :with => "abcd"
  click_button 'Login'
  visit path
end

When /^Reload the page$/ do
  visit "/applicant/show/1"
end
