class PoolController < ApplicationController
  before_filter :require_login
  include PoolHelper
  #helper_method :load_csv_to_database

  def new
    render :layout => "sessions"
  end

  def create
    pool = Pool.find_by_name_and_year(params[:name], params[:year])
    if params[:append_to_pool] || pool.nil?
      begin
        ActiveRecord::Base.transaction do
          if pool.nil?
            pool = Pool.create!(:name => params[:name], :numberOfColleges => 0, :numberOfApplicants => 0, :cutoff => 0, :year => params[:year])
          end
          load_pool_to_database params[:import], params[:name], params[:year]
          colleges = pool.colleges
          totalApplicants = 0
          colleges.each do |college|
            numberOfApplicants = Applicants.find_all_by_collegeId(college.id).count
            college.update_attribute(:numberofapplicant, numberOfApplicants)
            totalApplicants +=numberOfApplicants
          end
          pool.update_attributes(:numberOfColleges => colleges.count, :numberOfApplicants => totalApplicants)
          redirect_to "/applicant/show/#{params[:name]}/#{params[:year]}"
        end
      rescue Exception => e
        render :action => "new", :layout => "sessions"
      end
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
    @colleges= Pool.find_by_name(params[:name]).colleges
    @colleges.each do |college|
      Applicants.delete_all(:collegeId => college.id)
      College.delete_all(:id => college.id)
    end
    Pool.delete_all(:name => params[:name])
    redirect_to '/pool/show'
  end
end
