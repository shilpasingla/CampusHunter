require 'spec_helper'

describe "general routes" do
  it "should route root to the applicant home page" do
    get('/').should route_to('applicant#home')
  end
end
