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

  def del
    @user = User.find_by_email(params[:email])
    if @user.nil?
      redirect_to "/college/new", :notice => "No such user exists!"
    elsif @user.destroy
      redirect_to "/college/new", :notice => "User Deleted!"
    end
  end

  def destroy
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
