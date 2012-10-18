require "rspec"

describe "validations" do

  it "should check presence of college name" do
   #college = College.new(name: " ").should_not raise_error
    true.should == false
  end

  #it "should check presence of number of applicants" do
  #  college = College.new(numberofapplicant: " ").should_not be_valid
  #end
  #
  #it "should be valid in presence of name and numberofapplicants" do
  #  college = College.new(name: "thapar", numberofapplicants: "400").should_not be_valid
  #end



end