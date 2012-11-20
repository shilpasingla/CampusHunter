class CollegeController < ApplicationController
  before_filter :require_login
  include CollegeHelper
  #helper_method :load_csv_to_database

  def new

    render :layout => "sessions"
  end

  def create
      if College.where(:name => params[:name], :poolName => nil).count == 0
        @college = College.new(:name => params[:name], :numberofapplicant => 0, :cutoff => 0)
        @college.save
        load_college_to_database params[:import], params[:name]
        @college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => @college.id).count)
        redirect_to "/applicant/show/#{@college.id  }"
      else
        @message = "College name already exists"
        render :action => "new", :layout => "sessions"
      end
  end

  def show
    @colleges = []
    if !params[:name].nil?
    @colleges = Kaminari.paginate_array(College.find_all_by_poolName(params[:name])).page(params[:page]).per(10)
    else
      colleges = College.all
      colleges.each do |college|
        if(college.poolName.nil?)
          @colleges << college
        end
      end
    @colleges = Kaminari.paginate_array(@colleges).page(params[:page]).per(10)
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
