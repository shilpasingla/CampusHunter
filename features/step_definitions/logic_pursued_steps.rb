When /^Check the pursue box of a student$/ do
  choose("2_pursue")
end
Then /^I should get the updated radio button$/ do
  field_checked = find_field('2_pursue')['checked']
  if field_checked.respond_to? :should
    field_checked.should be_true
  end
end