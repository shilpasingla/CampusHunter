class CreateApplicants < ActiveRecord::Migration
  def change
    create_table :applicants do |t|
      t.string :Name
      t.integer :Score
      t.string :Branch
      t.string :Role
      t.string :CodePairing
      t.string :PairingStatus
      t.string :FirstTech
      t.string :FirstStatus
      t.string :SecondTech
      t.string :Result
      t.string :Comment

      t.timestamps
    end
  end
end
