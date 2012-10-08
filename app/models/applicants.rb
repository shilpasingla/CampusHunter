class Applicants < ActiveRecord::Base
  attr_accessible :Branch, :CodePairing, :Comment, :FirstStatus, :FirstTech, :Name, :PairingStatus, :Result, :Role, :Score, :SecondTech
end
