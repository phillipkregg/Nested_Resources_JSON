class CommentsController < ApplicationController
  # GET /comments
  # GET /comments.xml
 
  
  before_filter :get_post  
  
  respond_to :html, :xml, :json
  
  def index
    @comments = @post.comments.all
    
    respond_with(@comment)
    
  end

  # GET /comments/1
  # GET /comments/1.xml
  def show
    @comment = @post.comments.find(params[:id])
    
    respond_with(@comment)
    
  end

  # GET /comments/new
  # GET /comments/new.xml
  def new
    @comment = @post.comments.build

    respond_with(@comment)
  end

  # GET /comments/1/edit
  def edit
    @comment = @post.comments.find(params[:id])
  end

  # POST /comments
  # POST /comments.xml
  def create
    @comment = @post.comments.build(params[:comment])

    respond_to do |format|
      if @comment.save
        format.html { redirect_to([@post, @comment], :notice => 'Comment was successfully created.') }
        format.xml  { render :xml => @comment, :status => :created, :location => @comment }
        format.json  { render :json => @comment, :status => :created, :location => @comment }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
        format.json  { render :json => @comment.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /comments/1
  # PUT /comments/1.xml
  def update
    @comment = @post.comments.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to(@comment, :notice => 'Comment was successfully updated.') }
        format.xml  { head :ok }
        format.json  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @comment.errors, :status => :unprocessable_entity }
        format.json  { render :json => @comment.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.xml
  def destroy
    @comment = @post.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to(post_comments_url) }
      format.xml  { head :ok }
      format.json  { head :ok }
    end
  end
  
  
  protected  
  
  def get_post
    @post = Post.find_by_id(params[:post_id])
    redirect_to root_path unless @post
  end


  
end
