require "spec_helper"

describe "validations" do

  it "should check presence of college name" do
   College.new(name: " ").should_not be_valid           #use validates presence of
  end

  it "should check presence of number of applicants" do
    College.new(numberofapplicant: " ").should_not be_valid    #use validates presence of
  end

  it "should be valid in presence of name and numberofapplicants" do
    College.new(name: "xyz", numberofapplicant: "400").should be_valid   #use factory girl instead of new
  end

  it"should not accept alphabets or symbols for no of applicants" do
    College.new(name:"xyz",numberofapplicant:"a1a").should_not be_valid
  end

end