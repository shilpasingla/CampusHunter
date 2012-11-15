require 'csv'

module CollegeHelper

  private
  def load_college_to_database(file_name, college_name)
    @college = College.find_by_name(college_name)
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      app = Applicants.create!(row.to_hash)
      app.update_attribute(:collegeId, @college.id)
    end
  end

  private
  def load_pool_to_database(file_name, pool_name)
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
      require 'pry'
      binding.pry
      #hash(:college)
      app = Applicants.create!(hash)
      app.update_attribute(:collegeId, @college.id)
    end
  end
end