class User < ActiveRecord::Base

  attr_accessible :email, :password, :password_confirmation

  before_save :encrypt_password

  def self.authenticate(email, password)
    user = find_by_email(email)
    if user && user.password == BCrypt::Engine.hash_secret(password, user.password_salt)
      return user
    else
      nil
    end
  end

  validates :email, :password, :presence => true
  validates :password, :confirmation => { :message => "you entered do not match" }
  validates :email, :uniqueness => true
  validates :password, :length => { :in => 4..20 }

  def encrypt_password
    self.password_salt = BCrypt::Engine.generate_salt
    self.password      = BCrypt::Engine.hash_secret(password, password_salt)
  end
end
