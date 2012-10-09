require 'test_helper'

class ApplicantControllerTest < ActionController::TestCase
  test "should get show_details" do
    get :show_details
    assert_response :success
  end

end
