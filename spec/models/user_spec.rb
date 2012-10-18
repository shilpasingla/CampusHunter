require "rspec"
require "spec_helper"
require  "/Users/Shilpa/CampusHunter/app/models/user.rb"

describe "validate" do

  it "should require an email" do
    #require 'pry'
    #binding.pry
      User.authenticate("test_user","abcd")

    end

  end

