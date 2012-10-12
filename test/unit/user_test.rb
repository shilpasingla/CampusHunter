require 'test_helper'


class UserTest < ActiveSupport::TestCase
  test "Email should not be empty" do
    user = User.new(password:"abcd")
    assert user.invalid?

  end

  test "Password should not be empty" do
    user = User.new(email:"random")
    assert user.invalid?

  end

  test "Email should not be empty string" do
    user=User.new(email:"    ",password:"abcd")
    assert_equal(true, user.invalid?)

  end

  test "Password should not be empty string" do
    user=User.new(email:"random",password:"    ")
    assert_equal(true,user.invalid?)

  end

  test "Email should be unique"  do
    user=User.new(email:"random",password:"abcd")
    assert_equal(false,user.save)

  end

end
