require 'csv'

module CollegeHelper

  private
  def load_college_to_database(file_name, college_name)
    @col     = []
    colleges = College.find_all_by_name(college_name)
    colleges.each do |college|
      if college.poolId == nil
        @col = college
      end
    end
    return false if file_name.nil?
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
      if (hash["RollNo"].nil? || hash["Name"].nil?)
        return false
      end
      app = Applicants.create!(hash)
      app.update_attribute(:collegeId, @col.id)
    end
  end
end
