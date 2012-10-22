require 'csv'

class ApplicantController < ApplicationController
  before_filter :require_login
  @@college = ""
  def show_details
    @applicant = Applicants.search(params[:collegename])#, params[:cutoff])
  end


  def show_pursued
    @applicant = Applicants.get_pursued(params[:cutoff],@@college)
  end

  def show
  @applicant = Applicants.search(params[:collegename])
    @@college = params[:collegename]
end

  def download
    respond_to do |format|
      format.csv {send_data Applicants.to_csv(params[:collegename])}
    end
  end

  def auto_save
    Applicants.update( params[:id],:Score => "#{params[:score]}" )
  end
end
