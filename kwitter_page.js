const firebaseConfig = {
    apiKey: "AIzaSyCJNotQvJkiE021KWa7GayA9-91mNUyYlA",
    authDomain: "kwitter-fd64e.firebaseapp.com",
    databaseURL: "https://kwitter-fd64e-default-rtdb.firebaseio.com",
    projectId: "kwitter-fd64e",
    storageBucket: "kwitter-fd64e.appspot.com",
    messagingSenderId: "350495824377",
    appId: "1:350495824377:web:ef3a82b7f5dfaf8626c528",
    measurementId: "G-J3QVTKTFGS"
  };

  firebase.initializeApp(firebaseConfig); 

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function send()
  {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });

    document.getElementById("msg").value = "";
  }

function getData() {firebase.database().ref("/"+room_name).on('value', function(snapshot) {  document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.
key; childData = childSnapshot.val(); if(childKey !="purpose") {
  firebase_message_id = childKey;
  message_data = childData;
  console.log(firebase_message_id);
  console.log(message_data);
  name = message_data['name'];
  message = message_data['message'];
  like = message_data['like'];
  name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
  message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
  like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
  span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: "+ like +"</span></button><hr>";

  row = name_with_tag + message_with_tag +like_button + span_with_tag;
  document.getElementById("output").innerHTML += row;
   } });  }); }

   getData();

   function updateLike(message_id)
   {
    console.log("clicou no botão curtir - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_like = Number(likes) + 1;
    console.log(updated_like);

    firebase.database().ref(room_name).child(message_id).update({
      like: updated_like
    });


   }

   function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
   }
   


