class College < ActiveRecord::Base
  attr_accessible :numberofapplicant, :name
  validates :numberofapplicant , :numericality => {:only_integer => true}
  validates :name , :numberofapplicant ,:presence => true
end
