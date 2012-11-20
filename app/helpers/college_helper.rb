require 'csv'

module CollegeHelper

  private
  def load_college_to_database(file_name, college_name)
    @col = []
    colleges = College.find_all_by_name(college_name)
    colleges.each do |college|
      if(college.poolName == nil)
       @col = college
      end
    end
  CSV.new(file_name.tempfile, :headers => true).each do |row|
    app = Applicants.create!(row.to_hash)
        app.update_attribute(:collegeId, @col.id)
      end
  end

  private
  def load_pool_to_database(file_name, pool_name)
    numberOfColleges = 0
    numberOfApplicants = 0
    @col = []
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
      collegename = hash["college"]
      hash.delete("college")
      colleges = College.find_all_by_name(collegename)
      colleges.each do |college|
        if(college.poolName == pool_name)
          @col = college
        end
      end
      if(@col == [])
        numberOfColleges = numberOfColleges + 1
        @col = College.create!(:name => collegename, :poolName => pool_name, :numberofapplicant => 0, :cutoff => 0)
        end
      app = Applicants.create!(hash)
      numberOfApplicants = numberOfApplicants +1
          app.update_attribute(:collegeId, @col.id)
      end
    Pool.find_by_name(pool_name).update_attributes(:numberOfColleges => numberOfColleges, :numberOfApplicants => numberOfApplicants)
  end
end

