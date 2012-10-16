class AddCollegToApplicants < ActiveRecord::Migration
  def change
    add_column :applicants, :college, :string
  end
end
