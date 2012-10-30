Given /^I am on the homepage/ do
  get "/college/show"
end

When /^I click on "(.*)"$/ do |collegename|
  get "/applicant/show/Thapar"
end

Then /^It should direct me to the list of applicants of Thapar/ do
  response.should contain("Abhishek")
end