class AddNewColumnsToApplicants < ActiveRecord::Migration
  def change
    add_column :applicants, :FirstStatus, :boolean
    add_column :applicants, :PairingStatus, :boolean
    add_column :applicants, :Result, :boolean
  end
end
