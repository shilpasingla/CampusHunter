require 'csv'

class ApplicantController < ApplicationController
  before_filter :require_login

  def show_details
    @applicant = Applicants.search(params[:collegename])
  end

  def show
  @applicant = Applicants.search(params[:collegename])
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
