FactoryGirl.define do

  factory :college do
    name "Thapar"
    numberofapplicant 5
    cutoff 3
    association :pool
  end

  factory :pool do
    name "Sample_Pool"
    numberOfApplicants 50
    cutoff 6
    numberOfColleges 4
    year 2012
  end


  factory :user do
    email "test_user"
    password "abcd"
    password_confirmation "abcd"

  end

  factory :applicants do
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
    RollNo 1
    Gender "f"
    EmailAdd "a@b.com"
    Qualification "btech"
    Percentage 90

  end


end
