require "spec_helper"
require "factory_girl"

describe SessionsController do


  it "should redirect to login page when not logged in" do
    get :new
    assert_response :success

  end

  it "should re-render new template on failed save" do
    User.should_receive(:authenticate).with("email", "password").and_return(nil)
    post 'create', {:email => "email", :password => "password"}
    response.should render_template('new')
  end


  it "should redirect to show colleges page after valid authentication of a user" do
    user = User.new
    User.should_receive(:authenticate).with("email", "password").and_return(user)
    post :create, {:email => "email", :password => "password"}
    response.should redirect_to(root_path)
  end

  it "should delete the given user" do
    delete :destroy
    response.should redirect_to("/sessions/new")
  end

end
