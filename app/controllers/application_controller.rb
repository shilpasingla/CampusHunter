class ApplicationController < ActionController::Base

  helper_method :current_user


  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_login
    if session[:user_id] == nil
      flash[:error] = "You must be logged in to access this page"
      redirect_to :log_in
    end
  end

end
