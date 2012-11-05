class CollegeController < ApplicationController
  before_filter :require_login
  include CollegeHelper
  #helper_method :load_csv_to_database

  def new
    render :layout => "sessions"
  end

  def create

    if params[:import] == nil
      flash[:error] = "Please select a csv file."
      render 'college/new'

    else if College.where(:name => params[:name]).count == 0
      load_csv_to_database params[:import],params[:name]
      @college = College.new(:name => params[:name],:numberofapplicant => Applicants.where(:college => params[:name]).count)
      @college.save
      redirect_to "/applicant/show/#{params[:name]}"

    else
      @message =  "College name already exists"
      render 'college/new'
    end

    end
  end


  def show
    @colleges = Kaminari.paginate_array(College.all).page(params[:page]).per(10)

    respond_to do |format|
      format.html { render 'college/show'}
      format.json { render json: @colleges }
    end
  end

  def delete
    Applicants.delete_all(:college => params[:collegename])
    College.delete_all(:name => params[:collegename])
    redirect_to '/college/show'
  end

end
