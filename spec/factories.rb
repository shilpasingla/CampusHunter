FactoryGirl.define do

  factory :College do
    name "Thapar"
    numberofapplicant 5
    cutoff 3

  end

  factory :User do
    email "test_user"
    password "abcd"
    password_confirmation "abcd"

  end

  factory :Applicants do
    Branch "cse"
    CodePairing "rashi"
    Comment "good"
    FirstStatus "true"
    FirstTech "Amit"
    Name "shilpa"
    PairingStatus "true"
    Result "true"
    Role "dev"
    Score 12
    SecondTech "ashu"
    college "Thapar"
    RollNo 1
    Gender "f"
    EmailAdd "a@b.com"
    Qualification "btech"
    Percentage 90

  end


end
