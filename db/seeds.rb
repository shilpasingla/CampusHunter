# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(:email => 'test_user', :password => 'abcd')
College.create!(:name => 'sample_college', :numberofapplicant => 16)
Applicants.create!(:Name => 'Abhishek Gupta', :RollNo => '100806112', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Abhishek Singh', :RollNo => '100806110', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Aastha', :RollNo => '100806114', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Sonal Mehra', :RollNo => '100806115', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Rashi', :RollNo => '100806116', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Rahul Kumar', :RollNo => '100806117', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Harshmeet Singh', :RollNo => '100806118', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Anandi', :RollNo => '100806119', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Paarvati', :RollNo => '100806120', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Parul Shukla', :RollNo => '100806121', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Naman Gupta', :RollNo => '100806122', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Siddharth Mehra', :RollNo => '100806129', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Tarun Singh', :RollNo => '100806124', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Malvika Mittal', :RollNo => '100806125', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Priyanka', :RollNo => '100806126', :collegeId => 1, :Comment => "abc")
Applicants.create!(:Name => 'Vikrant Kapila', :RollNo => '100806127', :collegeId => 1, :Comment => "abc")
Pool.create!(:name => 'sample_pool',:cutoff => 0,:numberOfColleges => 0,:numberOfApplicants => 0)