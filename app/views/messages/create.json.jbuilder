json.user_name @message.user.name
json.content   @message.content
json.time      @message.created_at.strftime("%Y/%m/%d %H:%M:%S")
json.image     @message.image
