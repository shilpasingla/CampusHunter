require "spec_helper"
require "factory_girl"


describe "validations" do

  before(:each) do
    @pool_attr = FactoryGirl.attributes_for(:Pool)
    @college_attr = FactoryGirl.attributes_for(:College)
    @applicants_attr = FactoryGirl.attributes_for(:Applicants)
  end

  it "should not create a new instance of a pool given empty pool name" do
    pool = Pool.new(@pool_attr.merge(:name => ""))
    pool.should_not be_valid
  end

end
