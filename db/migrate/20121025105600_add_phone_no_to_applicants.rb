class AddPhoneNoToApplicants < ActiveRecord::Migration
  def change
    add_column :applicants, :PhoneNo, :string
  end
end
