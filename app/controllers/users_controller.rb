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

  before_filter :require_login

end
