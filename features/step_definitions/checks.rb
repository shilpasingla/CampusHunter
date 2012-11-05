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

Then /^"(.*)" should not be present$/ do |arg|
  page.should_not have_content(arg)
end

Then /^"(.*)" message should flash/ do |msg|
  page.should have_content(msg)
end

Then /^I should get the updated score "(.*)"$/ do |score|
  field_labeled('2').value.should =~ /#{score}/
end

Then /^I should not see a field "(.*)"$/ do |name|
  #field = find_field(name)
  #field.present? == true
end