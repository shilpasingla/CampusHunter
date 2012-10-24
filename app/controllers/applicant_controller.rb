require 'csv'

class ApplicantController < ApplicationController

  before_filter :require_login

  def pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = @college.pursued(@college.cutoff)
  end

  def show
    @college = College.find_by_name(params[:collegename])
    if(!params[:cutoff].blank?)
    @college.update_column(:cutoff, params[:cutoff])
    end
    @applicant = @college.pursued(@college.cutoff)
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
