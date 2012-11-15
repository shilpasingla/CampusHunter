class AddCollegeToApplicants < ActiveRecord::Migration
  def change
    add_column :applicants, :collegeId, :Integer
  end
end
