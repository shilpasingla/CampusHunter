class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      redirect_to "/college/new", :notice => "User Added!"
    else
      render "new"
    end
  end

  def destroy
    User.destroy(params[:email])
  end

  private
  def require_login
    if session[:user_id] == nil
      flash[:error] = "You must be logged in to add a new user"
      redirect_to "/sessions/new"
    end
  end

  before_filter :require_login

end
