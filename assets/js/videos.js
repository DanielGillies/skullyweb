$("#youmax").youmax({
      apiKey: "AIzaSyBqjhrftU5ahZJKWgYjdUuBpUQpjGqiQ64",
      clientId: "795893116207-3vv521tl5hvbbmier31j8fkkcao1rurb.apps.googleusercontent.com",
      channel: "https://www.youtube.com/user/skullyhelmets1",
      playList: [
        "https://www.youtube.com/playlist?list=PLvYZXbH3Q1z3vl9ILwuYFAHXfxmhUSAD9",
        "https://www.youtube.com/playlist?list=PLvYZXbH3Q1z22y3z_LnkM7mD5eNf0LGwe",
        "https://www.youtube.com/playlist?list=LLgGXkEJ5S_MmQCSoBnusr1Q"
      ],
      searchTab: [],
      selectedTab: "u",
      displayVideo: "popup",
      alwaysUseDropdown: false,
      maxResults: 33,
      innerOffset: 50,
      outerOffset: 10,
      minItemWidth: 360,
      maxItemWidth: 720,
      maxContainerWidth: 1440,
      autoPlayVideo: false,
      displayFirstVideoOnLoad: false,
      linkNewPages: true,
      searchBoxScope: "channel",
      videoProtocol: "https:",
      autoLoadComments: false,
      alignPopupToTop: true,
      commentOrder: "relevance", //time|relevance
      featuredVideo: '',
      playlistSearchFile: './json/searchlist.json',
      userWebsite: "http://www.skully.com",
      videoMode: "wide",
      shareLink: "youtube",
      facebookAppId: "",
      widgetMode: false,

      showTitleInVideoPlayer: true,
      playlistAction: "showvideos",

      viewCountType: "abbr",
      likeCommentCountType: "abbr",
      showEvents: true,
      loadMode: "loadmore", //paginate-sides
      hideHeader: false,
      hideNavigation: false,
      loadButtonSize: "large",
      videoPlayerTheme: "light",
      //minVideoContainerHeight:300,


      //minItemWidth:250,
      //maxItemWidth:280,

    });

require('./lazyload')
