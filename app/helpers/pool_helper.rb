require 'csv'

module PoolHelper

  private
  def load_pool_to_database(file_name, pool_name)
    @col = []
    pool = Pool.find_by_name(pool_name)
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
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
    end
  end
end