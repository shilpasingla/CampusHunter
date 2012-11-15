class College < ActiveRecord::Base
  attr_accessible :numberofapplicant, :name, :cutoff
  validates :numberofapplicant, :numericality => {:only_integer => true}
  validates :name, :presence => true
  validates :name, :uniqueness => true

  def codePairing(cutoff)
    @pur = []
    if !cutoff.blank?
      cutoff = cutoff.to_i
      @app = Applicants.find_all_by_collegeId(self.id)
      @app.each do |n|
        if n.Score.to_i >= cutoff
          @pur << n
        end
      end
    else
      @pur = Applicants.find_all_by_collegeId(self.id)
    end
    return @pur
  end

  def secondTech()
    Applicants.where(:collegeId => self.id, :FirstStatus => true)
  end

  def final_pursued()
    Applicants.where(:collegeId => self.id, :Result => true)
  end

  def firstTech()
    Applicants.where(:collegeId => self.id, :PairingStatus => true)
  end

end

