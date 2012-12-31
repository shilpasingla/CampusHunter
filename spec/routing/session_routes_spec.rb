require 'spec_helper'

describe "session routes" do
  it "should route root to the new session" do
    get('log_in').should route_to('sessions#new')
  end

  it "should route root to the destroy session" do
    get('log_out').should route_to('sessions#destroy')
  end
end
