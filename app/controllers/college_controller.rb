require 'rake'
require 'users_controller'
Rake::Task.clear
CampusHunter::Application.load_tasks

class CollegeController < ApplicationController

  def new

  end

  helper_method :new

  def create
    @college = College.new(params[:college])
    @college.save
    Rake::Task["db:load_csv_data"].reenable
    Rake::Task["db:load_csv_data"].invoke(params[:import])
    redirect_to "/applicant/show_details/"
  end

  private

  def require_login
    if session[:user_id] == nil
      flash[:error] = "You must be logged in to access this page"
      redirect_to "/sessions/new"
    end
  end

  before_filter :require_login
end
