require 'csv'

class ApplicantController < ApplicationController

  before_filter :require_login

  def home

  end

  def secondTech
    @college = College.find_by_id(params[:collegename])
    @applicant = []
    if (@college.nil?)
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
        @pool = true
        @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = Kaminari.paginate_array(@college.firstTech_pursues()).page(params[:page]).per(20)
      return @applicant
    end
  end

  def final_pursued
    @college = College.find_by_id(params[:collegename])
    @applicant = []
    if (@college.nil?)
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
        @pool = true
        @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = Kaminari.paginate_array(@college.final_pursues()).page(params[:page]).per(20)
      return @applicant
    end
  end

  def firstTech
    @college = College.find_by_id(params[:collegename])
    @applicant = []
    if (@college.nil?)
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
        @pool = true
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
    @college = College.find_by_id(params[:collegename])
    if (@college.nil?)
      @college = College.find_all_by_poolName(params[:collegename])
      pool = []
      pool = Pool.find_by_name(params[:collegename])
      if !params[:cutoff].blank?
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
      @pool = true
      @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
      return @applicant
    end
    if (!@college.nil?)
      if !params[:cutoff].blank?
        @college.update_column(:cutoff, params[:cutoff])
      end
      @applicant = Kaminari.paginate_array(@college.logic_pursues(@college.cutoff)).page(params[:page]).per(20)
      return @applicant
    end
  end

  def show
    @college = College.find_by_id(params[:collegename])
    @applicant = []
    if (@college.nil?)
      @college = College.find_all_by_poolName(params[:collegename])
      pool = Pool.find_by_name(params[:collegename])
      if @college != []
        @college.each do |college|
          college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => college.id).count)
          @applicants_per_college = college.logic_pursues(college.cutoff)

          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @pool = true
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
      if !(College.find_by_id(params[:collegename])).nil?
        cutoff = College.find_by_id(params[:collegename]).cutoff
        format.csv { send_data Applicants.to_csv(params[:collegename], cutoff, params[:round]) }
      else
        cutoff = Pool.find_by_name(params[:collegename]).cutoff
        format.csv { send_data Applicants.to_csv_for_pool(params[:collegename], cutoff, params[:round]) }
      end
    end
  end

  def download_for_campus
    respond_to do |format|
      if !(College.find_by_id(params[:collegename])).nil?
        cutoff = College.find_by_(params[:collegename]).cutoff
        format.csv { send_data Applicants.to_csv(params[:collegename], cutoff, "for_campus") }
      else
        cutoff = Pool.find_by_name(params[:collegename]).cutoff
        format.csv { send_data Applicants.to_csv_for_pool(params[:collegename], cutoff, "for_campus") }
      end
    end
  end

  def auto_save
    params[:applicant]
    Applicants.update(params[:id], :"#{params[:attribute]}" => "#{params[:score]}")
    render :nothing => true
  end

  def show_selected
    @college = College.find_by_id(params[:college_name])
    @applicant = []
    if (@college.nil?)
      @college = College.find_all_by_poolName(params[:college_name])
      pool = Pool.find_by_name(params[:college_name])
      if @college != []
        @college.each do |college|
          college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => college.id).count)
          @applicants_per_college = college.logic_pursues(params[:cutoff])

          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end

          @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)


        end
        @college = pool

        @pool = true
      end

    else
      @college.update_attribute(:cutoff, params[:cutoff])
      @applicant = Kaminari.paginate_array(@college.logic_pursues(@college.cutoff)).page(params[:page]).per(20)
    end
    render 'show.js.erb'
  end

  def search
    @college = College.find_by_name(params[:collegename])
    @applicant1 = []
    @applicant = []
    if @college.nil?
      @college = College.find_all_by_poolName(params[:collegename])
      if !@college.nil?
        @college.each do |college|
          @applicant1 << Applicants.where('"Name" like ? AND "collegeId" = ?', "#{params[:search_name]}%", "#{college.id}").page(params[:page]).per(20)
        end
        @applicant = @applicant1[0]
        end

      @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)


    else
    Array(@college).each do |college|
      if params[:Final_Pursued]=="true"
        @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "Result" = ? ', "%#{params[:search_name]}%", "#{college.id}", true)).page(params[:page]).per(20)
      else
        params[:First_Tech_Pursued] == "true" ?
            @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "FirstStatus" = ? ', "%#{params[:search_name]}%", "#{college.id}", true)).page(params[:page]).per(20) :
            if params[:Pairing_Pursued] == "true"
              @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "PairingStatus" = ? ', "%#{params[:search_name]}%", "#{college.id}", true)).page(params[:page]).per(20)
            else
              if  params[:Logic_Pursued] =="true"
                @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ? AND "Score" >= ?', "%#{params[:search_name]}%", "#{college.id}", "#{college.cutoff}")).page(params[:page]).per(20)
              else
                @applicant =Kaminari.paginate_array(Applicants.where('"Name" like ? AND "collegeId" = ?', "#{params[:search_name]}%", "#{college.id}")).page(params[:page]).per(20)
              end
            end
      end
    end
      end
    render "show.js.erb"
  end
end