class MessagesController < ApplicationController
  def index
  end

  def create
    @message = Message.create(message_params)
  end

  private
  def message_params
    params.require(:message).permit(:content, :image, :group_id, :user_id)
  end
end
