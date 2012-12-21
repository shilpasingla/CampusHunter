require 'csv'

class Applicants < ActiveRecord::Base

  attr_accessible :PhoneNo, :RollNo, :Gender, :EmailAdd, :Qualification, :Percentage, :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech, :collegeId

  validates :Name, :presence => true
  validates :Score, :numericality => {:less_than_or_equal_to => 12, :greater_than_or_equal_to => 0}, :allow_blank => true, :allow_nil => true

  def self.to_csv(college_id, cutoff, round)
    @college = College.find_by_id(college_id)

    CSV.generate do |csv|
      if (round == "CodePairing")
        csv << %W[Name RollNo Score Branch Role CodePairing PairingStatus Comment]
        @college.logic_pursues(cutoff).each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.PairingStatus, applicant.Comment]
        end
      elsif (round == "FirstTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech FirstStatus Comment]
        @college.pairing_pursues().each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.FirstTech, applicant.FirstStatus, applicant.Comment]
        end
      elsif (round == "SecondTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech SecondTech Result Comment]
        @college.firstTech_pursues().each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.FirstTech, applicant.SecondTech, applicant.Result, applicant.Comment]
        end
      elsif (round == "Final")
        csv << %W[Name RollNo Gender EmailAdd PhoneNo Score Branch Role CodePairing FirstTech SecondTech Comment]
        @college.final_pursues().each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.Gender, applicant.EmailAdd, applicant.PhoneNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.FirstTech, applicant.SecondTech, applicant.Comment]
        end
      end
    end
  end

  def self.to_csv_for_campus(college_id, cutoff, round)
    @college = College.find_by_id(college_id)

    CSV.generate do |csv|
      if (round == "CodePairing")
        csv << %W[Name RollNo EmailAdd]
        @college.logic_pursues(cutoff).each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd]
        end
      elsif (round == "FirstTech")
        csv << %W[Name RollNo EmailAdd]
        @college.pairing_pursues().each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd]
        end
      elsif (round == "SecondTech")
        csv << %W[Name RollNo EmailAdd]
        @college.firstTech_pursues().each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd]
        end
      elsif (round == "Final")
        csv << %W[Name RollNo EmailAdd]
        @college.final_pursues().each do |applicant|
          csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd]
        end
        end
      end
    end


  def self.to_csv_for_pool(college_name, cutoff, round)
    @colleges = Pool.find_all_by_poolName(college_name).colleges

    CSV.generate do |csv|
      if (round == "CodePairing")
        csv << %W[Name RollNo Score Branch Role CodePairing PairingStatus Comment College]
        @colleges.each do |college|
          college.logic_pursues(cutoff).each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.PairingStatus, applicant.Comment, college.name]
          end
        end
      elsif (round == "FirstTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech FirstStatus Comment College]
        @colleges.each do |college|
          college.pairing_pursues().each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.FirstTech, applicant.FirstStatus, applicant.Comment, college.name]
          end
        end
      elsif (round == "SecondTech")
        csv << %W[Name RollNo Score Branch Role CodePairing FirstTech SecondTech Result Comment College]
        @colleges.each do |college|
          college.firstTech_pursues().each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.FirstTech, applicant.SecondTech, applicant.Result, applicant.Comment, college.name]
          end
        end
      elsif (round == "Final")
        csv << %W[Name RollNo Gender EmailAdd PhoneNo Score Branch Role CodePairing FirstTech SecondTech Comment College]
        @colleges.each do |college|
          college.final_pursues().each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.Gender, applicant.EmailAdd, applicant.PhoneNo, applicant.Score, applicant.Branch, applicant.Role, applicant.CodePairing, applicant.FirstTech, applicant.SecondTech, applicant.Comment, college.name]
          end
        end
      else
        csv << %W[Name RollNo EmailAdd College]
        @colleges.each do |college|
          college.logic_pursues(cutoff).each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd, college.name]
          end
        end
      end
    end
  end

  def self.to_csv_for_pool_campus(college_name, cutoff, round)
    @colleges = College.find_all_by_poolName(college_name)

    CSV.generate do |csv|
      if (round == "CodePairing")
        csv << %W[Name RollNo EmailAdd College]
        @colleges.each do |college|
          college.logic_pursues(cutoff).each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd, college.name]
          end
        end
      elsif (round == "FirstTech")
        csv << %W[Name RollNo EmailAdd College]
        @colleges.each do |college|
          college.pairing_pursues().each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd, college.name]
          end
        end
      elsif (round == "SecondTech")
        csv << %W[Name RollNo EmailAdd College]
        @colleges.each do |college|
          college.firstTech_pursues().each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd, college.name]
          end
        end
      elsif (round == "Final")
        csv << %W[Name RollNo EmailAdd College]
        @colleges.each do |college|
          college.final_pursues().each do |applicant|
            csv << [applicant.Name, applicant.RollNo, applicant.EmailAdd, college.name]
          end
        end
      end
    end
  end
end
