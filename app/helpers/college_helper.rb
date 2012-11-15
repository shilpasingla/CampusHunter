require 'csv'

module CollegeHelper

  private
  def load_college_to_database(file_name, college_name)
    @college = College.where(:name => college_name, :poolName => nil)
    if (!@college.nil?)
      CSV.new(file_name.tempfile, :headers => true).each do |row|
        app = Applicants.create!(row.to_hash)
        app.update_attribute(:collegeId, @college.id)
      end
    end
  end

  private
  def load_pool_to_database(file_name, pool_name)
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
      collegename = hash["college"]
      hash.delete("college")

      @college = College.where(:name => collegename, :poolName => pool_name)
      if (@college == [])
        @college = College.create!(:name => collegename, :poolName => pool_name, :numberofapplicant => 0, :cutoff => 0)
      end
      require "pry"
      binding.pry
      app = Applicants.create!(hash)
      app.update_attribute(:collegeId, @college.id)
    end
  end
end