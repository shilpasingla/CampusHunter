require 'csv'

module PoolHelper

  private
  def load_pool_to_database(file_name, pool_name, year)
    @col = []
    pool = Pool.find_by_name_and_year(pool_name, year)
    roll_no = ""
    count = 2
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      begin  
        hash = row.to_hash
        roll_no = hash["RollNo"]
        if count == 2
          header_errors = %w(RollNo Name Gender college PhoneNo EmailAdd Qualification Branch Percentage) - hash.keys
          if(header_errors.count > 0)
            return "Please check your csv. for missing/corrupt HEADERS : #{header_errors}"
          end
        end
        if roll_no.nil? || hash['Name'].nil?
          return "Please check your csv. for missing RollNo or Name : at row number #{count}"
        end
        collegename = hash["college"]
        hash.delete("college")
        @col = College.find_by_name_and_poolId(collegename, pool.id)
        if(@col.nil?)
          @col = College.create!(:name => collegename, :poolId => pool.id, :numberofapplicant => 0, :cutoff => 0)
        end
        app = Applicants.create!(hash)
        app.update_attribute(:collegeId, @col.id)
        count = count + 1
      rescue Exception => e 
        return "Error loading row for RollNo : #{roll_no}, Row number : #{count}, error message : #{e.message}"
      end
    end
  end
end