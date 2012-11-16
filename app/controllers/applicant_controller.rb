require 'csv'

class ApplicantController < ApplicationController

  before_filter :require_login


  def secondTech
    @college = College.find_by_name(params[:collegename])
    @applicant = Kaminari.paginate_array(@college.firstTech_pursues()).page(params[:page]).per(20)
  end

  def final_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = Kaminari.paginate_array(@college.final_pursues()).page(params[:page]).per(20)
  end

  def firstTech
    @college = College.find_by_name(params[:collegename])
    @applicant = Kaminari.paginate_array(@college.pairing_pursues()).page(params[:page]).per(20)
  end

  def codePairing
    @college = College.find_by_name(params[:collegename])
    if !params[:cutoff].blank?
      @college.update_column(:cutoff, params[:cutoff])
    end
    @applicant = Kaminari.paginate_array(@college.logic_pursues(@college.cutoff)).page(params[:page]).per(20)
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

          @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        end
        @college = pool
        pool.update_attribute(:numberofapplicant, applicants_in_pool)
      end

    else
      @applicant = Kaminari.paginate_array(@college.logic_pursues(@college.cutoff)).page(params[:page]).per(20)

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
    @applicant = Kaminari.paginate_array(@college.logic_pursues(params[:cutoff])).page(params[:page]).per(20)
    render 'show.js.erb'
  end

  def search
    @college = College.find_by_name(params[:collegename])
    if params[:Final_Pursued]=="true"
      @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" like ? AND "Result" = ? ', "%#{params[:search_name]}%", "#{@college.id}", true)).page(params[:page]).per(20)
    else
      params[:First_Tech_Pursued] == "true" ?
          @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" like ? AND "FirstStatus" = ? ', "%#{params[:search_name]}%", "#{@college.id}", true)).page(params[:page]).per(20) :
          if params[:Pairing_Pursued] == "true"
            @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" like ? AND "PairingStatus" = ? ', "%#{params[:search_name]}%", "#{@college.id}", true)).page(params[:page]).per(20)
          else
            if  params[:Logic_Pursued] =="true"
              @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" like ? AND "Score" >= ?', "%#{params[:search_name]}%", "#{@college.id}", "#{@college.cutoff}")).page(params[:page]).per(20)
            else
              @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" like ?', "%#{params[:search_name]}%", "#{@college.id}")).page(params[:page]).per(20)
            end
          end
    end

    render "show.js.erb"
  end
end
