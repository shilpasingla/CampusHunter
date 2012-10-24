require "spec_helper"

describe ApplicantController do


  before(:each) do
    @college_attr = FactoryGirl.attributes_for(:College)
    College.create!(@college_attr.merge(:name => "thapar"))
  end

  it "should get list of applicants for a given college" do

   ApplicationController.any_instance.stub(:require_login).and_return(true)
   #Applicants.stub(:search).with("thapar")
   Applicants.stub(:get_pursued).with(9,"thapar")
   get :show , { :collegename => "thapar" , :cutoff => 9}
   assert_response :success

  end


  it "should download csv sheet for a college" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    Applicants.stub(:to_csv).with("thapar",3).as_null_object
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