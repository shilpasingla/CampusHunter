class ChangeColumnNameOfColumnsForApplicants< ActiveRecord::Migration
  #def up
  #    change_table :applicants do |t|
  #      t.change :FirstStatus,:boolean
  #      t.change :PairingStatus,:boolean
  #      t.change :Result,:boolean
  #    end
  #
  #end
  #
  #def down
  #end

  def up
    rename_column :applicants, :FirstStatus, :FirstStatus_string
    rename_column :applicants, :PairingStatus, :PairingStatus_string
    rename_column :applicants, :Result, :Result_string
    #add_column :applicants, :FirstStatus, :boolean
    #add_column :applicants, :PairingStatus, :boolean
    #add_column :applicants, :Result, :boolean

    #Applicants.reset_column_information
    #
    #change_table :Applicants do |t|
    #
    #  t.update_attribute(:FirstStatus, t.FirstStatus_string)
    #  t.update_attribute(:PairingStatus, t.PairingStatus_string)
    #  t.update_attribute(:Result, t.Result_string)
    #end
    #
    #remove_column :applicants, :Result
    #remove_column :applicants, :PairingStatus_string
    #remove_column :applicants, :FirstStatus_string

  end
end