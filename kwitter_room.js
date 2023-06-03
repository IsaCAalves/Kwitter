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

 document.getElementById("user_name").innerHTML = "Bem-vindo(a), " + user_name + "!";

 function addRoom()
 {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adicionando nome da sala"
    });

      localStorage.setItem("room_name", room_name);

      window.location = "kwitter_page.html";
 }

 function getData() { firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerhtml = "";
snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
    Room_names = childKey;
    console.log("Nome da sala: " + Room_names);
    row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
    document.getElementById("output").innerHTML +=row;
  });
});

}

getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function lougout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}