class AddCutOffToColleges < ActiveRecord::Migration
  def change
    add_column :colleges, :cut_off, :integer
  end
end
