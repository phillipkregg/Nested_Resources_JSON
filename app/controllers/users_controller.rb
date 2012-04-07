class UsersController < ApplicationController
    
  respond_to :html, :xml, :json

  
  
  def index
    @users = User.all

    respond_with(@users)
  end
 
  def show
    @user = User.find(params[:id])
    respond_with(@user)
  end

  def new
    @user = User.new
    respond_with(@user)
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(params[:user])

    respond_to do |format|
      if @user.save
        format.html { redirect_to(@user, :notice => 'User was successfully created.') }
        format.xml  { render :xml => @user, :status => :created, :location => @user }
        format.json { render :json => @user }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end



  def update
    respond_to do |format|
      @test = JSON.parse(params[:models])
      @users = JSON.parse(params[:models])
      @users.each do |u|
        user = User.find(u["id"])    
        unless user.nil?
            user.update_attributes u
        end
      end
      format.json { head :no_content }
    end
  end

  

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(users_url) }
      format.xml  { head :ok }
      format.json  { head :ok }
      
    end
  end
end
