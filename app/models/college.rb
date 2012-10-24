class College < ActiveRecord::Base
  attr_accessible :numberofapplicant, :name, :cutoff
  validates :numberofapplicant, :numericality => {:only_integer => true}
  validates :name, :numberofapplicant,:presence => true

  def pursued(cutoff)
      if !cutoff.blank?
        cutoff = cutoff.to_i
        #Applicants.where("applicants.Score >= '#{cutoff}' AND applicants.college = '#{self.name}'")
        Applicants.where(:college => self.name, :Score => cutoff)
      else
        Applicants.find_all_by_college(self.name)
      end
  end
end

