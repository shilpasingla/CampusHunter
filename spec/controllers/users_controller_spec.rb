require "spec_helper"
require "factory_girl"

describe UsersController do


  it "should redirect to login page when logged in" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    get :new
    assert_response :success

  end

  it "should redirect to new college page" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    User.any_instance.stub(:save).and_return(true)
    post :create
    assigns(:message).should == 'User Added Successfully!'
    response.should render_template("new")
  end

  it "should re-render new template on failed save" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    User.any_instance.stub(:save).and_return(false)
    post :create
    response.should render_template('new')
  end


  it "should notify when trying to delete a non-existent user" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    User.should_receive(:find_by_email).with("email").and_return(nil)
    delete :del, { :email => "email" }
    assigns(:message).should == "User doesn't exist!"
  end

  it "should delete a given user" do
    ApplicationController.any_instance.stub(:require_login).and_return(true)
    user = User.new
    User.should_receive(:find_by_email).with("email").and_return(user)
    delete :del, { :email => "email" }
    assigns(:message).should == 'User deleted successfully!'
  end

end
