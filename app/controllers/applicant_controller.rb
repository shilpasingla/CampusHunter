require 'csv'

class ApplicantController < ApplicationController

  def show_details
    @applicant = Applicants.search(params[:search])
    respond_to do |format|
      format.html
      format.csv {send_data @applicant.to_csv}
    end
  end

  def search
  end

  before_filter :require_login
end
