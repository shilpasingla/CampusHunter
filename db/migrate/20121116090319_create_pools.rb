class CreatePools < ActiveRecord::Migration
  def change
    create_table :pools do |t|
      t.string :name
      t.integer :cutoff
      t.integer :numberOfColleges
      t.integer :numberOfApplicants
      t.timestamps
    end
  end
end
