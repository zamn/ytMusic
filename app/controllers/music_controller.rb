class MusicController < ApplicationController

	def home
	end

	def show
		@results = false
		if !params[:term].empty?
			@results = true
			@title = Songs.where("title = ?", params[:term]) 
			@artist = Songs.where("artist = ?", params[:term])
			puts @title.class().to_s + " "  + @artist.class().to_s
		end
	end

	define_method groupMusic(entry) do
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
