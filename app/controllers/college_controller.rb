require 'rake'
require 'users_controller'
Rake::Task.clear
CampusHunter::Application.load_tasks

class CollegeController < ApplicationController
  before_filter :require_login
  helper_method :new

  def new

  end

  def create
    if params[:import] == nil
      flash[:error] = "Please select a csv file."
      render 'college/new'
    else
      @college = College.new(params[:college])
      @college.save
      Rake::Task["db:load_csv_data"].reenable
      Rake::Task["db:load_csv_data"].invoke(params[:import],params[:college][:name])
      redirect_to "/applicant/show_details/#{params[:college][:name]}"
    end

  end

  def show
    @colleges = College.all

    respond_to do |format|
      format.html { render 'college/show'}
      format.json { render json: @colleges }
    end
  end

end
