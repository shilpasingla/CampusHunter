class AddColumnToColleges < ActiveRecord::Migration
  def change
    add_column :colleges, :poolName, :string
  end
end
