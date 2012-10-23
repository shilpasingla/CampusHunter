require "spec_helper"

describe ApplicantController do

  it "should get list of applicants for a given college" do

   ApplicationController.any_instance.stub(:require_login).and_return(true)
   Applicants.stub(:search).with("thapar")
   get :show_details , {:collegename => "thapar"}
   assert_response :success

  end


  it "should download csv sheet for a college" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    Applicants.stub(:to_csv).with("thapar",6).as_null_object
    get :download , {:format => :csv, :collegename => "thapar", :cutoff=> 6}
    assert_response :success

  end

  it "should auto save the marks" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    Applicants.stub(:update).with("2",:Score =>"2").and_return(true)
    post :auto_save , {:id => 2, :score => 2}
    assert_response :success
  end



end