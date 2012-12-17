class AddDateToPool < ActiveRecord::Migration
  def change
  	add_column :pools, :year, :integer 
  end
end
