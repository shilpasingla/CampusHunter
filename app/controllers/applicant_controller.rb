class ApplicantController < ApplicationController
  def show_details
  @applicant = Applicants.all
  end
end
