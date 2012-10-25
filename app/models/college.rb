class College < ActiveRecord::Base
  attr_accessible :numberofapplicant, :name, :cutoff
  validates :numberofapplicant, :numericality => {:only_integer => true}
  validates :name, :numberofapplicant,:presence => true
  validates :name, :uniqueness => true

  def logic_pursued(cutoff)
    @pur = []
      if !cutoff.blank?
        cutoff = cutoff.to_i
        @app = Applicants.find_all_by_college(self.name)
        @app.each do|n|
          if n.Score.to_i >= cutoff
            @pur << n
          end
        end
      else
        @pur = Applicants.find_all_by_college(self.name)
      end
    return @pur
  end

  def first_tech_pursued()
    Applicants.where(:college => self.name, :FirstStatus => "pursue")
  end

  def final_pursued()
    Applicants.where(:college => self.name, :Result => "pursue")
  end

  def pairing_pursued()
    Applicants.where(:college => self.name, :PairingStatus => "pursue")
  end

end

