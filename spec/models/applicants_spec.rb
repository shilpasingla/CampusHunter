require "spec_helper"
require "factory_girl"


describe "validations" do

  before(:each) do
    @applicants_attr = FactoryGirl.attributes_for(:Applicants)
  end

  it "should create a new instance of an Applicant given valid attributes" do
    Applicants.create!(@applicants_attr)
  end

  it "should not create a new instance of an applicant given empty name" do
    applicant = Applicants.new(@applicants_attr.merge(:Name => ""))
    applicant.should_not be_valid
  end

  it "should not create a new instance of an applicant if score is not within 0 and 12" do
    applicant = Applicants.new(@applicants_attr.merge(:Score => 13))
    applicant.should_not be_valid
  end

  it "should return list of applicants for a college" do
    Smith = Applicants.create!(@applicants_attr.merge(:Name => "Smith",:college => "iit"))
    Arnav = Applicants.create!(@applicants_attr.merge(:Name => "Arnav",:college => "iit"))
    Applicants.search("iit").should == [Smith,Arnav]

  end


end