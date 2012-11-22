require 'csv'

module PoolHelper

  private
  def load_pool_to_database(file_name, pool_name)
    @col = []
    CSV.new(file_name.tempfile, :headers => true).each do |row|
      hash = row.to_hash
      if(hash["RollNo"].nil? || hash["Name"].nil?)
        return false
      end
      collegename = hash["college"]
      hash.delete("college")
      @col = College.where(:name => collegename, :poolName => pool_name)
      if(@col == [])
        @col = College.create!(:name => collegename, :poolName => pool_name, :numberofapplicant => 0, :cutoff => 0)
      end
      app = Applicants.create!(hash)
      colleges = College.find_all_by_name(collegename)
      colleges.each do |college|
        if(college.poolName == pool_name)
          app.update_attribute(:collegeId, college.id)
        end
      end
    end
  end
end