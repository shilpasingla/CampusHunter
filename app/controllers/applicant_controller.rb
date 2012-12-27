require 'csv'

class ApplicantController < ApplicationController

  before_filter :require_login

  def home

  end

  def secondTech
    @college = College.find_by_id(params[:id])
    @applicant = []
    if (params[:type] == "pool")
      pool = Pool.find_by_id(params[:id])
      @college = pool.colleges
      if @college != []
        @college.each do |college|
          @applicants_per_college = college.firstTech_pursues()
          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @pool = true
        @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = @college.firstTech_pursues()
      @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
      return @applicant
    end
  end

  def final_pursued
    @college = College.find_by_id(params[:id])
    @applicant = []
    if (params[:type] == "pool")
      pool = Pool.find_by_id(params[:id])
      @college = pool.colleges
      if @college != []
        @college.each do |college|
          @applicants_per_college = college.final_pursues()
          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @pool = true
        @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = @college.final_pursues()
      @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
      return @applicant
    end
  end

  def firstTech
    @college = College.find_by_id(params[:id])
    @applicant = []
    if (params[:type] == "pool")
      pool = Pool.find_by_id(params[:id])
      @college = pool.colleges
      if @college != []
        @college.each do |college|
          @applicants_per_college = college.pairing_pursues()
          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @pool = true
        @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
        return @applicant
      end
    else
      @applicant = @college.pairing_pursues()
      @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
      return @applicant
    end
  end

  def codePairing
    @applicant = []
    if (params[:type] == "pool")
      pool = Pool.find_by_id(params[:id])
      @college = pool.colleges
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
      @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
      return @applicant
    else
      @college = College.find_by_id(params[:id])
      if !params[:cutoff].blank?
        @college.update_column(:cutoff, params[:cutoff])
      end
      @applicant = @college.logic_pursues(@college.cutoff)
      @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
      return @applicant
    end
  end

  def show
    @college = College.find_by_id(params[:collegeId])
    @applicant = []
    if (@college.nil?)
      @pool = true
      pool = Pool.find_by_name_and_year(params[:poolname],params[:year])
      @college = pool.colleges
      if @college != []
        @college.each do |college|
          college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => college.id).count)
          @applicants_per_college = college.logic_pursues(college.cutoff)

          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end
        end
        @college = pool
        @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
        return @applicant
      end
      @college = College.new(:cutoff => 0,:name => params[:poolname])
    else
      @applicant = @college.logic_pursues(@college.cutoff)
      @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
      return @applicant
    end
  end

  def download
    respond_to do |format|
      if !(College.find_by_id(params[:collegeId])).nil?
        cutoff = College.find_by_id(params[:collegeId]).cutoff
        format.csv { send_data Applicants.to_csv(params[:collegeId], cutoff, params[:round]) }
      else
        cutoff = Pool.find_by_name(params[:collegename]).cutoff
        format.csv { send_data Applicants.to_csv_for_pool(params[:collegename], cutoff, params[:round]) }
      end
    end
  end

  def download_for_campus
    respond_to do |format|
      if !(College.find_by_id(params[:collegeId])).nil?
        cutoff = College.find_by_id(params[:collegeId]).cutoff
        format.csv { send_data Applicants.to_csv_for_campus(params[:collegeId], cutoff, params[:round]) }
      else
        cutoff = Pool.find_by_name(params[:collegename]).cutoff
        format.csv { send_data Applicants.to_csv_for_pool_campus(params[:collegename], cutoff, params[:round]) }
      end
    end
  end

  def auto_save
    params[:applicant]
    Applicants.update(params[:id], :"#{params[:attribute]}" => "#{params[:score]}")
    render :nothing => true
  end

  def show_selected
    @college = College.find_by_id(params[:collegeId])
    @applicant = []
    if (@college.nil?)
      pool = Pool.find_by_name_and_year(params[:poolname], params[:year])
      @college = pool.colleges
      if @college != []
        @college.each do |college|
          college.update_attribute(:numberofapplicant, Applicants.where(:collegeId => college.id).count)
          @applicants_per_college = college.logic_pursues(params[:cutoff])

          @applicants_per_college.each do |applicant|
            @applicant << applicant
          end

          @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)


        end
        @college = pool

        @pool = true
      end

    else
      @college.update_attribute(:cutoff, params[:cutoff])
      @applicant = @college.logic_pursues(@college.cutoff)
      @applicant = Kaminari.paginate_array(@applicant.sort).page(params[:page]).per(20)
    end
    render 'show.js.erb'
  end

  def search
    @college = []
    @applicant = []
    college = College.find_by_id(params[:collegeId])
    if college.nil?
      @college = Pool.find_by_name_and_year(params[:poolname], params[:year]).colleges
    else
      @college << college
    end
    Array(@college).each do |college|
      where_clause = Applicants.order("\"id\"").where("concat(LOWER(\"Name\"),' ',LOWER(\"EmailAdd\"),' ',LOWER(\"RollNo\"),' ',LOWER(\"PhoneNo\")) like ? AND \"collegeId\" = ?","%#{params[:search_name].downcase}%",college.id)
      if params[:Final_Pursued]=="true"
        @applicant = @applicant + where_clause.where('"Result" = ?',true).all
      elsif params[:First_Tech_Pursued] == "true"
        @applicant = @applicant + where_clause.where('"FirstStatus" = ? ', true).all
      elsif params[:Pairing_Pursued] == "true"
        @applicant = @applicant + where_clause.where('"PairingStatus" = ? ', true).all
      elsif params[:Logic_Pursued] =="true"
        @applicant = @applicant + where_clause.where('"Score" >= ?', college.cutoff).all
      else
        @applicant = @applicant + where_clause.all
      end
    end
    @applicant = Kaminari.paginate_array(@applicant).page(params[:page]).per(20)
    render "show.js.erb"
  end
end