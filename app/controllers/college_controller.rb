require 'rake'
require 'users_controller'
Rake::Task.clear
CampusHunter::Application.load_tasks

class CollegeController < ApplicationController

  def new

  end

  helper_method :new

  def create
    if params[:import] == nil
      flash[:error] = "Please select a csv file."
      render 'college/new'
    else
      @college = College.new(params[:college])
      @college.save
      Rake::Task["db:load_csv_data"].reenable
      Rake::Task["db:load_csv_data"].invoke(params[:import])
      redirect_to "/applicant/show_details/"
    end

  end

  before_filter :require_login
end
