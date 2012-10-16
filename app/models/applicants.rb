class Applicants < ActiveRecord::Base

  attr_accessible :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech

  validates :Name, :presence => true
  validates :Score, :numericality => {:less_than_or_equal_to => 12, :greater_than_or_equal_to => 0}, :allow_blank => true, :allow_nil => true
  def self.search_applicants
    Applicants.find_by_sql("select * from applicants where name='Rajat Paul'");
  end
end
