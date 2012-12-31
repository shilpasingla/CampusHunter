class CollegeController < ApplicationController
  before_filter :require_login
  include CollegeHelper

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
