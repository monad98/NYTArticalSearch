$(document).ready(function () {
  const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
  const articleBox = $("#articles");
  const searchTerm = $("#search");
  const numberOfRecords = $("#number");
  const startYear = $("#start-year");
  const endYear = $("#end-year");

  $("#search-btn").on("click", function () {
    $.ajax({
      type: "GET",
      url: queryURLBase,
      data: {
        "api-key": authKey,
        q:  "google balloon",
        begin_date: startYear.val() || "20160101",
        end_date: endYear.val() || "20170228",
        page: (numberOfRecords.val() - 10) || 0,
      },
      success: function (response) {
        var data = response.response.docs;
        data.forEach(function (article) {
          var headline = article.headline.main;
          var by = article.byline.oranization;
          var date = new Date(article.pub_date).toString().split(" ").slice(1,4).join("/");
          var temp = $("<div>")
            .append($("<h1>").text(headline))
            .append($("<p>").text(by))
            .append($("<p>").text(date));
          articleBox.append(temp);
          1
        })
      }
    });
  });






});