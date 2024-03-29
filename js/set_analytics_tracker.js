function setAnalyticsTracker() {
    _paq = window._paq = window._paq || [];
    // get session identifier from localstorage
    let session_identifier = localStorage.getItem("dwengo_session_identifier");
    if (session_identifier){
        _paq.push(['setUserId', session_identifier]);
    }
    // Check if url contains the word staging, if so, set the custom dimension to staging
    if (window.location.href.includes("staging.dwengo.org")){
        _paq.push(['setCustomDimension', 2, 'staging']);
    } else {
        _paq.push(['setCustomDimension', 2, 'production']);
    }
    // tracker methods like "setCustomDimension" should be called before "trackPageView" 
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
        var u="//dwengo.org/matomo/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        
    })();
}