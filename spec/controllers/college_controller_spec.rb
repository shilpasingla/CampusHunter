require "spec_helper"
require "factory_girl"

describe CollegeController do

  before(:each) do
    @college_attr = FactoryGirl.attributes_for(:College)
  end

  it "should redirect to login page when not logged in" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    get :new
    assert_response :success

  end

  it "should redirect to new college page if no file is specified for import" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    post :create, :name => "AIT"
    response.should render_template('college/new')
  end

  it "should redirect to list of mentioned college" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    CollegeController.any_instance.stub(:load_college_to_database).with("something", "AIT").and_return(true)
    post :create, {:import => "something", :name => "AIT"}
    colId = College.find_by_name("AIT").id
    response.should redirect_to("/applicant/show/#{colId}")
  end

  it "should redirect to list of colleges page" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    parsed_params = Rails.application.routes.recognize_path '/college/show'
    controller = parsed_params.delete(:controller)
    action = parsed_params.delete(:action)
    get(action, parsed_params)
    assert_response :success
    response.should render_template('college/show')
  end
end