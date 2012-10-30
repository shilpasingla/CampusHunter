class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      session[:user_id] = user.id
      redirect_to "/college/show_all"
    else

      #flash.now.alert = "Invalid email or password"
      @message = "Invalid email or password"
      flash.now[:error] = "invalid"
      #require 'pry'
      #binding.pry
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/sessions/new", :notice => "Successfully logged out!"
  end
end
