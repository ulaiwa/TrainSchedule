

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNOI6NeR9pFT88seUrMIYerJZ3zs4eLwA",
    authDomain: "mewohead1firebase.firebaseapp.com",
    databaseURL: "https://mewohead1firebase.firebaseio.com",
    projectId: "mewohead1firebase",
    storageBucket: "mewohead1firebase.appspot.com",
    messagingSenderId: "117353646831"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = $("#first-train-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
  var trainFirstConvert =  moment(trainFirst, "hh:mm").subtract(10, "years").format("X");


var newTrain = {
  name: trainName,
  destination: trainDest,
  firstTrain: trainFirstConvert,
  frequency: trainFreq
};

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.trainFirstConvert);
  console.log(newTrain.frequency);

  alert("you have added your choochoo train successfully!");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  return false;

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable
  var fbTrainName = childSnapshot.val().name;
  var fbTrainDest = childSnapshot.val().destination;
  var fbTrainFirst = childSnapshot.val().firstTrain;
  var fbTrainFreq = childSnapshot.val().frequency;

  var differenceTime = moment().diff(moment.unix(fbTrainFirst), "minutes");
  var timeRemainder = differenceTime % fbTrainFreq;
  var minAway = fbTrainFreq - timeRemainder;
  
//To calculate the arrival time, add the minAway to the current time
  var nextTrainArrival = moment().add(minAway, "m").format("hh:mm A"); 


  console.log(fbTrainName);
  console.log(fbTrainDest);
  console.log(fbTrainFreq);
  console.log(nextTrainArrival);
  console.log(minAway);


  $("#train-table > tbody").append("<tr><td>" + fbTrainName + "</td><td>" + fbTrainDest + "</td><td>" + fbTrainFreq + " minutes" + "</td><td>" + nextTrainArrival + "</td><td>" + minAway + "</td><td>");
});

