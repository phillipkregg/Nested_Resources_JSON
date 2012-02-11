// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function(){
	
		
		window.Navigation = Backbone.View.extend({
		el: $("#nav"),
		
		//navTemplate: _.template($("#nav-template").html()),
		
		initialize: function() {			
			_.bindAll(this, "render");
			this.nav = $("#nav-template").html();
			this.render().el;
		},	
		
		render: function() {
			$(this.el).html(this.nav);
			return this;
		}
		
		
		
		});
	
		
	
			
	
	
	window.AppRouter = Backbone.Router.extend({

        routes: {
            'users': 'users',
            'posts': 'posts'

        },

        initialize: function() {            
            var container = $("#container");
            //container.html("#users-grid");
            window.nav = new Navigation;	
        },      

        posts: function() {
            var container = $("#container");
            var postsTemplate = _.template($("#posts-grid-template").html());
            container.empty();
            container.html(postsTemplate).hide().fadeIn("slow");
            
            
            
            
            var PostsData = new kendo.data.DataSource({
			    transport: {
			        read: "/posts.json"
			    }
			});
			
			
			$("#posts-grid").kendoGrid({
				
				dataSource: PostsData,
		   
		        columns: [
		        {
		            field: "title",
		            title: "Title"
		        },
		        {
		            field: "content",
		            title: "Content",		            
		    	}],
		    	
		    	detailTemplate: kendo.template($("#posts-grid-template").html()),
		    	detailInit: detailInit 		
			});
            
            
            function detailInit(e) {
            	
            	// Reference current row being initialized
            	var detailRow = e.detailRow;
            	
            	// Create a subgrid for the current
            	// detail row, getting comments for the post
            	detailRow.find(".posts-grid").kendoGrid({
            		dataSource: {
            			transport: {
            				read: "comments"
            			},
            			
            			schema: {
            				data: "content"
            			},
            			
            			serverFiltering: true,
            			
            			filter: { field: "post_id", operator: "eq", value: e.data.post_id }
            		},
            		
            		columns: [{ title: "Comments", field: "content" }]
            	})
            	
            }
            
            
            
        },      


        users: function() { 

            var container = $("#container");
            usersTemplate = _.template($("#users-grid-template").html());
            container.empty(); 
            container.html(usersTemplate).hide().fadeIn("slow");

			var UsersData = new kendo.data.DataSource({
                    transport: {
                        read: "/users.json"
                    }
                });             

                $("#users-grid").kendoGrid({

                    dataSource: UsersData,

                    columns: [
                    {
                        field: "first_name",
                        title: "First Name"
                    },
                    {
                        field: "last_name",
                        title: "Last Name",

                    }]
                });                              
        }           
    });

    window.App = new AppRouter();
    Backbone.history.start();

  
	    
    
// Closing jquery tag    
});







