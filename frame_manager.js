var sandbox = {}
var iframes = document.getElementsByTagName("iframe");
var original = [];
for(var i = 0; i<iframes.length; ++i) {
  if(iframes[i].hasAttribute("sandbox")) {
    original.push(iframes[i].getAttribute("sandbox"));
  } else {
    original.push(false);
  }
  iframes[i].setAttribute("sandbox","");
}
chrome.storage.sync.get({
  "allow-forms": false,
  "allow-pointer-lock": false,
  "allow-popups": false,
  "allow-same-origin": false,
  "allow-scripts": false,
  "allow-top-navigation": false,
  "whitelist-top": []
}, function(items) {
  sandbox = items;
  var iframes = document.getElementsByTagName("iframe");
  for(var i = 0; i<sandbox["whitelist-top"].length; ++i) {
    console.log(new RegExp(sandbox["whitelist-top"][i]));
    console.log(location.hostname);
    if(new RegExp("^"+sandbox["whitelist-top"][i]+"$","i").test(location.hostname)) {
      console.log("top regex matched");
      for(var j = 0; j<iframes.length; ++j) {
        if(original[j] === false) {
          iframes[j].removeAttribute("sandbox");
        } else {
          iframes[j].setAttribute(iframes[j].getAttribute("sandbox"));
        }
        iframes[j].src += '';
      }
      return;
    }
  }
  for(var i = 0; i<iframes.length; ++i) {
    var attr = "";
    if(iframes[i].getAttribute("sandbox")) {
      for (property in sandbox) {
        if(!sandbox[property]) {
          iframes[i].setAttribute("sandbox",iframes[i].getAttribute("sandbox").replace(property,""));
        }
      }
    } else {
      for (property in sandbox) {
        if(sandbox[property]) {
          attr += " "+property;
        }
      }
      iframes[i].setAttribute("sandbox",attr);
    }
    iframes[i].src += '';
  }
});