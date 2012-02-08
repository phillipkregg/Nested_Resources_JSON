// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function(){
    
    var sharableDataSource = new kendo.data.DataSource({
	    transport: {
	        read: {
	            url: "/users",
	            dataType: "json"
	            
	        }
	    }
	    
	    
	});
	
	
	$("#grid").kendoGrid({
	    dataSource: sharableDataSource,
	        columns: [
	        { 
	        	title: "First Name",
	            field:"first_name"
	        },
	        
	        {	
	        	title: "Last Name",
	            field: "last_name"	            
	    	}]
	});
    
    
    
});