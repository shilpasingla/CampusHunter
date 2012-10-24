require 'csv'

class ApplicantController < ApplicationController
  before_filter :require_login
  def show_details
    cutoff = College.find_by_name(params[:collegename]).cutoff
    @applicant = Applicants.get_pursued(cutoff, params[:collegename])
  end

  def show
    @applicant = Applicants.get_pursued(params[:cutoff],params[:collegename])
end

  def download
    respond_to do |format|
      cutoff = College.find_by_name(params[:collegename]).cutoff
      format.csv {send_data Applicants.to_csv(params[:collegename],cutoff)}
    end
  end

  def auto_save
    Applicants.update( params[:id],:Score => "#{params[:score]}" )
    render :nothing => true
  end
end
