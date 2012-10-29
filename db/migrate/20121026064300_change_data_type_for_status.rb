class ChangeDataTypeForStatus < ActiveRecord::Migration
  def up
      change_table :applicants do |t|
        t.change :FirstStatus,:boolean
        t.change :PairingStatus,:boolean
        t.change :Result,:boolean
      end

  end

  def down
  end
end
