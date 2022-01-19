let postUrl = 'https://jsonplaceholder.typicode.com/posts';
let title = document.getElementById('title');
let description = document.getElementById('description');
let listOfComments = document.getElementById('coments-list');

class Post {
    constructor(postTitle, postDescription, postComments, id) {
        this.postTitle = postTitle;
        this.postDescription = postDescription;
        this.postComments = postComments;
        this.id = id;
    }

    async getPost() {
        try {
            let response = await fetch(`${postUrl}/${this.id}`);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async showPost() {
        try {
            let data = await this.getPost();
            this.renderPost(data);
        } catch (error) {
            console.log(error);
        }
    }

    renderPost(post) {
        this.postTitle.innerHTML = `<h3>Title: ${post.title}</h3>`;
        this.postDescription.innerHTML = `<p><strong>Description:</strong> ${post.body}</p>`;
    }

    async getComments() {
        try {
            let response = await fetch(`${postUrl}/${this.id}/comments`);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async showComments() {
        try {
            let data = await this.getComments();
            this.renderComments(data);
        } catch (error) {
            console.log(error);
        }
    }

    renderComments(comments) {
        let commentsList = "";
        for (const el of comments) {
            if (!el) {
                return;
            }
            commentsList += `<li class="comments-item">${el.body}</li>`;
        }
        this.postComments.innerHTML = commentsList;
    }

    init() {
        this.showPost();
        this.showComments();
    }
}

let post1 = new Post(title, description, listOfComments, 1);

post1.init();


//////////////////////////Second task/////////////////////////////

console.log(1);

setTimeout(function () {
    console.log(2);
}, 100);

setTimeout(function () {
    console.log(3);
}, 0);

new Promise(function (resolve) {
    setTimeout(function () {
        resolve()
    }, 0);
}).then(() => {
    console.log(4);
});

console.log(5);