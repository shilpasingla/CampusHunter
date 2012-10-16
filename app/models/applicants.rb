class Applicants < ActiveRecord::Base

  attr_accessible :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech

  validates :Name, :presence => true
  validates :Score, :numericality => {:less_than_or_equal_to => 12, :greater_than_or_equal_to => 0}, :allow_blank => true, :allow_nil => true

  def self.search(search)
  if search
    #find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
    where('name LIKE ?', "%#{search}%")
  else
    scoped
  end
  end
end
