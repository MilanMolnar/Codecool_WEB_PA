let userName;
let userPass;

let scheduleTitle;
let scheduleNumOfDays;

scheduleList = ['schedule_01', 'schedule_02', 'schedule_03', 'schedule_04', 'schedule_05', 'schedule_06', 'schedule_07', 'schedule_08', 'schedule_09'];

/* ----- Deleting all cookies when the page is loading ----- */
function deleteAllCookies() {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Account/Logout');
    xhr.send();
}


/* -----  register function starts when clicking register button -----  */
function register() {
    userName = document.getElementById("user-name").value;
    userPass = document.getElementById("user-pass").value;
    if (userName === "" || userPass === "") {
        alert("Please fill out the required fields")
        if (userName === "") {
            document.getElementById("required-username").style.display = "block";
        }
        else {
            document.getElementById("required-username").style.display = "none";
        }
        if (userPass === "") {
            document.getElementById("required-password").style.display = "block";
        }
        else {
            document.getElementById("required-password").style.display = "none";
        }
    }
    else {
        document.getElementById("register_table").style.display = "none"
        userDetais = userPass + ", " + userName;
        document.getElementById("profile_details").style.display = "block";
        document.getElementById("user_details").innerText = userDetais;
    }
    function reqListener() {
        console.log(this.responseText);
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener)
    xhr.open('Post', '/Account/Register');

    var data = new FormData();
    data.append('username', userName);
    data.append('password', userPass);
    xhr.send(data);
}
/* -----  register function ends -----  */


/* -----  login function starts when clicking log in button -----  */
function login() {
    userName = document.getElementById("user-name-login").value
    userPass = document.getElementById("user-pass-login").value

    if (userName === "" || userPass === "") {

        alert("Please fill out the required fields")
        if (userName === "") {
            document.getElementById("required-username-login").style.display = "block";
        }
        else {
            document.getElementById("required-username-login").style.display = "none";
        }
        if (userPass === "") {
            document.getElementById("required-password-login").style.display = "block";
        }
        else {
            document.getElementById("required-password-login").style.display = "none";
        }
    }
    else {
        // New POST request to controller
        var xhr = new XMLHttpRequest()
        xhr.open('Post', '/Account/Login')

        xhr.onreadystatechange = function () {
            // In local files, status is 0 upon success in Mozilla Firefox
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    console.log(xhr.responseText)
                    userDetais = "Username: " + userName + ", Userpassword: " + userPass
                    document.getElementById("login_table").style.display = "none"
                    document.getElementById("profile_details").style.display = "block"
                    document.getElementById("user_details").innerText = userDetais
                    document.getElementById("login-button").style.display = "none"
                    document.getElementById("registration-button").style.display = "none"
                    document.getElementById("logout-button").style.display = "block"

                    if (xhr.responseText == "admin") {
                        document.getElementById("adminlog-button").style.display = "block"
                    }

                } else if(status === 500) {
                    // There has been an error with the request!
                    console.log('failed login')
                    let failedlogin = document.getElementById('failed-login')
                    failedlogin.innerText = "Invalid. Please try again."
                    failedlogin.style.display = "block"
                }
            }
        };
        // Sending login details to controller 
        var data = new FormData()
        data.append('username', userName)
        data.append('password', userPass)
        xhr.send(data)
    }
}
/* -----  log in function ends -----  */


/* -----  logout function starts when clicking logout button -----  */
function logout() {
    clearList()
    document.getElementById("profile_details").style.display = "none"
    document.getElementById("create_schedule_table").style.display = "none"
    document.getElementById("adminlog-button").style.display = "none"
    document.getElementById("register_table").style.display = "none"
    document.getElementById("login_table").style.display = "none"
    document.getElementById("home_view").style.display = "block"
    document.getElementById("logout-button").style.display = "none"
    document.getElementById("login-button").style.display = "block"
    document.getElementById("registration-button").style.display = "block"
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Account/Logout');
    xhr.send();
}
/* -----  log out function ends -----  */


/* -----  showregister function starts, register view on page -----  */
function showRegister() {
    clearList()
    document.getElementById("profile_details").style.display = "none"
    document.getElementById("home_view").style.display = "none"
    document.getElementById("register_table").style.display = "block"
    document.getElementById("login_table").style.display = "none"
    document.getElementById("register-button").style.display = "block"
    document.getElementById("create_schedule_table").style.display = "none"
}
/* -----  showregister function ends -----  */


/* -----  showLogin function starts, login view on page -----  */
function showLogin() {
    clearList()
    document.getElementById("profile_details").style.display = "none"
    document.getElementById("home_view").style.display = "none"
    document.getElementById("register_table").style.display = "none"
    document.getElementById("login_table").style.display = "block"
    document.getElementById("login-button").style.display = "block"
    document.getElementById("create_schedule_table").style.display = "none"
}
/* -----  showLogin function ends -----  */


/* -----  showHome function starts, home view on page -----  */
function showHome() {
    clearList()
    document.getElementById("profile_details").style.display = "none"
    document.getElementById("home_view").style.display = "block"
    document.getElementById("register_table").style.display = "none"
    document.getElementById("login_table").style.display = "none"
    document.getElementById("create_schedule_table").style.display = "none"
}
/* -----  showHome function ends -----  */


/* -----  showSheduleCreate function starts, schedule create view on page -----  */
function showSheduleCreate() {
    clearList()
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Schedule/ShowScheduleCreate')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                document.getElementById("profile_details").style.display = "none"
                document.getElementById("home_view").style.display = "none"
                document.getElementById("register_table").style.display = "none"
                document.getElementById("login_table").style.display = "none"
                document.getElementById("create_schedule_table").style.display = "block"
            } else if (status === 405) {
                alert("You need to login first!")
                document.getElementById("profile_details").style.display = "none"
                document.getElementById("home_view").style.display = "none"
                document.getElementById("register_table").style.display = "none"
                document.getElementById("login_table").style.display = "block"
                document.getElementById("create_schedule_table").style.display = "none"
            }
        }
    };
    xhr.send()
}
/* -----  showSheduleCreate function ends -----  */


/* -----  createShedule function starts -----  */
function createShedule() {
    clearList()
    scheduleTitle = document.getElementById("schedule-title").value;
    scheduleNumOfDays = document.getElementById("schedule-days").value;
    if (scheduleTitle === "" || scheduleNumOfDays === "") {
        alert("Please fill out the required fields")
        if (scheduleTitle === "") {
            document.getElementById("required-schedule-title").style.display = "block";
        }
        else {
            document.getElementById("required-schedule-title").style.display = "none";
        }
        if (scheduleNumOfDays === "") {
            document.getElementById("required-schedule-days").style.display = "block";
        }
        else {
            document.getElementById("required-schedule-days").style.display = "none";
        }
    } else {
        // New POST request to controller
        var xhr = new XMLHttpRequest()
        xhr.open('Post', '/Schedule/CreateSchedule')

        xhr.onreadystatechange = function () {
            // In local files, status is 0 upon success in Mozilla Firefox
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status
                if (status === 0 || (status >= 200 && status < 400)) {
                    // The request has been completed successfully
                    console.log(xhr.responseText)
                    document.getElementById("create_schedule_table").style.display = "none";
                    document.getElementById("home_view").style.display = "block"; // my schedules view !!!!!!!!!!
                } 
            }
        };
        // Sending schedule details to controller
        var data = new FormData()
        data.append('scheduleTitle', scheduleTitle)
        data.append('scheduleNumOfDays', scheduleNumOfDays)
        xhr.send(data)
    }
}
/* -----  createShedule function ends -----  */

/* -----  showMySchedules function starts, schedule create view on page -----  */
function showMySchedules() {
    document.getElementById("create_schedule_table").style.display = "none"
    clearList()
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Schedule/ShowMySchedules')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {

                let JSONOfSchedules = JSON.parse(xhr.responseText);

                let listOfSchedules = []; 
                for (var i = 0; i < JSONOfSchedules.length; i++) {
                    let scheduleItem = "ID: " + JSONOfSchedules[i].userID + ") " + JSONOfSchedules[i].title
                    listOfSchedules.push(scheduleItem)
                }
                // The request has been completed successfully
                document.getElementById("register_table").style.display = "none"
                document.getElementById("profile_details").style.display = "none"
                document.getElementById("login_table").style.display = "none"
                document.getElementById("home_view").style.display = "none"
                listRenderer(listOfSchedules);
                console.log(xhr.responseText)
            /*DOM IDE*/
                

            } else if (status === 405) {
                alert("You need to login first!")
                document.getElementById("profile_details").style.display = "none"
                document.getElementById("home_view").style.display = "none"
                document.getElementById("register_table").style.display = "none"
                document.getElementById("login_table").style.display = "block"
                document.getElementById("create_schedule_table").style.display = "none"
            }
        }
    };
    xhr.send()
}

function showAllSchedule() {
    document.getElementById("create_schedule_table").style.display = "none"
    clearList()
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Schedule/ShowAllSchedules')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                document.getElementById("register_table").style.display = "none"
                document.getElementById("profile_details").style.display = "none"
                document.getElementById("login_table").style.display = "none"
                document.getElementById("home_view").style.display = "none"
                let JSONOfSchedules = JSON.parse(xhr.responseText);

                let listOfSchedules = [];
                for (var i = 0; i < JSONOfSchedules.length; i++) {
                    let scheduleItem = "ID: " + JSONOfSchedules[i].userID + ") " + JSONOfSchedules[i].title
                    listOfSchedules.push(scheduleItem)
                }
                listRenderer(listOfSchedules);
            /*DOM IDE*/
                console.log(xhr.responseText)

            } else if (status === 405) {
                document.getElementById("home_view").style.display = "none"
                document.getElementById("register_table").style.display = "none"
                document.getElementById("profile_details").style.display = "none"
                document.getElementById("login_table").style.display = "none"
                listRenderer(scheduleList);
            }
        }
    };
    xhr.send()

}
function selectSchedule(element) {
    var xhr = new XMLHttpRequest()
    xhr.open('Post', '/Schedule/SelectSchedule')
    var data = new FormData()
    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            data.append('Title', element)
            console.log(element)
            //xhr.responseText DOM DISPLAY FROM THESE INFORMS-----------------------------------------------!!!
        }
    };
    xhr.send(data)
}
function listRendererActivities(list) {
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'actList');
    document.getElementById('renderList').appendChild(ul);
    list.forEach(renderScheduleList);

    function renderScheduleList(element, index, arr) {
        let li = document.createElement('li');
        li.setAttribute('id', 'activity-item');
        ul.appendChild(li);

        li.innerHTML = li.innerHTML + element;
    }
}


function listRenderer(list) {
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'schList');
    document.getElementById('renderList').appendChild(ul);
    list.forEach(renderScheduleList);

    function renderScheduleList(element, index, arr) {
        let li = document.createElement('li');
        li.setAttribute('id', 'shedule-item');
        li.addEventListener("click", () => { selectSchedule(element) })
        ul.appendChild(li);

        li.innerHTML = li.innerHTML + element;
    }
}
function clearList() {
    let node = document.getElementById("renderList");
    node.querySelectorAll('*').forEach(n => n.remove());
}

/* -----  showMySchedules function ends -----  */


/* -----  showAdminLog function starts -----  */
function showAdminLog() {

    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/Admin/ShowUserActivities')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                clearList()
                document.getElementById("profile_details").style.display = "none"
                document.getElementById("home_view").style.display = "none"
                document.getElementById("register_table").style.display = "none"
                document.getElementById("login_table").style.display = "none"
                document.getElementById("login-button").style.display = "none"
                document.getElementById("create_schedule_table").style.display = "none"
                document.getElementById("admin_table").style.display = "block"

                console.log(xhr.responseText)
                let JSONOfActivities = JSON.parse(xhr.responseText);

                let listOfActivities = [];
                for (var i = 0; i < JSONOfActivities.length; i++) {
                    let activity = "ID: " + JSONOfActivities[i].userID + ") " + JSONOfActivities[i].activity
                    listOfActivities.push(activity)
                    
                }
                listRendererActivities(listOfActivities);
            } 
        }
    };
    xhr.send()
}
/* -----  showAdminLog function ends -----  */