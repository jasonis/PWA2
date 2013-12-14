//         js

$('document').ready(function(){
    
    var user;
    
    
    $.ajaxSetup({
        cache: false    
    });
    
    var init = function(){
        $.ajax({
	    url:'xhr/check_login.php',
	    type: 'get',
	    dataType: 'json',
	    success: function(response){
                if(response.user){
                    user = response.user;
                    loadApp();
                }else{
                    loadLand();
                }
            }
        });    
    };
    
    
    init(); 
    
    function loadLand(){
        $.get('templates/landing.html', function(template){
            var landingTemplate = template;
            var mainPage = $('landingTemplate').find('#template_landing').html();
            
            $('#submit').click(function(){
                var username = $('#username').val();
                var password = $('#passwd').val();
                
                var valid = true;
                
                if(username.length === 0){
                    valid = false;
                }if(password.length <= 5){
                    valid = false;
                }else{
                    var error = '<span class ="error">Invalid Username or Password</span>';
                    $(error).appendTo('.signin');
                    return;
                }
                
                $.ajax({
                    url: 'xhr/login.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'username': username,
                        'password': password
                    },
                    success: function(response){
                        if(response.user){
                            user = response.user;
                            init();
                        }else{
                            var error = '<span class = "error">Invalid Username or Password</span>';
                            $(error).appendTo('.signin');
                            return;
                        }
                    }
                });
            });
            
            // register new user section
            $('#f_submit').click(function(){
                var firstName = $('#f_name').val();
                var lastName = $('#f_lastname').val();
                var username = $('#username').val();
                var password = $('#f_password').val();
                var email = $('#f_email').val();
                var valid = true;
                
                if(firstName.length === 0 || lastName.length === 0 || username.length === 0 || password.length === 0 ||email.length === 0){
                    valid = false;
                    var error = '<span class = "error">Please fill out the form completely.</span>';
                    $(error).appendTo('#f_submit');
                    return;
                }
                
                $.ajax({
                    url: 'xhr/register.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'firstname': firstName,
                        'lastname': lastName,
                        'username': username,
                        'password': password,
                        'email': email
                    },
                    success: function(response){
                        if(response.user){
                            loadApp();
                        }else{
                            var error = '<span class = "error">Please Try Again.</span>';
                            $(error).appendTo('#f_submit');
                            return;
                        }
                    }
                });
            });
            
        });
    };
    
    function loadApp(){
        $.get('templates/app.html', function(template){
            var appTemplate = template;
            var app = $('appTemplate').find('#template_app').html();
            
            $.template('appT', app);
            var appHtml = $.render(user, 'appT');
            $('app').html(appHtml);
        });    
    };
    
    win.on('click','#logout', function(){
	$.get('xhr/logout.php', function(){
		loadLand();
	})
	return false;
    })
    


    
});