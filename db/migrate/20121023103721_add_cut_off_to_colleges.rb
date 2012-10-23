class AddCutOffToColleges < ActiveRecord::Migration
  def change
    add_column :colleges, :cutoff, :integer
  end
end
