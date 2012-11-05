# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(:email => 'test_user', :password => 'abcd')
College.create!(:name => 'sample_college', :numberofapplicant => 16)
Applicants.create!(:Name => 'Abhishek Gupta', :RollNo => '100806112', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Abhishek Singh', :RollNo => '100806110', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Aastha', :RollNo => '100806114', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Sonal Mehra', :RollNo => '100806115', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Rashi', :RollNo => '100806116', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Rahul Kumar', :RollNo => '100806117', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Harshmeet Singh', :RollNo => '100806118', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Anandi', :RollNo => '100806119', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Paarvati', :RollNo => '100806120', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Parul Shukla', :RollNo => '100806121', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Naman Gupta', :RollNo => '100806122', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Siddharth Mehra', :RollNo => '100806129', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Tarun Singh', :RollNo => '100806124', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Malvika Mittal', :RollNo => '100806125', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Priyanka', :RollNo => '100806126', :college => 'sample_college', :Comment => "abc")
Applicants.create!(:Name => 'Vikrant Kapila', :RollNo => '100806127', :college => 'sample_college', :Comment => "abc")
