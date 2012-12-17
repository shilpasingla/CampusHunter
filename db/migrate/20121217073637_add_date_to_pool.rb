class AddDateToPool < ActiveRecord::Migration
  def change
  	add_column :pools, :date, :datetime 
  end
end
