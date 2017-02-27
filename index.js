$(document).ready(function () {
  var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
  var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey;

  
  $("#search-btn").on("click", function() {
    $.ajax({
    type: "GET",
    url: queryURLBase,
    data: {
      q: "google balloon",
      begin_date: "20160101",
      page: 1
    },
    success: function (response) {
      var data = response.response.docs;
      var articleBox = $("#articles");
      data.forEach(function(article) {
        var headline = article.headline.main;
        var by = article.byline.oranization;
        var date = new Date(article.pub_date).toString();
        console.log(headline);
        var temp = $("<div>");
        temp
          .append($("<h1>").text(headline))
          .append($("<p>").text(by))
          .append($("<p>").text(date));
          
        articleBox.append(temp);


      })




    }
  });


  })






});