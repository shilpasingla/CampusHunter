require "spec_helper"

describe "validate" do

  it "should authenticate test user" do
    user = User.new(email:"test_user",password:"abcd")
    #user.save
    require 'pry'
    binding.pry
    User.authenticate(user.email, user.password)

  end


  end

