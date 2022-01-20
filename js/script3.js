let postUrl = 'https://jsonplaceholder.typicode.com/posts';
let title = document.getElementById('title');
let description = document.getElementById('description');
let listOfComments = document.getElementById('coments-list');
let writeComment = document.getElementById('input-comment');
let addCommentBtn = document.getElementById('add-comment-btn');

class Post {
    constructor(postTitle, postDescription, postComments, postCommentBtn, postcommentArea, id) {
        this.postTitle = postTitle;
        this.postDescription = postDescription;
        this.postComments = postComments;
        this.postCommentBtn = postCommentBtn;
        this.postcommentArea = postcommentArea;
        this.id = id;

        this.postCommentBtn.addEventListener('click', () => {
            try {
                if (!this.postcommentArea.value) {
                    return
                }
                this.addComment({
                    body: this.postcommentArea.value
                })
                this.postcommentArea.value = "";
            } catch (error) {
                console.log(error);
            };
        });
    }

    async addComment(body) {
        let res = await fetch(`${postUrl}/${this.id}/comments`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        let finalRes = await res.json()
        this.renderNewComment(finalRes);
    }

    renderNewComment(comment) {
        let li = document.createElement('li')
        li.innerHTML = `${comment.body}`;
        this.postComments.append(li);
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

let post1 = new Post(title, description, listOfComments, addCommentBtn, writeComment, 1);

post1.init();