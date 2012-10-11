class User < ActiveRecord::Base
  attr_accessible :email, :password

  def self.authenticate(email,password)
    user = find_by_email(email)
    if user && user.password == password
      user
    else
      nil
    end
  end
  validates :email, :password, :presence => true
  validates :email, :uniqueness => true
  validates :password, :length => { :in => 4..20 }
end
