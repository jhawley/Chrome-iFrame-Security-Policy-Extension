// Saves options to chrome.storage
function save_options() {
  var inputs = document.getElementsByTagName("input");
  var sync = {
    "allow-forms": false,
    "allow-pointer-lock": false,
    "allow-popups": false,
    "allow-same-origin": false,
    "allow-scripts": false,
    "allow-top-navigation": false
  }
  for (var i = 0, max = inputs.length; i < max; i++){
    if (inputs[i].type === 'checkbox' && inputs[i].checked) {
      sync[inputs[i].id] = true;
    }
  }
  chrome.storage.sync.set(sync, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    "allow-forms": false,
    "allow-pointer-lock": false,
    "allow-popups": false,
    "allow-same-origin": false,
    "allow-scripts": false,
    "allow-top-navigation": false,
    "whitelist-top": []
  }, function(items) {
    for (property in items) {
      if(document.getElementById(property)) {
        document.getElementById(property).checked = items[property];
      }
    }
    var top = document.getElementById("top");
    for (var host in items["whitelist-top"]) {
      var option = document.createElement("option");
      option.text = items["whitelist-top"][host];
      top.add(option);
    }
  });
}

function add_top() {
  var top = document.getElementById("top");
  var option = document.createElement("option");
  option.text = document.getElementById("add_top").value;
  top.add(option);
  document.getElementById("add_top").value = "";
  save_top();
}

function remove_top() {
  var top = document.getElementById("top");
  for (i = 0; i < top.length; i++) {
    if(i>0) {
      if(top.options[i].selected) {
        top.remove(i);
      }
    }
  }
  save_top();
}

function save_top() {
  var top = document.getElementById("top");
  var sync = {"whitelist-top":[]};
  for (i = 0; i < top.length; i++) {
    if(i>0) {
      sync["whitelist-top"].push(top.options[i].text);
    }
  }
  chrome.storage.sync.set(sync, function() {
    var status = document.getElementById('status2');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add1').addEventListener('click',
    add_top);
document.getElementById('remove1').addEventListener('click',
    remove_top);