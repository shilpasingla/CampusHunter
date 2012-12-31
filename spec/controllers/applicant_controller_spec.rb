require "spec_helper"

describe ApplicantController do


  before(:each) do
    @college_attr = FactoryGirl.attributes_for(:college)
    @college = College.create!(@college_attr.merge(:name => "thapar"))
  end

  it "should get list of applicants for a given college" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    #Applicants.stub(:search).with("thapar")
    get :show, { :collegeId => @college.id }
    assert_response :success

  end


  it "should download csv sheet for a college" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    #Applicants.stub(:to_csv).with("thapar",3).as_null_object
    create :pool, :name => 'thapar'
    get :download, { :format => :csv, :collegename => "thapar", :collegeId => 1 }
    assert_response :success

  end

  it "should auto save the marks" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    Applicants.stub(:update).with("2", :Score => "2").and_return(true)
    post :auto_save, { :id => 2, :score => 2, :attribute => "Score" }
    assert_response :success
  end

  it "should render list of selected applicants from logic test" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    get :show_selected, { :cutoff => 3, :collegeId => @college.id }
    assert_response :success
  end

  it "should render list of selected applicants from code pairing" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    get :firstTech, { :id => @college.id }
    assert_response :success
  end

  it "should render list of selected applicants from first technical" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    College.stub(:firstTech_pursues)
    get :secondTech, { :id => @college.id }
    assert_response :success
  end

  it "should render list of selected applicants from second technical" do

    ApplicationController.any_instance.stub(:require_login).and_return(true)
    get :final_pursued, { :id => @college.id }
    assert_response :success
  end

end
