class ChangeColumnTypesForApplicants < ActiveRecord::Migration
  def up
    rename_column :applicants, :FirstStatus, :FirstStatus_string
    rename_column :applicants, :PairingStatus, :PairingStatus_string
    rename_column :applicants, :Result, :Result_string
    add_column :applicants, :FirstStatus, :boolean
    add_column :applicants, :PairingStatus, :boolean
    add_column :applicants, :Result, :boolean
    remove_column :applicants, :Result_string
    remove_column :applicants, :PairingStatus_string
    remove_column :applicants, :FirstStatus_string


  end
end
