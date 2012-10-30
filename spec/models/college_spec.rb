require "spec_helper"
require "factory_girl"


describe "validations" do

  before(:each) do
    @college_attr = FactoryGirl.attributes_for(:College)
    @applicants_attr = FactoryGirl.attributes_for(:Applicants)
  end

  it "should create a new instance of a college given valid attributes" do
    College.create!(@college_attr)
  end

  it "should not create a new instance of a college given empty college name" do
    college = College.new(@college_attr.merge(:name => ""))
    college.should_not be_valid
  end

  it "should not create a new instance of a college given empty number of applicant" do
    college = College.new(@college_attr.merge(:numberofapplicant => ""))
    college.should_not be_valid
  end

  it "should not create a new instance of a college given string value for number of applicant" do
    college = College.new(@college_attr.merge(:numberofapplicant => "numberOfApplicant"))
    college.should_not be_valid
  end

  it "should give list of pursued applicants from pairing round" do
    college = College.new(@college_attr)
    college.pairing_pursued().should == [Applicants.create!(@applicants_attr)]
  end

  it "should give list of pursued applicants from first tech round" do
    college = College.new(@college_attr)
    college.first_tech_pursued().should == [Applicants.create!(@applicants_attr)]
  end

  it "should give list of pursued applicants from second tech round" do
    college = College.new(@college_attr)
    college.final_pursued().should == [Applicants.create!(@applicants_attr)]
  end

end