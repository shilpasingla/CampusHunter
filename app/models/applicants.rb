require 'csv'

class Applicants < ActiveRecord::Base

  attr_accessible :RollNo, :Gender, :EmailAdd, :Qualification,:Percentage, :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech, :college

  validates :Name, :RollNo, :presence => true
  validates :Score, :numericality => {:less_than_or_equal_to => 12, :greater_than_or_equal_to => 0}, :allow_blank => true, :allow_nil => true

  def self.to_csv(college_name,cutoff)
    CSV.generate do |csv|
      csv << column_names
      get_pursued(cutoff,college_name).each do |applicant|
        csv << applicant.attributes.values_at(*column_names)
      end
    end
  end

end
