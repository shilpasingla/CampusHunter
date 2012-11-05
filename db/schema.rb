# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121026064300) do

  create_table "applicants", :force => true do |t|
    t.string "Name"
    t.integer "Score"
    t.string "Branch"
    t.string "Role"
    t.string "CodePairing"
    t.boolean "PairingStatus", :limit => 255
    t.string "FirstTech"
    t.boolean "FirstStatus", :limit => 255
    t.string "SecondTech"
    t.boolean "Result", :limit => 255
    t.string "Comment"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string "college"
    t.string "RollNo"
    t.string "Gender"
    t.string "EmailAdd"
    t.string "Qualification"
    t.float "Percentage"
    t.string "PhoneNo"
  end

  create_table "colleges", :force => true do |t|
    t.string "name"
    t.integer "numberofapplicant"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer "cutoff"
  end

  create_table "users", :force => true do |t|
    t.string "email"
    t.string "password"
    t.string "password_salt"
  end

end
