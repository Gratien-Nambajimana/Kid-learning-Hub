// =========================================
// KIDS LEARNING HUB
// PART 1
// =========================================



// ----------------------
// LIVE CLOCK
// ----------------------

function liveClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
    now.toLocaleTimeString();

}

setInterval(liveClock,1000);



// ----------------------
// REGISTER USER
// ----------------------

function registerUser(){

    let fullname =
    document.getElementById("fullname").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value;

    let age =
    document.getElementById("age").value;



    if(fullname=="" ||
       email=="" ||
       password=="" ||
       age==""){

        alert("Please complete all fields.");

        return false;

    }



    let users =
    JSON.parse(localStorage.getItem("users")) || [];



    for(let i=0;i<users.length;i++){

        if(users[i].email===email){

            alert("Email already registered.");

            return false;

        }

    }



    users.push({

        fullname:fullname,

        email:email,

        password:password,

        age:age

    });



    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );



    alert("Registration Successful!");



    window.location.href="login.html";



    return false;

}





// ----------------------
// USER LOGIN
// ----------------------

function userLogin(){

    let email =
    document.getElementById("userEmail").value.trim();

    let password =
    document.getElementById("userPassword").value;



    if(email=="" || password==""){

        alert("Please enter email and password.");

        return;

    }



    let users =
    JSON.parse(localStorage.getItem("users")) || [];



    let found=false;



    for(let i=0;i<users.length;i++){

        if(users[i].email===email &&
           users[i].password===password){

            found=true;

            localStorage.setItem(

                "loggedUser",

                JSON.stringify(users[i])

            );

            break;

        }

    }



    if(found){

        alert("Login Successful!");

        window.location.href="courses.html";

    }

    else{

        alert("Incorrect Email or Password.");

    }

}





// ----------------------
// ADMIN LOGIN
// ----------------------

function adminLogin(){

    let username =
    document.getElementById("adminUser").value;

    let password =
    document.getElementById("adminPass").value;



    if(username=="admin" &&
       password=="admin123"){

        localStorage.setItem(

            "admin",

            "true"

        );



        alert("Welcome Admin!");



        window.location.href="admin.html";

    }

    else{

        alert("Incorrect Admin Username or Password.");

    }

}





// ----------------------
// LOGOUT
// ----------------------

function logout(){

    localStorage.removeItem("loggedUser");

    localStorage.removeItem("admin");



    alert("Logged Out Successfully.");



    window.location.href="login.html";

}





// ----------------------
// CHECK USER LOGIN
// ----------------------

function checkUser(){



    if(window.location.pathname.includes("courses.html")){



        let user=

        localStorage.getItem("loggedUser");



        if(user==null){

            alert("Please login first.");

            window.location.href="login.html";

        }

    }

}





// ----------------------
// CHECK ADMIN LOGIN
// ----------------------

function checkAdmin(){



    if(window.location.pathname.includes("admin.html")){



        let admin=

        localStorage.getItem("admin");



        if(admin!="true"){

            alert("Admin Login Required.");

            window.location.href="login.html";

        }

    }

}





// ----------------------
// SHOW USER NAME
// ----------------------

function welcomeUser(){



    let user=

    JSON.parse(

        localStorage.getItem("loggedUser")

    );



    if(user!=null){

        let welcome=

        document.getElementById("welcome");



        if(welcome!=null){

            welcome.innerHTML=

            "Welcome, "+user.fullname;

        }

    }

}





// ----------------------
// PAGE LOAD
// ----------------------

window.onload=function(){

    liveClock();

    checkUser();

    checkAdmin();

    welcomeUser();

    displayVideos();

    updateDashboard();

    displayAnnouncements();

}//==================================
// VIDEO UPLOAD
//==================================

function uploadVideo(){

    let title =
    document.getElementById("videoTitle").value.trim();

    let category =
    document.getElementById("videoCategory").value;

    let description =
    document.getElementById("videoDescription").value.trim();

    if(title=="" || description==""){

        alert("Please complete all fields.");

        return false;

    }

    let videos =
    JSON.parse(localStorage.getItem("videos")) || [];

    videos.push({

        title:title,

        category:category,

        description:description

    });

    localStorage.setItem(

        "videos",

        JSON.stringify(videos)

    );

    alert("Video Uploaded Successfully!");

    displayVideos();

    document.getElementById("videoTitle").value="";

    document.getElementById("videoDescription").value="";

    return false;

}



//==================================
// DISPLAY VIDEOS
//==================================

function displayVideos(){

    let table =
    document.getElementById("videoTable");

    if(table==null){

        return;

    }

    table.innerHTML="";

    let videos =
    JSON.parse(localStorage.getItem("videos")) || [];

    for(let i=0;i<videos.length;i++){

        table.innerHTML +=

        "<tr>"+

        "<td>"+videos[i].title+"</td>"+

        "<td>"+videos[i].category+"</td>"+

        "<td>"+videos[i].description+"</td>"+

        "</tr>";

    }

}function postAnnouncement(){

    let title =
    document.getElementById("announcementTitle").value.trim();

    let message =
    document.getElementById("announcementMessage").value.trim();

    if(title=="" || message==""){

        alert("Please fill all announcement fields.");

        return false;
    }

    let announcements =
    JSON.parse(localStorage.getItem("announcements")) || [];

    announcements.push({

        title:title,
        message:message,
        date:new Date().toLocaleString()

    });

    localStorage.setItem(
        "announcements",
        JSON.stringify(announcements)
    );

    alert("Announcement Posted!");

    displayAnnouncements();

    document.getElementById("announcementTitle").value="";
    document.getElementById("announcementMessage").value="";

    return false;
}function displayAnnouncements(){

    let container =
    document.getElementById("announcementList");

    if(!container) return;

    let announcements =
    JSON.parse(localStorage.getItem("announcements")) || [];

    container.innerHTML = "";

    for(let i=0;i<announcements.length;i++){

        container.innerHTML +=

        "<div style='background:white;padding:10px;margin:10px;border-radius:8px;'>" +

        "<h3>" + announcements[i].title + "</h3>" +

        "<p>" + announcements[i].message + "</p>" +

        "<small>" + announcements[i].date + "</small><br><br>" +

        "<button onclick='deleteAnnouncement(" + i + ")'>Delete</button>" +

        "</div>";
    }
}function deleteAnnouncement(index){

    let announcements =
    JSON.parse(localStorage.getItem("announcements")) || [];

    let confirmDelete =
    confirm("Delete this announcement?");

    if(confirmDelete){

        announcements.splice(index,1);

        localStorage.setItem(
            "announcements",
            JSON.stringify(announcements)
        );

        displayAnnouncements();

        alert("Deleted!");
    }
}