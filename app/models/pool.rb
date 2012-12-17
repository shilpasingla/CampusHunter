class Pool < ActiveRecord::Base
  attr_accessible :cutoff, :name, :numberOfColleges, :numberOfApplicants, :year
  validates :numberOfApplicants,:numberOfColleges, :numericality => {:only_integer => true}
  validates :name, :presence => true
  has_many :colleges, :foreign_key => :poolId

end
