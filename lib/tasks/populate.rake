namespace :populate do
  desc "Populate Characters"
  task characters: :environment do
    10.times do
      character = Character.create(name: Faker::Friends.character)
      5.times { Quote.create(description: Faker::Friends.quote, character_id: character.id) }
    end
  end
end
