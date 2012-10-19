require "spec_helper"
require "factory_girl"


describe "validations" do

  before(:each) do
    @user_attr = FactoryGirl.attributes_for(:User)
  end

  describe "GET #new" do
    #it "assigns an email and password to a user" do
    #  get :new
    #  assigns(:User).phones.map{ |p| p.phone_type }.should eq %w(home office mobile)
    #end
  end


end
