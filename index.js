$(document).ready(() => {
  const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
  const articleBox = $("#articles");
  const searchTerm = $("#search");
  const numberOfRecords = $("#number");
  const startYear = $("#start-year");
  const endYear = $("#end-year");

  const convertNumToPages = (num) => {
    return Math.ceil(num / 10); // number of pages, which means number of ajax call
  };

  const ajax = (queryObj, page) => {
    return $.ajax({
      type: "GET",
      url: queryURLBase,
      data: queryObj
    });
  }

  const makeAjaxArray = (howmany, query) => {
    let result = [];
    console.log(howmany);
    for (let i = 0; i < howmany; i++) {
      const queryObj = Object.assign({}, query, {
        page: i
      });
      result = [...result, ajax(queryObj, i)];
    }
    console.log(result);
    return result;
  }

  const fetchArticles = (q, startDate, endDate, num = 10) => {
    const numberOfAjaxCall = convertNumToPages(num);
    const query = {
      "api-key": authKey,
      q: q,
      begin_date: startDate,
      end_date: endDate
    };

    $.when.apply($, makeAjaxArray(numberOfAjaxCall, query))
      .then(response => {
        console.log(response);
        var data = response.response.docs;
        data.forEach((article, idx) => {
          if (idx < num) {
            var temp = $("<div>")
              .append($("<h3>").text(idx+1 + ". " + article.headline.main)) //title
              .append($("<p>").text(article.byline.original)) //by
              .append($("<p>").text("section: " + article.section_name)) // section
              .append($("<p>").text(new Date(article.pub_date).toString().split(" ").slice(1, 4).join("/"))) //date
              .append($("<a target=\"_blank\">").attr("href", article.web_url).text(article.web_url)); //url link
            articleBox.append(temp);
          }
        });
      });
  }; 

  $("#search-btn").on("click", () => {
    fetchArticles(
      searchTerm.val().trim() || "google",
      startYear.val().trim() ? startYear.val().trim() + "0101" : "20160101",
      endYear.val().trim() ? endYear.val().trim() + "0101" : "20170228",
      +numberOfRecords.val().trim() || 10);
  });

});