class CreateSong < ActiveRecord::Migration
  def up
    create_table :song do |t|
      t.text :title
      t.text :artist
      t.text :yturl

      t.timestamps
    end
    add_index :song, :title, :fulltext => true
    add_index :song, :artist, :fulltext => true
  end

  def down
    drop_table :songs
  end

end
