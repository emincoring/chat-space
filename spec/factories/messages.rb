FactoryBot.define do
  factory :message do
    content {Faker::JapaneseMedia::OnePiece.quote}
    image {File.open("#{Rails.root}/public/images/no_image.jpg")}
    group
    user
  end
end
