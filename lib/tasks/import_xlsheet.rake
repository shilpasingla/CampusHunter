namespace :db do

  desc "load user data from csv"
  task :load_csv_data, [:file_name,:college_name] =>  :environment do|task,args|
    require 'CSV'
    CSV.foreach(args[:file_name]) do |row|
      Applicants.create(
          :Name => row[0],
          :RollNo => row[1],
          :Gender => row[2],
          :EmailAdd => row[3],
          :Qualification => row[4],
          :Branch => row[5],
          :Percentage => row[6],
          :Score => "",
          :CodePairing => "",
          :PairingStatus =>"",
          :SecondTech =>"",
          :FirstTech => "",
          :Role => "",
          :FirstStatus => "",
          :Result => "",
          :Comment => "",
          :college => args[:college_name]
      )
    end
  end
end