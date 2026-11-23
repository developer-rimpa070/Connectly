
/* =========================
   CONNECTLY AUTHENTICATION
   JAVASCRIPT
========================= */

// LOGIN TO SIGNUP

function showSignup() {
    document.getElementById("loginPage").classList.remove("active");

    document.getElementById("signupPage").classList.add("active");
}


// SIGNUP TO LOGIN

function showLogin() {
    document.getElementById("signupPage").classList.remove("active");

    document.getElementById("loginPage").classList.add("active");
}


// SHOW / HIDE PASSWORD

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }
}


// LOGIN FORM

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {

        alert("Please fill in all fields.");

        return;

    }

    // DEMO LOGIN - OPEN CONNECTLY

document.querySelector(".auth-container").style.display = "none";

const userPages = document.querySelector(".user-pages");

userPages.style.display = "block";

// Open Home Page
document.querySelectorAll(".user-page").forEach(page => {
    page.classList.remove("active");
});

const homePage = document.getElementById("homePage");

if (homePage) {
    homePage.classList.add("active");
} else {
    document.getElementById("profile").classList.add("active");
}
});


// SIGNUP FORM

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();

    const username = document.getElementById("signupUsername").value.trim();

    const email = document.getElementById("signupEmail").value.trim();

    const password = document.getElementById("signupPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;


    // EMPTY FIELD CHECK

    if (!name || !username || !email || !password || !confirmPassword) {

        alert("Please fill in all fields.");

        return;

    }


    // PASSWORD CHECK

    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }


    // PASSWORD LENGTH CHECK

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }


    alert("Signup interface is working! Backend connection is required for real account creation.");

});

/* =================================
   CONNECTLY - PART 4
   JAVASCRIPT FUNCTIONALITY
================================= */


// 1. EDIT PROFILE

const profileDetails = document.querySelector(".profile-details");

if (profileDetails) {

    const profileName = profileDetails.querySelector("h2");
    const profileUsername = profileDetails.querySelector(".profile-username");
    const profileBio = profileDetails.querySelector(".profile-bio");

    const editProfileBtn = document.createElement("button");

    editProfileBtn.textContent = "Edit Profile";
    editProfileBtn.className = "edit-profile-btn";

    profileDetails.appendChild(editProfileBtn);

    editProfileBtn.addEventListener("click", function () {

        const newName = prompt("Enter your name:", profileName.textContent);

        if (newName === null) return;

        const newUsername = prompt(
            "Enter your username:",
            profileUsername.textContent.replace("@", "")
        );

        if (newUsername === null) return;

        const newBio = prompt("Enter your bio:", profileBio.textContent.trim());

        if (newBio === null) return;

        if (!newName.trim() || !newUsername.trim()) {
            alert("Name and username cannot be empty!");
            return;
        }

        profileName.textContent = newName.trim();
        profileUsername.textContent = "@" + newUsername.trim();
        profileBio.textContent = newBio.trim();

        alert("Profile updated successfully!");

    });

}


// 2. DARK / LIGHT MODE

const userHeader = document.querySelector(".user-header");

if (userHeader) {

    const themeBtn = document.createElement("button");

    themeBtn.textContent = "☀️ Light Mode";
    themeBtn.className = "theme-toggle-btn";

    userHeader.appendChild(themeBtn);

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.textContent = "🌙 Dark Mode";
        } else {
            themeBtn.textContent = "☀️ Light Mode";
        }

    });

}


// LIGHT MODE DESIGN

const themeStyle = document.createElement("style");

themeStyle.textContent = `

body.light-mode {
    background: #f5f5f7 !important;
    color: #222 !important;
}

body.light-mode .user-pages {
    background: #f5f5f7 !important;
    color: #222 !important;
}

body.light-mode .user-header,
body.light-mode .profile-card,
body.light-mode .explore-card,
body.light-mode .settings-card,
body.light-mode .chat-list,
body.light-mode .chat-interface {
    background: #ffffff !important;
    color: #222 !important;
}

body.light-mode .user-page h1,
body.light-mode .user-page h2,
body.light-mode .user-page h3,
body.light-mode .user-page p {
    color: #222;
}

body.light-mode .settings-item {
    border-color: #ddd;
}

`;

document.head.appendChild(themeStyle);


// 3. FOLLOW / UNFOLLOW

const followButtons = document.querySelectorAll(".follow-btn");

followButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (button.textContent.trim() === "Follow") {

            button.textContent = "Following";
            button.classList.add("following");

        } else {

            button.textContent = "Follow";
            button.classList.remove("following");

        }

    });

});


console.log("CONNECTLY Part 4 Loaded Successfully!");

/* =================================
   CONNECTLY - PART 5
   HOME FEED JAVASCRIPT
================================= */

// GET HTML ELEMENTS

const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const publishPostBtn = document.getElementById("publishPostBtn");
const postsContainer = document.getElementById("postsContainer");
const imagePreview = document.getElementById("imagePreview");

let selectedImageURL = null;


// 1. IMAGE UPLOAD & PREVIEW

if (postImage) {

    postImage.addEventListener("change", function () {

        const file = postImage.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image!");
            postImage.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be smaller than 5MB!");
            postImage.value = "";
            return;
        }

        if (selectedImageURL) {
            URL.revokeObjectURL(selectedImageURL);
        }

        selectedImageURL = URL.createObjectURL(file);

        imagePreview.innerHTML = "";

        const preview = document.createElement("img");

        preview.src = selectedImageURL;
        preview.alt = "Image Preview";

        imagePreview.appendChild(preview);

    });

}


// 2. PUBLISH POST

if (publishPostBtn) {

    publishPostBtn.addEventListener("click", function () {

        const text = postText.value.trim();

        if (text === "" && !selectedImageURL) {
            alert("Please write something or select an image!");
            return;
        }

        createPost(text, selectedImageURL);

        postText.value = "";
        postImage.value = "";
        imagePreview.innerHTML = "";

        selectedImageURL = null;

        alert("Your post has been published!");

    });

}


// 3. CREATE POST FUNCTION

function createPost(text, imageURL) {

    const postCard = document.createElement("div");

    postCard.className = "connectly-post-card";

    // POST HEADER

    const postHeader = document.createElement("div");

    postHeader.className = "connectly-post-header";

    const userInfo = document.createElement("div");

    userInfo.className = "connectly-post-user";

    const avatar = document.createElement("div");

    avatar.className = "user-avatar";
    avatar.textContent = "U";

    const userName = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = "Your Name";

    const username = document.createElement("p");
    username.textContent = "@username";

    userName.appendChild(name);
    userName.appendChild(username);

    userInfo.appendChild(avatar);
    userInfo.appendChild(userName);

    const deleteBtn = document.createElement("button");

    deleteBtn.className = "delete-post-btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    postHeader.appendChild(userInfo);
    postHeader.appendChild(deleteBtn);

    // POST CONTENT

    const postContent = document.createElement("div");

    postContent.className = "connectly-post-content";

    if (text) {

        const postParagraph = document.createElement("p");

        postParagraph.textContent = text;

        postContent.appendChild(postParagraph);

    }

    if (imageURL) {

        const postPhoto = document.createElement("img");

        postPhoto.src = imageURL;
        postPhoto.alt = "Post Image";

        postPhoto.className = "connectly-post-image";

        postContent.appendChild(postPhoto);

    }

    // POST ACTIONS

    const postActions = document.createElement("div");

    postActions.className = "connectly-post-actions";

    const likeBtn = document.createElement("button");

    likeBtn.className = "like-post-btn";
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i> <span>Like</span> <b>0</b>';

    const commentBtn = document.createElement("button");

    commentBtn.className = "comment-post-btn";
    commentBtn.innerHTML = '<i class="fa-regular fa-comment"></i> Comment';

    postActions.appendChild(likeBtn);
    postActions.appendChild(commentBtn);

    // COMMENTS AREA

    const commentsArea = document.createElement("div");

    commentsArea.className = "post-comments";

    // ADD ALL ELEMENTS

    postCard.appendChild(postHeader);
    postCard.appendChild(postContent);
    postCard.appendChild(postActions);
    postCard.appendChild(commentsArea);

    postsContainer.prepend(postCard);


    // 4. LIKE / UNLIKE

    let liked = false;
    let likeCount = 0;

    likeBtn.addEventListener("click", function () {

        liked = !liked;

        if (liked) {
            likeCount++;
            likeBtn.classList.add("liked");
            likeBtn.querySelector("i").className = "fa-solid fa-heart";
        } else {
            likeCount--;
            likeBtn.classList.remove("liked");
            likeBtn.querySelector("i").className = "fa-regular fa-heart";
        }

        likeBtn.querySelector("b").textContent = likeCount;

    });


    // 5. ADD COMMENT

    commentBtn.addEventListener("click", function () {

        const comment = prompt("Write your comment:");

        if (!comment || !comment.trim()) return;

        const commentItem = document.createElement("p");

        commentItem.className = "post-comment-item";

        commentItem.textContent = "You: " + comment.trim();

        commentsArea.appendChild(commentItem);

    });


    // 6. DELETE POST

    deleteBtn.addEventListener("click", function () {

        const confirmDelete = confirm("Are you sure you want to delete this post?");

        if (!confirmDelete) return;

        if (imageURL) {
            URL.revokeObjectURL(imageURL);
        }

        postCard.remove();

    });

}

console.log("CONNECTLY Part 5 Loaded Successfully!");

/* =================================
   CONNECTLY PART 6
   MESSAGE SENDING
================================= */

const chatInput = document.querySelector(
    ".chat-input-area input"
);

const sendMessageBtn = document.querySelector(
    ".chat-input-area button"
);

const chatMessages = document.querySelector(
    ".chat-messages"
);


// SEND MESSAGE FUNCTION

function sendConnectlyMessage() {

    const messageText = chatInput.value.trim();

    if (messageText === "") {
        return;
    }

    // CREATE MESSAGE

    const message = document.createElement("div");

    message.className = "message sent";

    const messageContent = document.createElement("div");

    messageContent.className = "message-content";

    const paragraph = document.createElement("p");

    paragraph.textContent = messageText;

    const time = document.createElement("span");

    time.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    // ADD CONTENT

    messageContent.appendChild(paragraph);
    messageContent.appendChild(time);

    message.appendChild(messageContent);

    chatMessages.appendChild(message);

    // CLEAR INPUT

    chatInput.value = "";

    // SCROLL TO NEW MESSAGE

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


// BUTTON CLICK

if (sendMessageBtn && chatInput && chatMessages) {

    sendMessageBtn.addEventListener(
        "click",
        sendConnectlyMessage
    );

    // ENTER KEY

    chatInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendConnectlyMessage();

        }

    });

}

console.log("CONNECTLY Messaging Loaded!");

/* =========================
   CONNECTLY PAGE NAVIGATION
========================= */

const navigationLinks = document.querySelectorAll(
    ".user-navigation a"
);

const allUserPages = document.querySelectorAll(
    ".user-pages .user-page"
);

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const targetId = link.getAttribute("href").substring(1);

        const targetPage = document.getElementById(targetId);

        if (!targetPage) return;

        allUserPages.forEach(function(page) {
            page.classList.remove("active");
        });

        targetPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

console.log("CONNECTLY Navigation Fixed!");
