//         js

$(document).ready(function(){
    
    
    var loadLand = function(){
    
        $.ajax({
            url: 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            success: function(response){
                    var landing = response.landing;
                    var html = '';
                    var html = $.render(landing, "landingtemplate");
                    
                    $('template_landing').append(html);
            }
        });
    };
    
    
    var checkLogin = function(){
	$.ajax({
		url:'xhr/check_login.php',
		type: 'get',
		dataType: 'json',
		success: function(r){
			if(r.user){
				loadApp();
			}else{
				loadLanding();
				$('input, textarea').placeholder();
			};
		}
	});
    }
    
    
    var init = function(){
        $.get('templates/landing.html', function(){
            var landing = $(htmlArg).find('#template_landing').html();
            $.template('landingtemplate', landing);
        });
    };
    
    init();
    
    
    $('button').on('click', function(e){
        loadLand();
        return false;
    });
    
    
    

    
    
    
    
    
    
    

    
    
    
    
    
});