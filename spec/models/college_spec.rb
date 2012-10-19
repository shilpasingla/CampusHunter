require "spec_helper"
require "factory_girl"


describe "validations" do

  before(:each) do
    @college_attr = FactoryGirl.attributes_for(:College)
  end

  it "should create a new instance of a college given valid attributes" do
    College.create!(@college_attr)
  end

end