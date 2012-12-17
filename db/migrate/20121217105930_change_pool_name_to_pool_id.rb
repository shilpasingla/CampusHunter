class ChangePoolNameToPoolId < ActiveRecord::Migration
  def up
  	remove_column :colleges, :poolName
  	add_column :colleges, :poolId, :integer
  end

  def down
  	remove_column :colleges, :poolId
  	add_column :colleges, :poolName, :string
  end
end
