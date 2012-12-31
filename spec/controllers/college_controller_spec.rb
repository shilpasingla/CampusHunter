require "spec_helper"
require "factory_girl"

describe CollegeController do

  before(:each) do
    @college_attr = FactoryGirl.attributes_for(:college)
  end

  it "should redirect to list of colleges page" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    parsed_params = Rails.application.routes.recognize_path '/college/show'
    controller    = parsed_params.delete(:controller)
    action        = parsed_params.delete(:action)
    get(action, parsed_params)
    assert_response :success
    response.should render_template('college/show')
  end
end
