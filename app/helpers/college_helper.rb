require 'csv'

module CollegeHelper

  private
  def load_college_to_database(file_name, college_name)
    #college = College.where(:name => college_name, :poolName => nil)
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
    @col = []
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
      collegename = hash["college"]
      hash.delete("college")
      colleges = College.find_all_by_name(collegename)
      if(colleges.nil?)
        @col = College.create!(:name => collegename, :poolName => pool_name, :numberofapplicant => 0, :cutoff => 0)
      end
      colleges.each do |college|
        if(college.poolName == pool_name)
          @col = college
        else
          @col = College.create!(:name => collegename, :poolName => pool_name, :numberofapplicant => 0, :cutoff => 0)
        end
      end
      app = Applicants.create!(hash)
      app.update_attribute(:collegeId, @col.id)
    end
  end
  end
end
