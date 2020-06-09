//initializing placeholder data for home grid
let placeholderNews = {
    title:   "title1placeholder1", author: "Mr. Author", date: "1969.04.20, 03:59PM",
    content: "contentPlaceholdercontentPlaceholdercontentPlaceholdercontentPlaceholder" +
             "contentPlaceholdercontentPlaceholdercontentPlaceholdercontentPlaceholder" + 
             "contentPlaceholdercontentPlaceholdercontentPlaceholdercontentPlaceholder" +
             "contentPlaceholdercontentPlaceholdercontentPlaceholdercontentPlaceholder" +
             "contentPlaceholdercontentPlaceholdercontentPlaceholdercontentPlaceholder" +
             "contentPlaceholdercontentPlaceholdercontentPlaceholdercontentPlaceholder" }

let news = [placeholderNews, placeholderNews, placeholderNews, placeholderNews, placeholderNews, placeholderNews, placeholderNews, placeholderNews]
let user = { name: "", status: "" }


ShowLogout()
LoadHomePageGrid()

function ShowMyFeed(){
    ResetButtonClass()
    ResetAllElement()
    document.getElementById('myfeed-button').setAttribute('class', 'active');
}

//Homepage grid different data - not finnished
function LoadHomePageGrid() {
    let gridOneTitle = document.querySelector('.oneTitle').innerHTML =  news[0].title;
    let gridTwoTitle = document.querySelector('.twoTitle').innerHTML = news[1].title;
    let gridThreeTitle = document.querySelector('.threeTitle').innerHTML = news[2].title;
    let gridFourTitle = document.querySelector('.fourTitle').innerHTML = news[3].title;
    let gridFiveTitle = document.querySelector('.fiveTitle').innerHTML = news[4].title;
    let gridSixTitle = document.querySelector('.sixTitle').innerHTML = news[5].title;
    let gridSevenTitle = document.querySelector('.sevenTitle').innerHTML = news[6].title;
    let gridEightTitle = document.querySelector('.eightTitle').innerHTML = news[7].title;
    let gridOneContent = document.querySelector('.oneContent').innerHTML = news[0].content
    let gridTwoContent = document.querySelector('.twoContent').innerHTML = news[1].content
    let gridThreeContent = document.querySelector('.threeContent').innerHTML = news[2].content
    let gridFourContent = document.querySelector('.fourContent').innerHTML = news[3].content
    let gridFiveContent = document.querySelector('.fiveContent').innerHTML = news[4].content
    let gridSixContent = document.querySelector('.sixContent').innerHTML = news[5].content
    let gridSevenContent = document.querySelector('.sevenContent').innerHTML = news[6].content
    let gridEightContent = document.querySelector('.eightContent').innerHTML = news[7].content
    document.querySelector('.oneTitle').addEventListener("click", () => { SelectNews() })
    document.querySelector('.twoTitle').addEventListener("click", () => { SelectNews() })
    document.querySelector('.threeTitle').addEventListener("click", () => { SelectNews() })
    document.querySelector('.fourTitle').addEventListener("click", () => { SelectNews() })
    document.querySelector('.fiveTitle').addEventListener("click", () => { SelectNews() })
    document.querySelector('.sixTitle').addEventListener("click", () => { SelectNews() })
    document.querySelector('.sevenTitle').addEventListener("click", () => { SelectNews() })
    document.querySelector('.eightTitle').addEventListener("click", () => { SelectNews() })
}

/* --------------------------Publish View---------------------------------- */
//hides other content and resets the top navbar to better show Publish view
function ShowPublish() {
    ResetButtonClass()
    ResetAllElement()
    document.getElementById('publish-button').setAttribute('class', 'active');
    document.getElementById('publish_table').style.display = "block";
}

//function called by publish button
function PublishArticle() {
    var xhr = new XMLHttpRequest()
    xhr.open('Post', '/News/CreateNews')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                console.log(xhr.responseText)
                document.getElementById("create_schedule_table").style.display = "none";
                //DayTitle(scheduleNumOfDays)// day titles----------------------------------
            }
        }
    };
    var data = new FormData()
    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    data.append('newsTitle', document.getElementById("article-title").value)
    data.append('author', document.getElementById("article-author").value)
    data.append('newsContent', document.getElementById("article-content").value)
    data.append('publishedDate', date.toString())
    xhr.send(data)
    ShowAllNews()
}
/* --------------------------Publish View---------------------------------- */





/* --------------------------Profile View---------------------------------- */
//hides other content and resets the top navbar to better show Profile view
function ShowProfile() {
    if (user.name === "") {
        alert("You need to login first!")
        ShowLogin()
    }
    else {
        ResetButtonClass()
        ResetAllElement()
        document.getElementById('profile-button').setAttribute('class', 'active');
        document.getElementById('profile-table').style.display = "block";
        console.log(user)
        document.getElementById('profile-user').innerHTML = "User name: " + user.name + " | Status: " + user.status;
        if (user.status === "user") {
            document.getElementById('proflie-my-articles-btn').disabled = true;
        }
        else {
            document.getElementById('proflie-my-articles-btn').disabled = false;
        }
    }
}

//function that called by the subscribe button in Profile view
function Subscribe() {
    let selectEl = document.getElementById('author-select');
    let selectedOption = selectEl.options[selectEl.selectedIndex].value
    console.log("Sub " + selectedOption)
    var xhr = new XMLHttpRequest()
    xhr.open('Post', '/News/SubscribeUser')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                console.log("xd");
                if (xhr.responseText === '"NoMoreSubscribe"') {
                    alert("You've reached a limit of six subscribes");
                }
                console.log(xhr.responseText)
            }
            
        }
    };
    
    var data = new FormData()
    data.append("author", selectedOption)
    data.append("subscriber", user.name)
    xhr.send(data)
}
//function that called by the unsubscribe button in Profile view
function UnSubscribe() {
    let selectEl = document.getElementById('author-select');
    let selectedOption = selectEl.options[selectEl.selectedIndex].value
    console.log("Unsub " + selectedOption)
    var xhr = new XMLHttpRequest()
    xhr.open('Post', '/News/UnSubscribeUser')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                console.log("lol")
            }
        }
    };
    var data = new FormData()
    data.append("author", selectedOption)
    data.append("subscriber", user.name)
    xhr.send(data)
}

//function called by the Author "tab" button in profile view
function ProfileAuthors() {
    
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/News/GetAuthors');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                console.log(xhr.responseText)
                let authorSelectEl = document.getElementById('author-select'); 
                let JSONOfAuthors = JSON.parse(xhr.responseText);
                for (var i = 0; i < JSONOfAuthors.length; i++) {
                    if (document.getElementById("author-" + i + 1) == null) {
                        // Does not exists.
                        let authorOptionEl = document.createElement('option');
                        authorOptionEl.setAttribute('id', "author-" + i + 1);
                        authorOptionEl.setAttribute('value', JSONOfAuthors[i]);
                        authorOptionEl.innerHTML = JSONOfAuthors[i];
                        authorSelectEl.appendChild(authorOptionEl);
                    }
                    
                }
            }
        }
    };
    xhr.send();
    document.getElementById('my-news-table').style.display = "none";
    document.getElementById('authors-table').style.display = "block";

}
//function called by the MyArticles "tab" button in profile view - called only with author logged in
function ShowProfilMyArticles() {

    document.getElementById('authors-table').style.display = "none";
    document.getElementById('my-news-table').style.display = "block";  
}
/* --------------------------Profile View---------------------------------- */





/* ---------------------------Home View------------------------------------ */
//hides other content and resets the top navbar to better show Home view
function Home() {
    ResetButtonClass()
    ResetAllElement()
    LoadHomePageGrid()
    document.getElementById('home-button').setAttribute('class', 'active');
    document.getElementById('home-feed').style.display = "grid";
    document.getElementById('home-header').style.display = "block";
}
/* ---------------------------Home View------------------------------------ */





/* -------------------------Register View---------------------------------- */
//hides other content and resets the top navbar to better show Register view
function ShowSignIn() {
    ResetButtonClass()
    ResetAllElement()
    document.getElementById('register-button').setAttribute('class', 'active');
    document.getElementById('register_table').style.display = "block";
}

//writes user to db when user fills out the form and hit register button
function RegisterUser() {
    userName = document.getElementById("user-name-register").value;
    userPass = document.getElementById("user-pass-register").value;
    confirmPass = document.getElementById("user-pass-confirm-register").value
    if (userPass === confirmPass) {
        if (userName === "" || userPass === "") {
            alert("Please fill out the required fields")
        }
        else {
            ShowLogin()
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
    else {
        alert("Passwords need to match")
    }
}
/* -------------------------Register View---------------------------------- */





/* -------------------------Logout Button---------------------------------- */
//Takes the cookie away and sends user back to home page
function ShowLogout() {
    ResetButtonClass()
    ResetAllElement()
    var xhr = new XMLHttpRequest();
    xhr.open('Get', '/Account/Logout');
    console.log('succesful logout')
    xhr.send();
    Home()
    user.name = "";
    user.status = "";
    document.getElementById('user-information').innerHTML = "";
    document.getElementById('logout-button').style.display = "none";
    document.getElementById('login-button').style.display = "block";
    document.getElementById('register-button').style.display = "block";
    document.getElementById('publish-button').style.display = "none";
}
/* -------------------------Logout Button---------------------------------- */





/* --------------------------Login View------------------------------------ */
//hides other content and resets the top navbar to better show Login view
function ShowLogin() {
    ResetButtonClass()
    ResetAllElement()
    document.getElementById('login-button').setAttribute('class', 'active');
    document.getElementById('login_table').style.display = "block";
}

//gives cookie to user when user fills out the form and hit the login button
function LogInUser() {
    userName = document.getElementById("user-name-login").value
    userPass = document.getElementById("user-pass-login").value
   
    if (userName === "" || userPass === "") {
        alert("Please fill out the required fields")
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

                    console.log('succesful login')
                    console.log(xhr.responseText)
                    document.getElementById('login_table').style.display = "none";
                    document.getElementById('login-button').style.display = "none";
                    document.getElementById('register-button').style.display = "none";
                    document.getElementById('logout-button').style.display = "block";
                    document.getElementById('user-information').innerHTML = "Logged in as: " + userName + " (user)";
                    user.name = userName;
                    user.status = "user";
                    Home()
                    if (xhr.responseText == "admin") {
                        console.log(xhr.responseText + "admin")
                        console.log('succesful login as admin')
                        document.getElementById('publish-button').style.display = "block";
                        document.getElementById('user-information').innerHTML = "Logged in as: " + userName + " (author)";
                        user.name = userName;
                        user.status = "author";
                    }

                } else if (status === 500) {
                    // There has been an error with the request!
                    console.log('failed login')
                    document.getElementById('login-status').innerHTML = "Wrong password or username!"
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
/* --------------------------Login View------------------------------------ */





/* --------------------------Today View------------------------------------ */
//hides other content and resets the top navbar to better show Todays News view that only shows article that are posted today
function ShowTodayNews() {
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/News/ShowAllNews')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                ResetButtonClass()
                ResetAllElement()
                document.getElementById('today-news-button').setAttribute('class', 'active');
                let JSONOfNews = JSON.parse(xhr.responseText);
                console.log(xhr.responseText)
                var today = new Date();
                var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                let listNews = [];
                for (var i = 0; i < JSONOfNews.length; i++) {
                    let oneNews = { title: "", author: "", date: "", content: "" }
                    oneNews.author = JSONOfNews[i].newsAuthor;
                    oneNews.content = JSONOfNews[i].newsContent;
                    oneNews.date = JSONOfNews[i].newsPublishedDate;
                    oneNews.title = JSONOfNews[i].newsTitle;
                    if (oneNews.date.toString() === date.toString()) {
                        listNews.push(oneNews)
                    }                   
                }
                ListRenderer(listNews)
            } else if (status === 405) {
                alert("You need to login first!")
                ShowLogin()
            }
        }
    };
    xhr.send()

}
/* --------------------------Today View------------------------------------ */


//called when user selects a news currently placeholder article
function SelectNews() {
    ResetAllElement()
    document.getElementById('one-article_table').style.display = "block"
}


/* -------------------------AllNews View----------------------------------- */
//hides other content and resets the top navbar to better show AllNews view
function ShowAllNews() {
    var xhr = new XMLHttpRequest()
    xhr.open('Get', '/News/ShowAllNews')

    xhr.onreadystatechange = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                ResetButtonClass()
                ResetAllElement()
                document.getElementById('news-button').setAttribute('class', 'active');
                let JSONOfNews = JSON.parse(xhr.responseText);
                console.log(xhr.responseText)
                let listNews = [];
                for (var i = 0; i < JSONOfNews.length; i++) {
                    let oneNews = { title: "", author: "", date: "", content: "" }
                    oneNews.author = JSONOfNews[i].newsAuthor;
                    oneNews.content = JSONOfNews[i].newsContent;
                    oneNews.date = JSONOfNews[i].newsPublishedDate;
                    oneNews.title = JSONOfNews[i].newsTitle;
                    listNews.push(oneNews)
                }
                ListRenderer(listNews)
            } else if (status === 405) {
                alert("You need to login first!")
                ShowLogin()
            }
        }
    };
    xhr.send()  
}
/* -------------------------AllNews View----------------------------------- */





//helpers------------------------------------------------------------------
function ResetButtonClass() {
    document.getElementById('home-button').setAttribute('class', '');
    document.getElementById('news-button').setAttribute('class', '');
    document.getElementById('today-news-button').setAttribute('class', '');
    document.getElementById('profile-button').setAttribute('class', '');
    document.getElementById('login-button').setAttribute('class', '');
    document.getElementById('register-button').setAttribute('class', '');
    document.getElementById('publish-button').setAttribute('class', '');
    document.getElementById('myfeed-button').setAttribute('class', '');
}
function ResetAllElement() {
    ClearList()
    document.getElementById('authors-table').style.display = "none"
    document.getElementById('my-news-table').style.display = "none"  
    document.getElementById('renderNewsList').style.display = "none"
    document.getElementById('one-article_table').style.display = "none"
    document.getElementById("user-name-register").value = ""
    document.getElementById("user-pass-register").value = ""
    document.getElementById("user-pass-confirm-register").value = ""
    document.getElementById("user-name-login").value = ""
    document.getElementById("user-pass-login").value = ""
    document.getElementById('login-status').innerHTML = "Fill in the required fields"
    document.getElementById('home-feed').style.display = "none";
    document.getElementById('home-header').style.display = "none";
    document.getElementById('login_table').style.display = "none";
    document.getElementById('register_table').style.display = "none";
    document.getElementById('publish_table').style.display = "none"; //
    document.getElementById('profile-table').style.display = "none";

}

//renders a list of something in a css styled manner
function ListRenderer(list) {
    document.getElementById('renderNewsList').style.display = "block"
    let ulElRederList = document.createElement('ul');
    ulElRederList.setAttribute('id', 'newsList');
    document.getElementById('renderNewsList').appendChild(ulElRederList);
    list.forEach(RenderNewsList);

    function RenderNewsList(element, index, arr) {
        let liElTitle = document.createElement('li');
        liElTitle.setAttribute('id', 'news-title');
        liElTitle.addEventListener("click", () => { SelectNews() }) //add element to know which list element is being clicked
        ulElRederList.appendChild(liElTitle);
        let pElContent = document.createElement('p');
        pElContent.setAttribute('id', 'news-content');
        liElTitle.innerHTML = liElTitle.innerHTML + element.title;
        pElContent.innerHTML = pElContent.innerHTML + element.content;
        ulElRederList.appendChild(pElContent);
        let pElDate = document.createElement('h1');
        pElDate.setAttribute('id', 'news-date');
        pElDate.innerHTML = pElDate.innerHTML + element.date;
        liElTitle.appendChild(pElDate)
    }
}
//function for clearing rendered list called in functions that shows different content
function ClearList() {
    let node = document.getElementById("renderNewsList");
    node.querySelectorAll('*').forEach(n => n.remove());
}
