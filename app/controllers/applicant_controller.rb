require 'csv'

class ApplicantController < ApplicationController

  before_filter :require_login


  def first_tech_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = Kaminari.paginate_array(@college.first_tech_pursued()).page(params[:page]).per(200)
  end

  def final_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = Kaminari.paginate_array(@college.final_pursued()).page(params[:page]).per(20)
  end

  def pairing_pursued
    @college = College.find_by_name(params[:collegename])
    @applicant = Kaminari.paginate_array(@college.pairing_pursued()).page(params[:page]).per(20)
  end

  def logic_pursued
    @college = College.find_by_name(params[:collegename])
    if !params[:cutoff].blank?
      @college.update_column(:cutoff, params[:cutoff])
    end
    @applicant = Kaminari.paginate_array(@college.logic_pursued(@college.cutoff)).page(params[:page]).per(20)
  end

  def show
    @college = College.find_by_name(params[:collegename])
      @applicant = Kaminari.paginate_array(@college.logic_pursued(@college.cutoff)).page(params[:page]).per(20)
  end

  def download
    respond_to do |format|
      cutoff = College.find_by_name(params[:collegename]).cutoff
      format.csv {send_data Applicants.to_csv(params[:collegename], cutoff)}
    end
  end

  def auto_save
    params[:applicant]
    Applicants.update( params[:id],:"#{params[:attribute]}" => "#{params[:score]}" )
    render :nothing => true
  end

  def show_selected
    @college = College.find_by_name(params[:college_name])
    @applicant = Kaminari.paginate_array(@college.logic_pursued(params[:cutoff])).page(params[:page]).per(20)
    render 'show.js.erb'
  end

  def search
    @college = College.find_by_name(params[:collegename])
    if params[:Final_Pursued]=="true"
      @applicant =Kaminari.paginate_array(Applicants.where("Name like ? OR RollNo like ? OR EmailAdd like ? AND college like ? AND Result ='t' ","%#{params[:search_name]}%","#{params[:search_name]}%","#{params[:search_name]}%","#{params[:collegename]}")).page(params[:page]).per(20)
      else if params[:First_Tech_Pursued] == "true"
        @applicant =Kaminari.paginate_array(Applicants.where("Name like ? OR RollNo like ? OR EmailAdd like ? AND college like ? AND FirstStatus ='t' ","%#{params[:search_name]}%","#{params[:search_name]}%","#{params[:search_name]}%","#{params[:collegename]}")).page(params[:page]).per(20)
          else if params[:Pairing_Pursued] == "true"
            @applicant =Kaminari.paginate_array(Applicants.where("Name like ? OR RollNo like ? OR EmailAdd like ? AND college like ? AND PairingStatus = 't' ","%#{params[:search_name]}%","#{params[:search_name]}%","#{params[:search_name]}%","#{params[:collegename]}")).page(params[:page]).per(20)
            else if  params[:Logic_Pursued] =="true"
              @applicant =Kaminari.paginate_array(Applicants.where("Name like ? OR RollNo like ? OR EmailAdd like ? AND college like ? AND Score >= '#{@college.cutoff}' ","%#{params[:search_name]}%","#{params[:search_name]}%","#{params[:search_name]}%","#{params[:collegename]}")).page(params[:page]).per(20)
          else
            @applicant =Kaminari.paginate_array(Applicants.where("Name like ? OR RollNo like ? OR EmailAdd like ? AND college like ?","%#{params[:search_name]}%","#{params[:search_name]}%","#{params[:search_name]}%","#{params[:collegename]}")).page(params[:page]).per(20)
          end
        end
      end
    end

    render "show.js.erb"
  end
end
