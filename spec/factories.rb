FactoryGirl.define do

  factory :College do
    name "testCollege"
    numberofapplicant 5

  end

  factory :User do
    email "test_user"
    password "abcd"
    password_confirmation "abcd"

  end


end
