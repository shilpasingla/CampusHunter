require 'csv'

class Applicants < ActiveRecord::Base

  attr_accessible :RollNo, :Gender, :EmailAdd, :Qualification,:Percentage, :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech, :college

  validates :Name, :RollNo, :presence => true
  validates :Score, :numericality => {:less_than_or_equal_to => 12, :greater_than_or_equal_to => 0}, :allow_blank => true, :allow_nil => true

  def self.search(search)#,score)
  if search
    where('college LIKE ?', "%#{search}%")
  else
    scoped
  end
  end

  def self.get_pursued(score,collegename)
      if score
        where("Score >= #{score} AND college LIKE ?", "%#{collegename}%")
      else
      scoped
    end
  end

  def self.to_csv(college_name)
    CSV.generate do |csv|
      csv << column_names
      search(college_name).each do |applicant|
        csv << applicant.attributes.values_at(*column_names)
      end
    end
  end

end
