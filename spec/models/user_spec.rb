require "spec_helper"
require "factory_girl"


describe "validations" do

  before(:each) do
    @user_attr = FactoryGirl.attributes_for(:User)
  end

  it "should create a new instance of a user given valid attributes" do
    User.create!(@user_attr)

  end

  it "should not create a new instance of a user given empty email" do
    user = User.new(@user_attr.merge(:email => ""))
    user.should_not be_valid
  end

  it "should not create a new instance of a user given empty password" do
    user = User.new(@user_attr.merge(:password => ""))
    user.should_not be_valid
  end

  it "should not create a new instance of a user if password and password confirmation fields don't match" do
    user = User.new(@user_attr.merge(:password_confirmation => "wrongPassword"))
    user.should_not be_valid
  end

  it "should not create a new instance of user with same email as of an existing user" do
    User.create!(@user_attr)
    user = User.new(@user_attr)
    user.should_not be_valid
  end

  it "should not create a new instance of a user given password length not within 4 and 20" do
    user = User.new(@user_attr.merge(:password => "abc",:password_confirmation => "abc"))
    user.should_not be_valid
  end

  #it "should authenticate a valid user" do
  #  user = User.authenticate(@user_attr[:email],@user_attr[:password])
  #  user.should_not be_nil
  #end

end
