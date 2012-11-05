When /^I fill in "(.*)" with "(.*)"$/ do |arg1, arg2|
  fill_in arg1, :with => arg2
end

When /^Click "(.*)" button/ do |button|
  click_button button
end

When /^Check the pursue box of a student$/ do
  choose("2_pursue")
end

When /^I click on "(.*)"$/ do |arg|
  click_link arg
end

When /^I fill in score of a student with "(.*)"$/ do |score|
  fill_in '2', :with => score
  fill_in '3', :with => '1'
end
