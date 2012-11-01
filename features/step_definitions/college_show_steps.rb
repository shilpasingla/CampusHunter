When /^I click on "(.*)"$/ do |arg|
  click_link arg
end

Then /^It should direct me to the new college form/ do
  page.should have_content("College name")
end

When /^"(.*)" should not be present$/ do |arg|
  page.should_not have_content(arg)
end

Then /^I should be redirected to the applicants of "(.*)" page$/ do |collegename|
  path = "/applicant/show/"+collegename
  get path
end