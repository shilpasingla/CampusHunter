require "spec_helper"
require "factory_girl"

describe SessionsController do


  before(:each) do
  @user_attr = FactoryGirl.attributes_for(:User)
end




  it "should redirect to login page when not logged in" do
    get :new
    assert_response :success

  end

  it "should re-render new template on failed save" do
    User.any_instance.stub(:valid?).and_return(false)
    post 'create'
    response.should render_template('new')
  end
  #
  #it "should re-render new template on failed save" do
  #
  #
  #
  #  User.any_instance.stub(:valid?).and_return(true)
  #  params[:email] = "test_user"
  #  params[:password] = "abcd"
  #  post :create, user: attributes_for(:User)
  #  #post 'create'  , :email => "test_user",:password => "abcd"
  #  #response.should redirect_to("college/new")
  #  response.should redirect_to users_path(assigns :user)
  #end

end
