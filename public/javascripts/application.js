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
			$(this.el).html(this.nav).fadeIn();
			return this;
		}
		
		
		
		});
	
		window.nav = new Navigation;
		
		
		window.UsersView = Backbone.View.extend({
								
			initialize: function() {	
				alert("sup")			
				_.bindAll(this, "render");
				this.usersGrid = _.template($("#users-grid-template").html());
				this.render().el;					
						
			},
			
			render: function() {
				
				$(this.el).html(this.usersGrid).fadeIn();
				return this;
			}
			
		})
	
	
	
	
	
	
	
	
	
	
	
	
	
	var PostsData = new kendo.data.DataSource({
	    transport: {
	        read: {
	            url: "/posts",
	            dataType: "json"
	        }
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
            
    }]
});
	
	
	
	
	
	window.AppRouter = Backbone.Router.extend({
		
		routes: {
			'users': 'users',
			'posts': 'posts'
			
		},
		
		initialize: function() {			
			this.usersView = new UsersView;
		},
		
		
		
		posts: function() {
			var container = $("#container");
			container.empty();
		},
		
		
		
		users: function() {	
			
			var container = $("#container");
			container.empty();			
			
			container.append(this.usersView.render().el);
			
			var UsersData = new kendo.data.DataSource({
				    transport: {
				        read: {
				            url: "/users",
				            dataType: "json"
				        }
				    }
				});				
				
				var grid = $("#users-grid").kendoGrid({
					
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
				
				container.append(grid);
				
		}
		
		
		
	});
	
	
			
	
	
	
	window.App = new AppRouter();
	Backbone.history.start();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    
    
// Closing jquery tag    
});







