require 'csv'

class Applicants < ActiveRecord::Base

  attr_accessible :PhoneNo, :RollNo, :Gender, :EmailAdd, :Qualification, :Percentage, :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech, :college

  validates :Name, :RollNo, :presence => true
  validates :Score, :numericality => {:less_than_or_equal_to => 12, :greater_than_or_equal_to => 0}, :allow_blank => true, :allow_nil => true

  def self.to_csv(college_name, cutoff, round)
    @college = College.find_by_name(college_name)
    CSV.generate do |csv|
      if (round == "CodePairing")
        csv << %W[Name RollNo Score Branch Role CodePairing PairingStatus Comment]
        @college.codePairing(cutoff).each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[15], column_names[2], column_names[3], column_names[4], column_names[5], column_names[6], column_names[11])
        end
      elsif (round == "FirstTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech FirstStatus Comment]
        @college.firstTech().each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[15], column_names[2], column_names[3], column_names[4], column_names[5], column_names[7], column_names[8], column_names[11])
        end
      elsif (round == "SecondTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech SecondTech Result Comment]
        @college.secondTech().each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[15], column_names[2], column_names[3], column_names[4], column_names[5], column_names[7], column_names[9], column_names[10], column_names[11])
        end
      elsif (round == "Final")
        csv << column_names
        @college.codePairing(cutoff).each do |applicant|
          csv << applicant.attributes.values_at(*column_names)
        end
      else
        csv << %W[Name RollNo]
        @college.codePairing(cutoff).each do |applicant|
          csv << applicant.attributes.values_at(column_names[1], column_names[15])
        end
      end
    end
  end

end
