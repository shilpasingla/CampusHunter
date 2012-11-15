require 'csv'

module CollegeHelper

  private
  def load_csv_to_database(file_name, college_name)
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      app = Applicants.create!(row.to_hash, :college => college_name)
      app.update_attribute(:college, college_name)
    end
  end
end