class Song < ActiveRecord::Base
	attr_accessible :title, :artist, :yturl
end
