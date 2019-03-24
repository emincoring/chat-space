class GroupsController < ApplicationController
  def new
  end

  def create
    Group.create(name: group_params[:name])
  end

  def edit
  end

  def update
  end

  private
  def group_params
    params.permit(:name)
  end
end
