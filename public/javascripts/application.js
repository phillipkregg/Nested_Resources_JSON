// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() {
	
		
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
            window.nav = new Navigation;	
        },      


        users: function() { 
        	
        	

            var container = $("#container");
            usersTemplate = _.template($("#users-grid-template").html());
            container.empty(); 
            container.html(usersTemplate).hide().fadeIn("slow");
            
            // var User = kendo.data.Model.define({
            	// id: "id",
            	// fields: {
        			// first_name: { validation: { required: true } },
        			// last_name: { validation: { required: true } }
        		// }
            // });
// 
			// var UsersData = new kendo.data.DataSource({
                    // transport: {
                        // read: {
                        	// url: "/users.json"
                        // }, 
//                         
                        // create: {
                        	// url: "/users/create.json",
                        	// type: "POST"
                        // }, 
//                         
                        // update: {
//                         	
                        	// type: "PUT"
                        // },
//                         
                        // destroy: {
                        	// type: "DELETE"
                        // },
//                         
                        // parameterMap: function(options, operation) {
                            // if (operation !== "read" && options.models) {
                                // return {models: kendo.stringify(options.models)};
                            // }
                        // }
//                         
//                                                  
                    // },
//                     
                    // batch: true,
//                     
                    // pageSize: 5,
//                     
                    // schema: {
                    	// model: User
                    // }
//                     
//                     
                // });             
// 
                // $("#users-grid").kendoGrid({
// 
                    // dataSource: UsersData,
                    // navigatable: true,
                    // editable: true,                    
                    // selectable: true,
		    		// pageable: true,
		    		// sortable: true,	
		    		// toolbar: ["create", "save", "cancel"],
// 
                    // columns: [
                    // {
                        // field: "first_name",
                        // title: "First Name"
                    // },
                    // {
                        // field: "last_name",
                        // title: "Last Name"
                    // },
//                                
//                     
//                     	
                    // ]
//                     
//                     
                // });  
//                 
                
                
                
                
                
                dataSource = new kendo.data.DataSource({
                            transport: {
                                read:  {
                                    url: "/users.json",
                                    dataType: "json"
                                },
                                update: {
                                    url: "/users.json",
                                    type: "PUT"
                                },
                                destroy: {                                    
                                    type: "DELETE"
                                },
                                create: {
                                    url: "users/create.json",
                                    
                                },
                                
                                 parameterMap: function(options, operation) {
                                    
                                        return {models: kendo.stringify(options.models)};
                                                                    }
                                
                            },
                            batch: true,
                            pageSize: 5,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: { editable: false, nullable: false },
                                        first_name: { validation: { required: true } },
                                        last_name: { validation: { required: true } },
                                        created_at: { editable: false },
                                        updated_at: { editable: false }
                                    }
                                }
                            }
                        });

                    $("#users-grid").kendoGrid({
                        dataSource: dataSource,
                        navigatable: true,
                        pageable: true,
                        height: 400,
                        toolbar: ["create", "save", "cancel"],
                        columns: [
                            
                            { title: "First Name", field: "first_name"},
                            { title: "Last Name", field: "last_name"},
                            { title: "Created At", field: "created_at"},
                            { title: "Updated At", field: "updated_at"},
                            { command: "destroy", title: " ", width: "110px" }],
                        
                        editable: true
                    }); 
                
                                            
        },   
        
        
        
        
        
        
        
           
        
        
        
        posts: function() {
            var container = $("#container");
            postsTemplate = _.template($("#posts-grid-template").html());
            container.empty(); 
            container.html(postsTemplate).hide().fadeIn("slow");
            
            
            
            var PostsData = new kendo.data.DataSource({
			    transport: {
			        read: "/posts.json"        
			    },
			    
			    schema: {
					
					model: {
						id: "id",
						fields: {
							title: { validation: { required: true } },
							content: { validation: { required: true }}
						}
					}
				},
				
				pageSize: 5
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
		    	detailInit: detailInit, 	
		    	editable: true,
		    	selectable: true,
		    	pageable: true,
		    	sortable: true	
			});
            
            
            function detailInit(e) {
            	
            	// Reference current row being initialized
            	var detailRow = e.detailRow;
            	
            	// Testing what is coming back from e.data - it's the Post object itself
            	//alert(e.data.id)
            	
            	// Create a subgrid for the current
            	// detail row, getting comments for the post
            	detailRow.find(".comments-grid").kendoGrid({
            		dataSource: {
            			transport: {
            				read: "/all_comments.json"
            			},
            			
            			
						
						pageSize: 5,
            			
            			schema: {
					
							model: {
								id: "id",
								fields: {
									title: { validation: { required: true } },
									content: { validation: { required: true }},
									post_id: { editable: false }
								}
							}
						},
						
						
            			
            			
            			// Turn off server filtering and it allows filtering on the client side                 			
            			//serverFiltering: true,
            			
            			filter: { field: "post_id", operator: "eq", value: e.data.id }
            			
            			
            		},
            		
            		
            		
            		columns: [{ title: "Title", field: "title"},            					
            					 {title: "Comments", field: "content"},
            					{title: "Related Post Id", field: "post_id"}],
            		
            		editable: true,            		
                    selectable: true,
		    		pageable: true,
		    		sortable: true	
            		
            	});
            	
            }
        },    
               
    });
    
    
    
    	// Kick it!
 		App = new AppRouter();
		
    	Backbone.history.start();		
 		
	
    
    
	    
    
// Closing jquery tag    
});




		
		



