class CollegeController < ApplicationController
  before_filter :require_login
  include CollegeHelper
  #helper_method :load_csv_to_database

  def new
    render :layout => "sessions"
  end

  # def create
  #   if College.where(:name => params[:name], :poolName => nil).count == 0
  #     @college = College.new(:name => params[:name], :numberofapplicant => 0, :cutoff => 0)
  #     @college.save
  #     if !(load_college_to_database params[:import], params[:name])
  #       @message = "Please check your csv. RollNo or Name is missing"
  #       render :action => "new", :layout => "sessions"
  #     else
  #       @college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => @college.id).count)
  #       redirect_to "/applicant/show/#{@college.id  }"
  #     end
  #   else
  #     @message = "College name already exists"
  #     render :action => "new", :layout => "sessions"
  #   end
  # end

  def show
    @colleges = []
    if params[:name].present?
      @colleges = Kaminari.paginate_array(Pool.find_by_name(params[:name]).colleges).page(params[:page]).per(100)
    else
      @colleges = Kaminari.paginate_array(College.all).page(params[:page]).per(100)
      respond_to do |format|
        format.html { render 'college/show' }
        format.json { render json: @colleges }
      end
    end
  end

  def delete
    id = params[:id].to_i
    Applicants.delete_all(:collegeId => id)
    College.delete_all(:id => params[:id])
    redirect_to '/college/show'
  end
end
