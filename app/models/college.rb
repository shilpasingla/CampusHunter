class College < ActiveRecord::Base
  attr_accessible :numberofapplicant, :name, :cutoff
  validates :numberofapplicant, :numericality => { :only_integer => true }
  validates :name, :numberofapplicant, :presence => true
  validates :name, :uniqueness => true

  def codePairing(cutoff)
    @pur = []
    if !cutoff.blank?
      cutoff = cutoff.to_i
      @app   = Applicants.find_all_by_college(self.name)
      @app.each do |n|
        if n.Score.to_i >= cutoff
          @pur << n
        end
      end
    else
      @pur = Applicants.find_all_by_college(self.name)
    end
    return @pur
  end

  def secondTech()
    Applicants.where(:college => self.name, :FirstStatus => true)
  end

  def final_pursued()
    Applicants.where(:college => self.name, :Result => true)
  end

  def firstTech()
    Applicants.where(:college => self.name, :PairingStatus => true)
  end

end

