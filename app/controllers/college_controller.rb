require 'rake'
Rake::Task.clear
CampusHunter::Application.load_tasks

class CollegeController < ApplicationController

  def new

    Rake::Task["db:load_csv_data"].reenable
    Rake::Task["db:load_csv_data"].invoke
  end


end