
// ===================================
// CONNÈCTLY - JAVASCRIPT PART 1
// LIKE & SAVE SYSTEM
// ===================================

// Select all post cards
const postCards = document.querySelectorAll(".post-card");

// LIKE SYSTEM
postCards.forEach((post) => {

    const likeButton = post.querySelector(".like-btn");
    const likeCount = post.querySelector(".like-count");

    if (likeButton && likeCount) {

        likeButton.addEventListener("click", () => {

            const isLiked = likeButton.classList.toggle("liked");

            let count = Number(likeCount.textContent);

            if (isLiked) {
                count++;
                likeButton.innerHTML =
                    '<i class="fa-solid fa-heart"></i> Liked';
            } else {
                count--;
                likeButton.innerHTML =
                    '<i class="fa-regular fa-heart"></i> Like';
            }

            likeCount.textContent = count;
        });
    }

    // SAVE SYSTEM
    const saveButton = post.querySelector(".save-btn");

    if (saveButton) {

        saveButton.addEventListener("click", () => {

            const isSaved = saveButton.classList.toggle("saved");

            if (isSaved) {
                saveButton.innerHTML =
                    '<i class="fa-solid fa-bookmark"></i> Saved';
            } else {
                saveButton.innerHTML =
                    '<i class="fa-regular fa-bookmark"></i> Save';
            }

        });
    }

});



/* =================================
   CONNÈCTLY - PART 2
   CREATE NEW POST
================================= */

const postInput = document.querySelector(".post-input");
const postSubmit = document.querySelector(".post-submit-btn");
const feedSection = document.querySelector(".feed-section");

if (postInput && postSubmit && feedSection) {

    postSubmit.addEventListener("click", () => {

        const text = postInput.value.trim();

        if (text === "") {
            alert("Please write something first!");
            return;
        }

        const newPost = document.createElement("article");
        newPost.className = "post-card";

        const postHeader = document.createElement("div");
        postHeader.className = "post-header";

        const postUser = document.createElement("div");
        postUser.className = "post-user";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/100?img=47";
        avatar.alt = "Your profile";

        const userInfo = document.createElement("div");
        userInfo.innerHTML = `
            <h4>Your Name</h4>
            <span>Just now</span>
        `;

        postUser.append(avatar, userInfo);
        postHeader.append(postUser);

        const caption = document.createElement("p");
        caption.className = "post-caption";
        caption.textContent = text;

        const stats = document.createElement("div");
        stats.className = "post-stats";
        stats.innerHTML = `
            <span><span class="like-count">0</span> likes</span>
            <span>0 comments · 0 shares</span>
        `;

        const buttons = document.createElement("div");
        buttons.className = "post-buttons";

        buttons.innerHTML = `
            <button class="like-btn">
                <i class="fa-regular fa-heart"></i>
                Like
            </button>

            <button>
                <i class="fa-regular fa-comment"></i>
                Comment
            </button>

            <button>
                <i class="fa-solid fa-share"></i>
                Share
            </button>

            <button class="save-btn">
                <i class="fa-regular fa-bookmark"></i>
            </button>
        `;

        newPost.append(postHeader, caption, stats, buttons);

        feedSection.insertBefore(
            newPost,
            feedSection.querySelector(".post-card")
        );

        // Activate Like for the new post
        const newLikeButton = newPost.querySelector(".like-btn");
        const newLikeCount = newPost.querySelector(".like-count");

        newLikeButton.addEventListener("click", () => {
            const liked = newLikeButton.classList.toggle("liked");
            const icon = newLikeButton.querySelector("i");

            let count = Number(newLikeCount.textContent);
            newLikeCount.textContent = liked ? count + 1 : count - 1;

            icon.className = liked
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart";

            newLikeButton.style.color = liked ? "#E879B0" : "";
        });

        // Activate Save for the new post
        const newSaveButton = newPost.querySelector(".save-btn");

        newSaveButton.addEventListener("click", () => {
            const saved = newSaveButton.classList.toggle("saved");

            newSaveButton.innerHTML = saved
                ? '<i class="fa-solid fa-bookmark"></i>'
                : '<i class="fa-regular fa-bookmark"></i>';
        });
        savePosts();
        postInput.value = "";

    });

}


// ===================================
// CONNÈCTLY - PART 3
// SAVE POSTS IN LOCAL STORAGE
// ===================================

const STORAGE_KEY = "connectly_posts";

// Save all created posts
function savePosts() {
    const posts = [];

    document.querySelectorAll(".post-card").forEach((post) => {
        const caption = post.querySelector(".post-caption");

        if (caption) {
            posts.push({
                text: caption.textContent
            });
        }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Restore posts after refresh
function loadPosts() {
    const savedPosts = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    savedPosts.forEach((item) => {
        const newPost = document.createElement("article");
        newPost.className = "post-card";

        newPost.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <img src="https://i.pravatar.cc/100?img=47" alt="Your profile">
                    <div>
                        <h4>Your Name</h4>
                        <span>Saved post</span>
                    </div>
                </div>
            </div>

            <p class="post-caption"></p>

            <div class="post-stats">
                <span><span class="like-count">0</span> likes</span>
                <span>0 comments · 0 shares</span>
            </div>

            <div class="post-buttons">
                <button class="like-btn">
                    <i class="fa-regular fa-heart"></i>
                    Like
                </button>
                <button>
                    <i class="fa-regular fa-comment"></i>
                    Comment
                </button>
                <button>
                    <i class="fa-solid fa-share"></i>
                    Share
                </button>
                <button class="save-btn">
                    <i class="fa-regular fa-bookmark"></i>
                </button>
            </div>
        `;

        newPost.querySelector(".post-caption").textContent = item.text;

        const feed = document.querySelector(".feed-section");
        feed.insertBefore(newPost, feed.querySelector(".post-card"));

        // Like functionality
        const likeBtn = newPost.querySelector(".like-btn");
        const likeCount = newPost.querySelector(".like-count");

        likeBtn.addEventListener("click", () => {
            const liked = likeBtn.classList.toggle("liked");
            const icon = likeBtn.querySelector("i");

            let count = Number(likeCount.textContent);
            likeCount.textContent = liked ? count + 1 : count - 1;

            icon.className = liked
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart";

            likeBtn.style.color = liked ? "#E879B0" : "";
        });

        // Save functionality
        const saveBtn = newPost.querySelector(".save-btn");

        saveBtn.addEventListener("click", () => {
            const saved = saveBtn.classList.toggle("saved");

            saveBtn.innerHTML = saved
                ? '<i class="fa-solid fa-bookmark"></i>'
                : '<i class="fa-regular fa-bookmark"></i>';
        });
    });
}

// Restore posts when page loads
loadPosts();


// ===================================
// CONNÈCTLY - PART 4
// COMMENT SYSTEM
// ===================================

document.addEventListener("click", function (event) {

    const commentButton = event.target.closest(".post-buttons button");

    if (!commentButton) return;

    // Identify the Comment button
    const commentIcon = commentButton.querySelector(".fa-comment");

    if (!commentIcon) return;

    const post = commentButton.closest(".post-card");

    if (!post) return;

    const commentText = prompt("Write your comment:");

    if (!commentText || !commentText.trim()) return;

    // Create comments container
    let commentsSection = post.querySelector(".post-comments");

    if (!commentsSection) {
        commentsSection = document.createElement("div");
        commentsSection.className = "post-comments";
        post.appendChild(commentsSection);
    }

    // Create new comment
    const comment = document.createElement("div");
    comment.className = "comment-item";

    const name = document.createElement("strong");
    name.textContent = "Your Name";

    const message = document.createElement("p");
    message.textContent = commentText.trim();

    comment.append(name, message);
    commentsSection.appendChild(comment);

});


// ===================================
// CONNÈCTLY - PART 5
// COMMENT COUNTER
// ===================================

document.addEventListener("click", function (event) {

    const commentButton = event.target.closest(".post-buttons button");

    if (!commentButton) return;

    const commentIcon = commentButton.querySelector(".fa-comment");

    if (!commentIcon) return;

    const post = commentButton.closest(".post-card");

    if (!post) return;

    const commentCountText = post.querySelector(".post-stats span:last-child");

    if (!commentCountText) return;

    const commentsSection = post.querySelector(".post-comments");

    const totalComments = commentsSection
        ? commentsSection.querySelectorAll(".comment-item").length
        : 0;

    const sharesText = commentCountText.textContent.match(/(\d+)\s*shares/);
    const shares = sharesText ? sharesText[1] : "0";

    commentCountText.textContent =
        `${totalComments} comments · ${shares} shares`;

});


// ===================================
// CONNÈCTLY - PART 6
// SHARE SYSTEM
// ===================================

document.addEventListener("click", async function (event) {

    const shareButton = event.target.closest(".post-buttons button");

    if (!shareButton) return;

    const shareIcon = shareButton.querySelector(".fa-share");

    if (!shareIcon) return;

    const post = shareButton.closest(".post-card");

    if (!post) return;

    const caption = post.querySelector(".post-caption");

    const shareText = caption
        ? caption.textContent
        : "Check out this post on Connèctly!";

    const shareData = {
        title: "Connèctly",
        text: shareText,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(
                shareData.text + "\n" + shareData.url
            );

            alert("Post link copied successfully!");
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            alert("Unable to share this post.");
        }
    }

});



// ===================================
// CONNÈCTLY - PART 7
// DELETE YOUR OWN POSTS
// ===================================

function addDeleteButton(post) {

    if (!post.querySelector(".post-caption")) return;

    if (post.querySelector(".delete-post-btn")) return;

    const postHeader = post.querySelector(".post-header");

    if (!postHeader) return;

    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-post-btn";

    deleteButton.innerHTML = `
        <i class="fa-regular fa-trash-can"></i>
        Delete
    `;

    postHeader.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {

        if (!confirm("Are you sure you want to delete this post?")) {
            return;
        }

        post.remove();
        savePosts();

    });
}

// Existing posts
document.querySelectorAll(".post-card").forEach(addDeleteButton);


// ===================================
// CONNÈCTLY - PART 8
// FEED SEARCH SYSTEM
// ===================================

const feedSearchInput = document.querySelector(".feed-search-input");

if (feedSearchInput) {

    feedSearchInput.addEventListener("input", () => {

        const searchValue = feedSearchInput.value
            .trim()
            .toLowerCase();

        document.querySelectorAll(".feed-section .post-card")
            .forEach((post) => {

                const postText = post.textContent.toLowerCase();

                post.style.display = postText.includes(searchValue)
                    ? ""
                    : "none";

            });

    });

}

// ===================================
// CONNÈCTLY - PART 9
// FEED FILTER SYSTEM
// ===================================

const filterButtons = document.querySelectorAll(".filter-btn");
const feedContainer = document.querySelector(".feed-section");

if (filterButtons.length && feedContainer) {

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            // Active button update
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filterType = button.dataset.filter;

            const posts = Array.from(
                feedContainer.querySelectorAll(".post-card")
            );

            if (filterType === "newest") {

                posts.reverse().forEach((post) => {
                    feedContainer.appendChild(post);
                });

            }

            else if (filterType === "popular") {

                posts.sort((a, b) => {

                    const likesA = Number(
                        a.querySelector(".like-count")?.textContent || 0
                    );

                    const likesB = Number(
                        b.querySelector(".like-count")?.textContent || 0
                    );

                    return likesB - likesA;

                });

                posts.forEach((post) => {
                    feedContainer.appendChild(post);
                });

            }

        });

    });

}