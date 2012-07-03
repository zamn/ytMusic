class MusicController < ApplicationController

  def index
    @songs = Song.order("artist ASC")
    @count = Song.all.count

    respond_to do |format|
      format.html
      format.json { render :json => @count }
    end

	end

	def show
		@results = false
		if !params[:term].empty?
			@results = true
			@title = Song.where("title LIKE ?", "%#{params[:term]}%") 
			@artist = Song.where("artist LIKE ?", "%#{params[:term]}%")
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
