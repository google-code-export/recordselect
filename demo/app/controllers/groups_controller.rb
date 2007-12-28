class GroupsController < ApplicationController
  def show
    redirect_to edit_group_path(params[:id])
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(params[:group])
    render :action => 'new'
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    @group.attributes = params[:group]
    render :action => 'edit'
  end
end
