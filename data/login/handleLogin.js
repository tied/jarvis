var loginButton = document.getElementById("loginButton");
if ( loginButton !== null ){
	loginButton.onclick = function(event) {
		// console.log("Hello " + document.getElementById("username").value);
		var username = document.getElementById("username");
		var password = document.getElementById("password");
		self.port.emit("handle-login", username.value, password.value );
		// username.value = '';
		// password.value = '';
	};
}


var annotator = document.getElementById("annotator");
if ( annotator !== null ){
	annotator.addEventListener("click", function(event) {

		console.log( annotator.className );
		if ( annotator.className == "btn btn-primary btn-sm" ) {
			annotator.className = "btn btn-default btn-sm";
		}
		else{
			annotator.className = "btn btn-primary btn-sm";
		}

		if(event.button == 0 && event.shiftKey == false){
			self.port.emit('left-click');
			// if ( annotator.value == "Enable Annotator" ){
		 //      annotator.value = "Disable Annotator";
		 //    }
		 //    else {
		 //      annotator.value = "Enable Annotator";
			// }
		}

		if(event.button == 2 || (event.button == 0 && event.shiftKey == true)){
			self.port.emit('right-click');
			console.log("eadfadf");
			event.preventDefault();
		}

	}, true);
}


var selectProject = document.getElementById("selectProject");
if ( selectProject !== null ){
	selectProject.addEventListener("click", function() {
		var x = document.getElementById("selectProjectCombobox");
		var selectIndex=x.selectedIndex;
		var selectValue=x.options[selectIndex].text;
		self.port.emit("project-selected", selectValue);

	}, false);
}


var selectIssue = document.getElementById("selectIssue");
if ( selectIssue !== null ){
	selectIssue.addEventListener("click", function() {
		var x = document.getElementById("issueCombobox");
		var selectIndex=x.selectedIndex;
		var selectValue=x.options[selectIndex].text;
		self.port.emit("issue-selected", selectValue);
	}, false);
}


var backButton = document.getElementById("backButton");
if ( backButton !== null ){
	backButton.onclick = function(event) {
		var x = document.getElementById("issueNumber").innerHTML;
		var y = x.substr(0, x.indexOf('-'));
		self.port.emit("back-button-pressed", y );
	};
}

var backButtonOnResearchPage = $("#backButtonOnResearchPage");
if ( backButtonOnResearchPage !== null ){
	backButtonOnResearchPage.click(function(event) {
		self.port.emit("back-button-pressed-on-researchpage" );
	});
}

var backButtonOnProjectSelectionPage = document.getElementById("backButtonOnProjectSelectionPage");
if ( backButtonOnProjectSelectionPage !== null ){
	backButtonOnProjectSelectionPage.onclick = function(event) {
		self.port.emit("back-button-pressed-on-project-selection-page" );
	};
}


function getDateTime() {
  var now     = new Date();
  var year    = now.getFullYear();
  var month   = now.getMonth()+1;
  var day     = now.getDate();
  var hour    = now.getHours();
  var minute  = now.getMinutes();
  var second  = now.getSeconds();
  if(month.toString().length == 1) {
      var month = '0'+month;
  }
  if(day.toString().length == 1) {
      var day = '0'+day;
  }
  if(hour.toString().length == 1) {
      var hour = '0'+hour;
  }
  if(minute.toString().length == 1) {
      var minute = '0'+minute;
  }
  if(second.toString().length == 1) {
      var second = '0'+second;
  }
  var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
   return dateTime;
}


// fill out combo box options
function fillComboBox(json) {
	var x = document.getElementById("issueCombobox");
	x.onchange = function(event) {
		var selectIndex=x.selectedIndex;
		var selectValue=x.options[selectIndex].text;
		console.log( selectValue + " : " + JSON.stringify(json));
	};

	console.log( json.size );
	for (var i = 0; i < json.length; i++) {
	    var issue = json[i];
	    var option = document.createElement("option");
	  	option.text = issue.key;
	  	x.add(option);
	}
}

// fill out projects combo box options
function fillProjectCombobox(json) {
	console.log("Fill Project Combobox");
	var x = document.getElementById("selectProjectCombobox");
	x.onchange = function(event) {
		var selectIndex=x.selectedIndex;
		var selectValue=x.options[selectIndex].text;

		console.log( selectValue );
		self.port.emit("project-changed", selectValue);
	};

	for (var i = 0; i < json.length; i++) {
	    var project = json[i];
	    var option = document.createElement("option");
  		option.text = project.key;
  		x.add(option);
  		console.log( project.key );
  		// self.port.emit("project-changed", project.key);
	}

}

function updateProjectInfo(json) {
	document.getElementById("name").innerHTML = json.name;
	document.getElementById("key").innerHTML = json.key;
	document.getElementById("description").innerHTML = json.description;
	// if (json.lead !== "undefined"){
	// 	document.getElementById("lead").innerHTML = json.lead.name;
	// }
	document.getElementById("versions").innerHTML = json.versions;
}

self.port.on("fill-combo-box", function(json) {
	fillComboBox(json);
});


self.port.on("fill-project-combobox", function(json){
	fillProjectCombobox(json);
});


self.port.on("update-project-information", function(json){
	updateProjectInfo(json);
});


var issueLink = document.getElementById("issueLink");
if ( issueLink !== null ){
	issueLink.onclick = function(event) {
		self.port.emit("link-clicked", issueLink.innerHTML );
	};
}



// var textArea = document.getElementById("edit-box");
// textArea.addEventListener('keyup', function onkeyup(event) {
//   if (event.keyCode == 13) {
//     // Remove the newline.
//     text = textArea.value.replace(/(\r\n|\n|\r)/gm,"");
//     self.port.emit("text-entered", text);
//     textArea.value = '';
//   }
// }, false);


// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.

// self.port.on("show", function onShow() {
//   textArea.focus();
// });