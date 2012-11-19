class CollegeController < ApplicationController
  before_filter :require_login
  include CollegeHelper
  #helper_method :load_csv_to_database

  def new

    render :layout => "sessions"
  end

  def create

    if (params[:CampusType] == "College")
      if College.where(:name => params[:name]).count == 0
        @college = College.new(:name => params[:name], :numberofapplicant => 0, :cutoff => 0)
        @college.save
        load_college_to_database params[:import], params[:name]
        @college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => @college.id).count)
        redirect_to "/applicant/show/#{params[:name]}"
      else
        @message = "College name already exists"
        render :action => "new", :layout => "sessions"
      end

    elsif (params[:CampusType] == "Pool")
      if College.where(:poolName => params[:name]).count == 0
        Pool.create!(:name => params[:name], :numberofapplicant => 0, :cutoff => 0)
        load_pool_to_database params[:import], params[:name]
        redirect_to "/applicant/show/#{params[:name]}"
      else
        @message = "Pool name already exists"
        render :action => "new", :layout => "sessions"
      end
    end
  end

  def show
    @colleges = Kaminari.paginate_array(College.all).page(params[:page]).per(10)
    respond_to do |format|
      format.html { render 'college/show' }
      format.json { render json: @colleges }
    end
  end

  def delete
    Applicants.delete_all(:collegeId => params[:id])
    College.delete_all(:id => params[:id])
    redirect_to '/college/show'
  end
end
