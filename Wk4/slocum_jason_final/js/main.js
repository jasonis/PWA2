//         js
//  Jason Slocum      Final        PWA2

    var user = {};
    var project = {};
    var task = {};
    
    var landingTemplate;
    var appTemplate;
    
    var checkLogin = function() {
        $.ajax({
            url : 'xhr/check_login.php',
            type : 'get',
            dataType : 'json',
            success : function(r) {
                if (r.user) {
                    console.log('user exists');
                    userID = r.user.id;
                    loadApp(userID);
                } else {
                    console.log('landing page');
                    loadLanding();
                }
            }
        });
    };
    
    checkLogin();
    
    var loadLanding = function() {
        $('#wrap').empty();
        $.get('templates/template.html', function(htmlArg) {
    
            landingTemplate = htmlArg;
    
            var landing = $(htmlArg).find('#landing-template').html();
            $.template('landingtemplate', landing);
    
            var html = $.render('', 'landingtemplate');
    
            $('#wrap').append(html);
    
            $('#login_button').on('click', function(e) {
                console.log('you clicked login');
                e.preventDefault();
                login();
            });
    
            $('#register_button').on('click', function(e) {
                console.log('you clicked on register');
                e.preventDefault();
                register();
            });
    
        });
    };
    
    var login = function() {
    
        var user = $('#username_login').val();
        var pass = $('#username_pwd').val();
    
        $.ajax({
            url : 'xhr/login.php',
            data : {
                username : user,
                password : pass
            },
            type : 'post',
            dataType : 'json',
            success : function(response) {
                if (response.user) {
                    var userID = response.user.id;
                    loadApp(userID);
    
                } else {
                    console.log('no user');
                    $('#error').html('Incorrect Login. Please Try Again.');
                }
            }
                    
        });
    };
    
    //------------------------------------------Register------------------------------------------------//
    
    var register = function() {
        var firstname = $('#f_name').val();
        var lastname = $('#f_lastname').val();
        var user = $('#f_username').val();
        var pass = $('#f_password').val();
        var email = $('#f_email').val();
        $.ajax({
            url : 'xhr/register.php',
            data : {
                firstname : firstname,
                lastname : lastname,
                username : user,
                password : pass,
                email : email
            },
            type : 'post',
            dataType : 'json',
            success : function(response) {
                if (response.user) {
                    console.log(response);
                    loadApp();
                } else {
                    console.log('register unsuccessful');
                    $('#register_error').html('Please ensure your information is correct.');
                }
            }
        });
    
        return false;
    };
    
    //----------------------------------------------Logout---------------------------------------------//
    
    var logout = function() {
        $.get('xhr/logout.php', function() {
                loadLanding();
        });
        return false;
    };
    
    //---------------------------------------------Load Project Page-------------------------------------//
    var loadApp = function(id) {
        $('#wrap').empty();
    
        $.get('templates/template.html', function(htmlArg) {
    
        appTemplate = htmlArg;
    
        var app = $(htmlArg).find('#app-template').html();
        $.template('apptemplate', app);
    
        var html = $.render('', 'apptemplate');
    
        $('#wrap').append(html);
                    
        $('tbody').sortable();
    
        $('#logout').on('click', function(e) {
            e.preventDefault();
            logout();
        });
    
        $('#newpro').on('click', function(e) {
            e.preventDefault();
            loadAddProject();
        });
    
    });
    
            
    //----------------------------------Add Project-----------------------------------------//
    
    var loadAddProject = function() {
        var status;
        $('#wrap').empty();
        var adding_project = $(appTemplate).find('#add_project').html();
        $.template('addproject', adding_project);
    
        var html = $.render('', 'addproject');
    
        $('#wrap').append(html);
    
        $('.projectstatus').on('click', function(e) {
            console.log('status click');
            e.preventDefault();
            status = $(this).html();
        });
            
    
        $(function() {
            $("#datepicker").datepicker({
            changeMonth : true,
            changeYear : true,
            dateFormat : "D M d, yy"
            });
        });
        
        $('ul li img').click(function (e) {
            $('img.highlight').not(e.target).removeClass('highlight');
            $(this).toggleClass('highlight');
        });
    
        $('#newp_done').on('click', function(e) {
            console.log('done been clicked');
            e.preventDefault();
            loadApp();
            console.log(status);
        });
    
        $('#logout').on('click', function(e) {
            e.preventDefault();
            logout();
        });
    
    };


};





