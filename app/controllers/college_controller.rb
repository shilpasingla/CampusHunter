#require 'rake'
require 'users_controller'

#Rake::Task.clear
#CampusHunter::Application.load_tasks

class CollegeController < ApplicationController
  before_filter :require_login
  #helper_method :new
  helper_method :load_csv_to_database

  def new
  end

  def create
    #require "pry"
    #binding.pry
    if params[:import] == nil
      flash[:error] = "Please select a csv file."
      render 'college/new'

    else if College.where(:name => params[:name]).count == 0
      load_csv_to_database params[:import],params[:name]
      @college = College.new(:name => params[:name],:numberofapplicant => Applicants.where(:college => params[:name]).count)
      @college.save
      redirect_to "/applicant/show/#{params[:name]}"

    else
      flash[:error] = "College name already exists"
      render 'college/new'
    end

    end
  end


  def show
    @colleges = College.all

    respond_to do |format|
      format.html { render 'college/show'}
      format.json { render json: @colleges }
    end
  end

  private

  def load_csv_to_database(file_name,college_name)

    CSV.new( file_name.tempfile, :headers => true, :col_sep=> "," ).each do |row|
      Applicants.create!(
          :Name => row[0],
          :RollNo => row[1],
          :Gender => row[2],
          :EmailAdd => row[3],
          :Qualification => row[4],
          :Branch => row[5],
          :Percentage => row[6],
          :Score => "",
          :CodePairing => "",
          :PairingStatus =>"",
          :SecondTech =>"",
          :FirstTech => "",
          :Role => "",
          :FirstStatus => "",
          :Result => "",
          :Comment => "",
          :college => college_name
      )
    end
  end
end
