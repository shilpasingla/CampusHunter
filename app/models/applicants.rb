class Applicants < ActiveRecord::Base

  attr_accessible :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech

  def self.search_applicants
    Applicants.find_by_sql("select * from applicants where name='Rajat Paul'");
  end
end
