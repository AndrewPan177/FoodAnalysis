
$(function(){
$(".showpLogin a").click(function(){
	$('.shadows').show();
$("#popUpLoginMain").show().css({'opacity':1});

});
$(".closepopUp").click(function(){
	$('.shadows').hide();
$("#popUpLoginMain").hide().css({'opacity':0});

});
});

