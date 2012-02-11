class AllCommentsController < ApplicationController
  
  respond_to :html, :xml, :json
  
  def index
    @comments = Comment.all
    
    respond_with(@comments)
  end
  
end
