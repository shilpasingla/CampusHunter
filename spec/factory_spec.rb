require 'spec_helper'
require 'factory_girl'

describe FactoryGirl do

  it "should be able to create a factory instances" do
  	FactoryGirl.create(:college).should_not be_nil
  	FactoryGirl.create(:pool).should_not be_nil
  	FactoryGirl.create(:user).should_not be_nil
  	FactoryGirl.create(:applicants).should_not be_nil
  end
end

