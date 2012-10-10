namespace :db do

  desc "load user data from csv"
  task :load_csv_data, [:arg1] =>  :environment do|task,args|
    require 'CSV'
     puts(args[:arg1])
    CSV.foreach(args[:arg1]) do |row|
      Applicants.create(
          :Name => row[0],
          :Score => row[1],
          :Branch => row[2],
          :Role => row[3],
          :CodePairing => row[4],
          :PairingStatus => row[5],
          :FirstTech => row[6],
          :FirstStatus => row[7],
          :SecondTech => row[8],
          :Result => row[9],
          :Comment => row[10]
      )
    end
  end
end