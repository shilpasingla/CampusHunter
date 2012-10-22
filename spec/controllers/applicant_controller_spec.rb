require "spec_helper"

describe ApplicantController do

  it "should get list of applicants for a given college" do

   ApplicationController.any_instance.stub(:require_login).and_return(true)
   get :show_details , {:collegename => "thapar"}
   assert_response :success

  end

  #it "should get list of applicants clearing cutoff" do
  #
  #  ApplicationController.any_instance.stub(:require_login).and_return(true)
  #  get :show_pursued , {:cutoff => 2}
  #  assert_response :success
  #
  #end

  it "should download csv sheet for a college" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    Applicants.stub(:to_csv).with("thapar").as_null_object
    get :download , {:format => :csv, :collegename => "thapar"}
    assert_response :success

  end

  it "should auto save the marks" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    Applicants.stub(:update).with("2",:Score =>"2").and_return(true)
    post :auto_save , {:id => 2, :score => 2}
    assert_response :success
  end



end