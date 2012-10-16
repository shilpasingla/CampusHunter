class ApplicationController < ActionController::Base

  protect_from_forgery

  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end


  def require_login
    if session[:user_id] == nil
      flash[:error] = "You must be logged in to access this page"
      redirect_to "/sessions/new"
    end
  end
end
