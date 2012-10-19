class AddColumnToApplicants < ActiveRecord::Migration
  def change
    add_column :applicants, :RollNo, :string
    add_column :applicants, :Gender, :string
    add_column :applicants, :EmailAdd, :string
    add_column :applicants, :Qualification, :string
    add_column :applicants, :Percentage, :float
  end
end
