require 'csv'

class ApplicantController < ApplicationController
  before_filter :require_login
  @@college = ""
  def show_details
    @applicant = Applicants.search(params[:collegename])#, params[:cutoff])
  end

  def show
    @applicant = Applicants.get_pursued(params[:cutoff],params[:collegename])
  #@applicant = Applicants.search(params[:collegename])
end

  def download
    respond_to do |format|
      format.csv {send_data Applicants.to_csv(params[:collegename])}
    end
  end

  def auto_save
    Applicants.update( params[:id],:Score => "#{params[:score]}" )
    render :nothing => true
  end
end
