require 'csv'

class Applicants < ActiveRecord::Base

  attr_accessible :PhoneNo, :RollNo, :Gender, :EmailAdd, :Qualification, :Percentage, :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech, :collegeId

  validates :Name, :RollNo, :presence => true
  validates :Score, :numericality => {:less_than_or_equal_to => 12, :greater_than_or_equal_to => 0}, :allow_blank => true, :allow_nil => true

  def self.to_csv(college_name, cutoff, round)
    @college = College.find_by_name(college_name)
    CSV.generate do |csv|
      if (round == "CodePairing")
        csv << %W[Name RollNo Score Branch Role CodePairing PairingStatus Comment]
        @college.logic_pursues(cutoff).each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[12], column_names[2], column_names[3], column_names[4], column_names[5], column_names[19], column_names[8])
        end
      elsif (round == "FirstTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech FirstStatus Comment]
        @college.pairing_pursues().each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[12], column_names[2], column_names[3], column_names[4], column_names[5], column_names[7], column_names[18], column_names[8])
        end
      elsif (round == "SecondTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech SecondTech Result Comment]
        @college.firstTech_pursues().each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[12], column_names[2], column_names[3], column_names[4], column_names[5], column_names[7], column_names[9], column_names[20], column_names[8])
        end
      elsif (round == "Final")
        csv << column_names
        @college.logic_pursues(cutoff).each do |applicant|
          csv << applicant.attributes.values_at(*column_names)
        end
      else
        csv << %W[Name RollNo]
        @college.logic_pursues(cutoff).each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[12])
        end
      end
    end
  end

end
