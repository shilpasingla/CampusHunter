require 'csv'

module CollegeHelper

  private
  def load_csv_to_database(file_name, college_name)

    CSV.new(file_name.tempfile, :headers => true, :col_sep => ",").each do |row|
      Applicants.create!(
          :Name          => row[0],
          :RollNo        => row[1],
          :Gender        => row[2],
          :EmailAdd      => row[3],
          :PhoneNo       => row[4],
          :Qualification => row[5],
          :Branch        => row[6],
          :Percentage    => row[7],
          :Score         => "",
          :CodePairing   => "",
          :PairingStatus => "",
          :SecondTech    => "",
          :FirstTech     => "",
          :Role          => "",
          :FirstStatus   => "",
          :Result        => "",
          :Comment       => "",
          :college       => college_name
      )
    end
  end


end
