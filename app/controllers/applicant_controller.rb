class ApplicantController < ApplicationController


  def show_details
    @applicant = Applicants.search(params[:search])
  end

  def search
  end


  private
  def require_login
    if session[:user_id] == nil
      flash[:error] = "You must be logged in to access this page"
      redirect_to "/sessions/new"
    end
  end

  before_filter :require_login
end
