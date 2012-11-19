require 'csv'

class ApplicantController < ApplicationController

  before_filter :require_login
def home

end

  def secondTech
    @college = College.find_by_name(params[:collegename])
    @applicant = []
    if(@college.nil?)
      @college = College.find_all_by_poolName(params[:collegename])
      pool = Pool.find_by_name(params[:collegename])
      if @college != []
        @college.each do |college|
          @applicants_per_college = college.firstTech_pursues()
          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = Kaminari.paginate_array(@college.firstTech_pursues()).page(params[:page]).per(20)
      return @applicant
    end
  end

  def final_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = []
    if(@college.nil?)
      @college = College.find_all_by_poolName(params[:collegename])
      pool = Pool.find_by_name(params[:collegename])
      if @college != []
        @college.each do |college|
          @applicants_per_college = college.final_pursues()
          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = Kaminari.paginate_array(@college.final_pursues()).page(params[:page]).per(20)
      return @applicant
    end
  end

  def firstTech
    @college = College.find_by_name(params[:collegename])
    @applicant = []
    if(@college.nil?)
      @college = College.find_all_by_poolName(params[:collegename])
      pool = Pool.find_by_name(params[:collegename])
      if @college != []
        @college.each do |college|
          @applicants_per_college = college.pairing_pursues()
          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = Kaminari.paginate_array(@college.pairing_pursues()).page(params[:page]).per(20)
      return @applicant
    end
  end

  def codePairing
    @applicant = []
    @college = College.find_by_name(params[:collegename])
    if(@college.nil?)
      @college = College.find_all_by_poolName(params[:collegename])
      pool = []
      if !params[:cutoff].blank?
        pool = Pool.find_by_name(params[:collegename])
        pool.update_column(:cutoff, params[:cutoff])
      end
      @college.each do |college|
          college.update_column(:cutoff, pool.cutoff)
        @applicants_per_college = college.logic_pursues(college.cutoff)
        @applicants_per_college.each do |app|
          @applicant << app
        end
      end
      @college = pool
      @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
      return @applicant
      end
    if(!@college.nil?)
      if !params[:cutoff].blank?
        @college.update_column(:cutoff, params[:cutoff])
      end
        @applicant = Kaminari.paginate_array(@college.logic_pursues(@college.cutoff)).page(params[:page]).per(20)
        return @applicant
    end
  end

  def show
    @college = College.find_by_name(params[:collegename])
    @applicant = []
    if(@college.nil?)
      @college = College.find_all_by_poolName(params[:collegename])
      pool = Pool.find_by_name(params[:collegename])
      applicants_in_pool = 0
      if @college != []
        @college.each do |college|
          applicants_in_pool = applicants_in_pool + Applicants.where(:collegeId => college.id).count
          college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => college.id).count)
          @applicants_per_college = college.logic_pursues(college.cutoff)

          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        pool.update_attribute(:numberOfApplicants, applicants_in_pool)
        @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = Kaminari.paginate_array(@college.logic_pursues(@college.cutoff)).page(params[:page]).per(20)
      return @applicant
    end
  end

  def download
    respond_to do |format|
      cutoff = College.find_by_name(params[:collegename]).cutoff
      format.csv { send_data Applicants.to_csv(params[:collegename], cutoff, params[:round]) }
    end
  end

  def download_for_college
    respond_to do |format|
      cutoff = College.find_by_name(params[:collegename]).cutoff
      format.csv { send_data Applicants.to_csv(params[:collegename], cutoff, "for college") }
    end
  end

  def auto_save
    params[:applicant]
    Applicants.update(params[:id], :"#{params[:attribute]}" => "#{params[:score]}")
    render :nothing => true
  end

  def show_selected
    @college = College.find_by_name(params[:college_name])
    @applicant = []
    if(@college.nil?)
      @college = College.find_all_by_poolName(params[:college_name])
      pool = Pool.find_by_name(params[:college_name])
      if @college != []
        @college.each do |college|
          college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => college.id).count)
          @applicants_per_college = college.logic_pursues(college.cutoff)

          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end

          @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        end
        @college = pool
        pool.update_attribute(:numberofapplicant, applicants_in_pool)
      end

    else
      @college.update_attribute(:cutoff, params[:cutoff])
      @applicant = Kaminari.paginate_array(@college.logic_pursues(@college.cutoff)).page(params[:page]).per(20)
    end
    render 'show.js.erb'
  end

  def search
    @college = College.find_by_name(params[:collegename])
    if params[:Final_Pursued]=="true"
      @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "Result" = ? ', "%#{params[:search_name]}%", "#{@college.id}", true)).page(params[:page]).per(20)
    else
      params[:First_Tech_Pursued] == "true" ?
          @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "FirstStatus" = ? ', "%#{params[:search_name]}%", "#{@college.id}", true)).page(params[:page]).per(20) :
          if params[:Pairing_Pursued] == "true"
            @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "PairingStatus" = ? ', "%#{params[:search_name]}%", "#{@college.id}", true)).page(params[:page]).per(20)
          else
            if  params[:Logic_Pursued] =="true"
              @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "Score" >= ?', "%#{params[:search_name]}%", "#{@college.id}", "#{@college.cutoff}")).page(params[:page]).per(20)
            else
              @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ?', "#{params[:search_name]}%", "#{@college.id}")).page(params[:page]).per(20)
            end
          end
    end

    render "show.js.erb"
  end
end