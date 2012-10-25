require 'csv'

class ApplicantController < ApplicationController

  before_filter :require_login


  def first_tech_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = @college.first_tech_pursued()
  end

  def final_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = @college.final_pursued()
  end

  def pairing_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = @college.pairing_pursued()
  end

  def logic_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = @college.logic_pursued(@college.cutoff)
  end

  def show
    @college = College.find_by_name(params[:collegename])
    if !params[:cutoff].blank?
      @college.update_column(:cutoff, params[:cutoff])
    end
      @applicant = @college.logic_pursued(@college.cutoff)
  end

  def download
    respond_to do |format|
      cutoff = College.find_by_name(params[:collegename]).cutoff
      format.csv {send_data Applicants.to_csv(params[:collegename])}
    end
  end

  def auto_save
    params[:applicant]
    #require 'pry'
    #binding.pry
    Applicants.update( params[:id],:"#{params[:attribute]}" => "#{params[:score]}" )
    render :nothing => true
  end

  def show_selected
    @college = College.find_by_name(params[:college_name])
    @applicant = @college.logic_pursued(params[:cutoff])
    render :json => @applicant.to_json

  end
end
