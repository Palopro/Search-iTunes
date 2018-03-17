var base_url = "https://itunes.apple.com/search?term="; // API Url

$(document).ready(function () {

    /* 
     * function onClick button "Search"
     * GET to API and parse JSON to Object
     * and show in section Component
    */
    $("#search").click(function () {

        var term = $("#search-input").val();
        console.log("Search Term = \""+ term+"\"");
        var link = base_url + term + "&limit=10";
        $.ajax({
            url: link,
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function (data) {
                var content = $("#acordion");
                $("#acordion").empty();
                /*
                 * Header list songs
                 */
                content.append(
                    "<div class=\"row margins-30\">"+
                        "<div class=\"col-sm-2 col-sm-offset-2\">"+
                            "<p class=\"text-center\">Artist</p>"+
                        "</div>"+
                        "<div class=\"col-sm-2\">"+
                            "<p class=\"text-center\">Track</p>"+
                        "</div>"+
                        "<div class=\"col-sm-2\">"+
                            "<p class=\"text-center\">Collection</p>"+
                        "</div>"+
                        "<div class=\"col-sm-2\">"+
                            "<p class=\"text-center\">Genre</p>"+
                        "</div>"+
                "</div>");
                    /*Parse Json and show into GUI*/
                $(data.results)
                    .each(function (index, value) {
                        //console.log(value);
                        content.append(
                                "<div class=\"panel panel-default\" id=\"info\">" +
                                    "<div class =\"panel-heading\">"+
                                    "<div class=\"row\">" +
                                        "<div class=\"col-12\">" +
                                            
                                            "<div class=\"col-xs-2\"><img class=\"img-responsive\" src=" + value.artworkUrl100 +"></div>" +
                                            "<div class=\"col-xs-2\"><p class=\"text-center\">" + value.artistName + "</p></div>" +
                                            "<div class=\"col-xs-2\"><p class=\"text-center\">" + value.trackName + "</p></div>" +
                                            "<div class=\"col-xs-2\"><p class=\"text-center\">" + value.collectionName + "</p></div>" +
                                            "<div class=\"col-xs-2\"><p class=\"text-center\">" + value.primaryGenreName + "</p></div>" +
                                            "<div class=\"col-xs-2\">" +
                                                "<button class=\"btn\" data-toggle=\"collapse\" aria-expanded=\"true\" " +
                                                    "data-parent=\"#acordion\" data-target=\"#" + index + "\">"+
                                                    "<i class=\"more-less glyphicon glyphicon-plus\"></i>"
                                                    +"</button>" +
                                            "</div>" +
                                    "</div>"+
                                    "</div>"+
                                    "</div>"+
                                "<div id=\""+index+"\" class=\"panel-collapse collapse\" aria-expanded=\"true\">"+
                                    "<div class=\"panel-body\">"+
                                        "<div class=\"row\">"+
                                            "<div class=\"col-xs-10 col-xs-offset-2\">"+
                                                "<h3 class=\"text-muted\">" + value.artistName + " - "+ value.trackName +" "+ "<i class=\"glyphicon glyphicon-music\"></i></h3>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div class=\"row\">"+
                                                "<div class=\"col-xs-5 col-xs-offset-2\">"+
                                                    "<p>"+"<b>Collection: </b>"+"<span>"+value.collectionName +"</span></p>"+
                                                "</div>"+
                                                "<div class=\"col-xs-5\">"+
                                                    "<p>"+"<b>Track duration: </b>"+"<span>" + millisToTime(value.trackTimeMillis) +"</span>"+" min"+"</p>"+
                                                "</div>"+
                                                "<div class=\"col-xs-5 col-xs-offset-2\">"+
                                                    "<p>"+"<b>Track count: </b>"+"<span>"+value.trackCount +"</span></p>"+
                                                "</div>"+
                                                "<div class=\"col-xs-5\">"+
                                                    "<p>"+"<b>Track Price: </b>"+"<span>"+value.trackPrice +"</span>"+" "+"<span>"+value.currency +"</span>"+"</p>"+
                                                "</div>"+
                                                "<div class=\"col-xs-5 col-xs-offset-2\">"+
                                                    "<p>"+"<b>Price: </b>"+"<span>"+value.collectionPrice +"</span>"+" "+"<span>"+value.currency +"</span>"+"</p>"+
                                                "</div>"+

                                        "</div>"+
                                    "</div>"+
                
                            "</div>");

                        /* Background change in each even element */
                            $(".panel:even").css('background', 'rgba(128, 203, 196, 0.3)');
                    })
            }  
        });
    });
});

/*
 * function get param{millis}, and convert to 
 * string with minutes and seconds
 */
function millisToTime(millis){
    var minutes = Math.floor(millis/60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? 0: '') + seconds;
}

/**
 * function changes the icon on the button 
 * when the information is expanded
 */
function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');       
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);