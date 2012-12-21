require 'csv'

module PoolHelper

  private
  def load_pool_to_database(file_name, pool_name)
    @col = []
    pool = Pool.find_by_name(pool_name)
    roll_no = ""
    @count = 2
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
      roll_no = hash["RollNo"]
      if(hash["RollNo"].nil? || hash["Name"].nil?)
        return false
      end
      collegename = hash["college"]
      hash.delete("college")
      @col = College.where(:name => collegename, :poolId => pool.id)
      if(@col == [])
        @col = College.create!(:name => collegename, :poolId => pool.id, :numberofapplicant => 0, :cutoff => 0)
      end
      app = Applicants.create!(hash)
      colleges = College.find_all_by_name(collegename)
      colleges.each do |college|
        if(college.pool.id == pool.id)
          app.update_attribute(:collegeId, college.id)
        end
      end
      @count = @count + 1
    end rescue p "Error loading row for RollNo : #{roll_no}, Row number : #{@count}"
  end
end