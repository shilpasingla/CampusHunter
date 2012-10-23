require 'csv'

class ApplicantController < ApplicationController
  before_filter :require_login
  @@college = ""
  @@cutoff = ""
  def show_details
    @applicant = Applicants.get_pursued(params[:cutoff], params[:collegename])
  end

  def show
    @applicant = Applicants.get_pursued(params[:cutoff],params[:collegename])
    @@college = params[:collegename]
    @@cutoff = params[:cutoff]
end

  def download
    respond_to do |format|
      format.csv {send_data Applicants.to_csv(params[:collegename],params[:cutoff])}
    end
  end

  def auto_save
    Applicants.update( params[:id],:Score => "#{params[:score]}" )
    render :nothing => true
  end
end
