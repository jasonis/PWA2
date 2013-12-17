//         js

$('document').ready(function(){

    console.log('its a start');
    var user = {};
    var project = {};
    var task = {};
    var landingTemplate;
    var appTemplate;
    
    function checkLogin(){
        $.ajax({
	    url:'xhr/check_login.php',
	    type: 'get',
	    dataType: 'json',
	    success: function(response){
                if(response.user){
                    console.log('you are a user');
                    user = response.user;
                    userID = response.user.id;
                    loadApp(userID);
                }else{
                    console.log('no user exists');
                    loadLanding();
                }
            }
        });    
    };
    
    checkLogin(); 
    
    function loadLanding(){
        
        $.get('templates/landing.html', function(template){
            
            landingTemplate = template;
            var mainPage = $('template').find('#template_landing').html();
            
            $('landingTemplate').html(mainPage);
            var html = $.render('', 'landingtemplate');
            
            $('#container').append(html);
            
            console.log('inside the loadLanding function');
            
            $('#submit').on('click', function(e){
                e.preventDefault();
                login();
            });
        });
    };           
                
    function login(){
        var user = $('#username').val();
        var pass = $('#passwd').val();
                
        $.ajax({
            url: 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                'username': user,
                'password': pass
            },
            success: function(response){
                if(response.user){
                    user = response.user;
                    loadApp();
                }else{
                    var error = '<span class = "error">Invalid Username or Password</span>';
                    $(error).appendTo('.signin');
                    console.log('there has been an error with the login');
                }
            }
        });
    };        
            
    // register new user section
    function register(){
        $('#f_submit').click(function(){
            var firstName = $('#f_name').val();
            var lastName = $('#f_lastname').val();
            var username = $('#username').val();
            var password = $('#f_password').val();
            var email = $('#f_email').val();
                   
            $.ajax({
                url: 'xhr/register.php',
                type: 'post',
                dataType: 'json',
                data: {
                    firstname: firstName,
                    lastname: lastName,
                    username: username,
                    password: password,
                    email: email
                },
                success: function(response){
                    if(response.user){
                        loadApp();
                    }else{
                        var error = '<span class = "error">Please Try Again.</span>';
                        $(error).appendTo('#f_submit');
                    }
                }
            });
        });
        return false;
    };
    
    
     
    function loadApp(id){
    
        $.get('templates/app.html', function(htmlArg){
            appTemplate = htmlArg;
            
            var app = $(htmlArg).find('#template_app').html();
        
            $.template('appTemplate', app);
            var html = $('#container').render('', 'appTemplate');
            
            $('#container').append(html);
            
            $('#logout').on('click', function(e) {
                e.preventDefault();
                logout();
            });
        });
        
    };
    
    function logout(){
        $.get('xhr/logout.php', function(){
            window.location.replace("index.html");    
        });
        return false;
    };
    

});  


