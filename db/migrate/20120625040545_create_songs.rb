class CreateSongs < ActiveRecord::Migration
  def up
    create_table :songs do |t|
      t.text :title
      t.text :artist
      t.text :yturl

      t.timestamps
    end
  end

  def down
    drop_table :songs
  end

end
