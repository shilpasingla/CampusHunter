class AddCollegToApplicants < ActiveRecord::Migration
  def change
    add_column :applicants, :college_name, :string
  end
end
