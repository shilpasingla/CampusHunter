require 'rake'
require 'users_controller'
Rake::Task.clear
CampusHunter::Application.load_tasks

class CollegeController < ApplicationController

  def new
    Rake::Task["db:load_csv_data"].reenable
    Rake::Task["db:load_csv_data"].invoke('Sample.csv')
  end

  helper_method :new

  private

  def require_login
    if session[:user_id] == nil
      flash[:error] = "You must be logged in to access this page"
      redirect_to "/sessions/new"
    end
  end

  before_filter :require_login
end
