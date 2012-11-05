class CleanUpStructureForApplicants < ActiveRecord::Migration
  def up

    remove_column :applicants, :Result_string
    remove_column :applicants, :PairingStatus_string
    remove_column :applicants, :FirstStatus_string

  end

  def down
  end
end
