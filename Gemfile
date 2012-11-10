source 'https://rubygems.org'

gem 'rails', '3.2.8'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'pg'

group :development do

end
group :test do

  gem "factory_girl_rails", "~> 4.0"
  gem 'cucumber-rails'
  gem 'capybara'
  gem 'database_cleaner'
  gem "rspec-rails", "~> 2.8"
end
gem 'heroku'

group :production do
end

gem 'bcrypt-ruby', :require => 'bcrypt'
gem "haml", "~> 3.1.7"
gem 'rake', '>=0.9.2.2'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'

end

gem 'jquery-ui-rails'
gem 'pry'
platforms :jruby do
  gem 'jruby-openssl'
  gem 'activerecord-jdbcsqlite3-adapter'
end

gem "webrat"

gem 'jquery-rails'

gem 'kaminari'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'