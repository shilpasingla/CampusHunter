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
    post :create
    response.should render_template('college/new')
  end

  it "should redirect to list of mentioned college" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    CollegeController.any_instance.stub(:load_csv_to_database).with("something","AIT")
    post :create , {:import => "something" ,:college => {:name => "AIT"} }
    response.should redirect_to("/applicant/show/AIT")
  end

  it "should redirect to list of colleges page" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    get :show
    response.should render_template('college/show')
  end

end