# Load the rails application
require File.expand_path('../application', __FILE__)

#This line is needed for the Rails app to be able to use the JSON data
# that is being returned from the server
ActiveRecord::Base.include_root_in_json = false

# Initialize the rails application
RoutingTutorial::Application.initialize!
