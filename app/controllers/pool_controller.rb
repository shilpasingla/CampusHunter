class PoolController < ApplicationController
  before_filter :require_login
  include CollegeHelper
  #helper_method :load_csv_to_database

  def new
    render :layout => "sessions"
  end

  def create
    if College.where(:poolName => params[:name]).count == 0
      Pool.create!(:name => params[:name], :numberOfColleges => 0, :numberOfApplicants => 0, :cutoff => 0)
      load_pool_to_database params[:import], params[:name]
      redirect_to "/applicant/show/#{params[:name]}"
    else
      @message = "Pool name already exists"
      render :action => "new", :layout => "sessions"
    end
  end

  def show
    @pools = Kaminari.paginate_array(Pool.all).page(params[:page]).per(10)
    respond_to do |format|
      format.html { render 'pool/show' }
      format.json { render json: @pools }
    end
  end

  def delete
    @colleges= College.find_all_by_poolName(params[:name])
    @colleges.each do |college|
      Applicants.delete_all(:collegeId => college.id)
      College.delete_all(:id => college.id)
    end
    Pool.delete_all(:name => params[:name])
    redirect_to '/pool/show'
  end
end
