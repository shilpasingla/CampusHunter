When /^Check the pursue box of a student$/ do
  save_and_open_page
  choose("2_pursue")
end
Then /^I should get the updated radio button$/ do
  field_checked = find_field('2_pursue')['checked']
  if field_checked.respond_to? :should
    field_checked.should be_true
  end
end
Then /^Should contain "(.*)"$/ do |arg|
  field = find_field(arg)
  field.should be_present
end
Then /^I should be directed to the "(.*)" page$/ do |arg|
  page.should have_content(arg)
end