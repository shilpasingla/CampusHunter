class College < ActiveRecord::Base
  attr_accessible :numberofapplicant, :name, :cutoff, :poolName
  validates :numberofapplicant, :numericality => {:only_integer => true}
  validates :name, :presence => true
  #validates :name, :uniqueness => true

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

  def firstTech_pursues(pool)
    @app = []
    if pool
      @colleges = College.find_all_by_poolName(params[:collegename])
      @colleges.each do |college|
        applicants = Applicants.where(:collegeId => college.id, :FirstStatus => true)
        applicants.each do |app|
          @app << app
        end
      end
    else
      @app = Applicants.where(:collegeId => self.id, :FirstStatus => true)
    end
    return @app
  end

  def final_pursues(pool)
    @app = []
    if pool
      @colleges = College.find_all_by_poolName(params[:collegename])
      @colleges.each do |college|
        applicants = Applicants.where(:collegeId => college.id, :Result => true)
        applicants.each do |app|
          @app << app
        end
      end
    else
      @app = Applicants.where(:collegeId => self.id, :Result => true)
    end
    return @app
  end

  def pairing_pursues(pool)
    @app = []
    if pool
    @colleges = College.find_all_by_poolName(params[:collegename])
    @colleges.each do |college|
    applicants = Applicants.where(:collegeId => college.id, :PairingStatus => true)
    applicants.each do |app|
      @app << app
    end
    end
    else
    @app = Applicants.where(:collegeId => self.id, :PairingStatus => true)
    end
    return @app
  end

end

