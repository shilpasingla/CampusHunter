require "spec_helper"
require "factory_girl"

describe PoolController do
  before(:each) do
    @pool_attr = FactoryGirl.attributes_for(:Pool)
  end

  it "should direct to a login page when not logged in" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    get :new
    assert_response :success

  end

end