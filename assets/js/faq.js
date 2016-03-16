
// fetch & render zendesk articles
(function() {

  var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
  };

  // retrieve FAQ's from zendesk API
  var fetchZendeskArticles = function() {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function() {
      var sortedArticles = sortZendeskArticles(JSON.parse(this.responseText));
      renderZendeskArticles(sortedArticles);
    });
    req.open("GET", "https://skully.zendesk.com/api/v2/help_center/articles.json?include=sections&per_page=100");
    req.send();      
  };

  // organize zendesk response data (sort articles and group by section)
  var sortZendeskArticles = function(data) {
    var articles = _.groupBy(data.articles, 'section_id');
    var sections = _.chain(data.sections)
      .sortBy('position')
      .map(function(section) {
        section.articles = _.sortBy(articles[section.id], 'position');
        return section;
      })
      .value();

    return sections;
  };

  // render the complete FAQ content
  var renderZendeskArticles = function(sections) {
    var wrapper = document.getElementById("zendeskArticles");
    var innerHTML = "";

    _.forEach(sections, function(section) {
      innerHTML += renderSection(section);
    });

    wrapper.innerHTML = innerHTML;
  };

  // render an individual section
  var renderSection = function(section) {
    return '<div class="section"><h3><a href="'+section.html_url+'">'+section.name+'</a></h3>'+renderArticles(section.articles)+'</div>';
  };

  // render the list of articles
  var renderArticles = function(articles) {
    var articlesHTML = "";
    _.forEach(articles, function(article) {
      articlesHTML += renderArticle(article);
    });
    return '<ul class="article-list">'+articlesHTML+'</ul>';
  };

  // render an individual article
  var renderArticle = function(article) {
    return '<li><a href="'+article.html_url+'">'+article.title+'</a></li>';
  };

  domReady(fetchZendeskArticles);

})();

require('./lazyload')