require 'youtube_search'

task :youtube_fill => :environment do
  songs = Song.all
  songs.each do |song|
    if song.artist.nil?
      search_term = song.title
    else
      search_term = song.title + " - " + song.artist
    end
    result = YoutubeSearch.search(search_term).first
    if !result.nil?
      song.update_attributes :yturl => "#{result['video_id']}"
    else
      puts "nil mang.."
    end
  end
end
