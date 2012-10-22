class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      require 'pry'
      binding.pry
      session[:user_id] = user.id
      redirect_to "/college/show_all"
    else
      flash.now.alert = "Invalid email or password"
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/sessions/new", :notice => "Successfully logged out!"
  end
end
