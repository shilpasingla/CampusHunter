class College < ActiveRecord::Base
  attr_accessible :numberofapplicant, :name, :cutoff, :poolId
  validates :numberofapplicant, :numericality => {:only_integer => true}
  validates :name, :presence => true
  belongs_to :pool, :foreign_key => :poolId

  def logic_pursues(cutoff)
    @col = []
    if !cutoff.blank?
      cutoff = cutoff.to_i
      @app = Applicants.find_all_by_collegeId(self.id)
      @app.each do |n|
        if n.Score.to_i >= cutoff
          @col << n
        end
      end
    else
      @col = Applicants.find_all_by_collegeId(self.id)
    end
    return @col
  end

  def firstTech_pursues()
      Applicants.where(:collegeId => self.id, :FirstStatus => true, :PairingStatus => true)
  end

  def final_pursues()
    Applicants.where(:collegeId => self.id, :Result => true, :FirstStatus => true, :PairingStatus => true)
  end

  def pairing_pursues()
    Applicants.where(:collegeId => self.id, :PairingStatus => true)
  end

end

