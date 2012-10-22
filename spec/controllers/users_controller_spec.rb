require "spec_helper"
require "factory_girl"

describe UsersController do


  it "should redirect to login page when not logged in" do
   get :new
   response.should redirect_to("/log_in")

  end




end
