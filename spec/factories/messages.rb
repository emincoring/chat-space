FactoryBot.define do
  factory :message do
    content {Faker::JapaneseMedia::OnePiece.quote}
    image {File.open("#{Rails.root}/public/uploads/message/image/2/クロネコアイコン2.png")}
    group
    user
  end
end
