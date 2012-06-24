class MusicController < ApplicationController

	def index
      @songs = Song.order("artist ASC");
	end

	def show
		@results = false
		if !params[:term].empty?
			@results = true
			@title = Song.where("title = ?", params[:term]) 
			@artist = Song.where("artist = ?", params[:term])
			puts @title.class().to_s + " "  + @artist.class().to_s
		end
	end

	def self.groupMusic(entry)
		sortedArtists = {}
		entry.each do |song| 
			if sortedArtists.has_key?(song.artist) 
				 sortedArtists[song.artist] << song.title 
			 else 
				 sortedArtists[song.artist] = [] 
				 sortedArtists[song.artist] << song.title 
			 end 
		 end 
		 return sortedArtists
	end

end
