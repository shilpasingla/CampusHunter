class StudentController < ApplicationController

  def show
  @students = Student.all
  end
end
