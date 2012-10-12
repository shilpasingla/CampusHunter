require 'test_helper'

class ApplicantsTest < ActiveSupport::TestCase

  test "Name should not be empty" do
  applicant = Applicants.new
  assert applicant.invalid?

  end

  test "Name should not be empty string" do
    applicant = Applicants.new(Name:"     ")
    assert applicant.invalid?

  end

  test "Score should not be greater than 12" do
    applicant = Applicants.new(Name:"Random", Score: 13)
    assert applicant.invalid?

  end

  test "Score should not be less than 0" do
    applicant = Applicants.new(Name:"Random", Score: -2)
    assert applicant.invalid?
  end
end
