class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation

  def self.authenticate(email,password)
    user = find_by_email(email)
    if user && user.password == password
      user
    else
      nil
    end
  end
  validates :email, :password, :presence => true
  validates :password, :confirmation => {:message => "and Password_confirmation should be same"}
  validates :email, :uniqueness => true
  validates :password, :length => { :in => 4..20 }
end
