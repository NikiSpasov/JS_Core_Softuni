function solve () {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let result = super.toString();
            result += "\n" + `Rating: ${this.likes - this.dislikes}`;
            if (this.comments.length > 0) {
                result += "\n" + "Comments:";
                this.comments.forEach(c => result += `\n * ${c}`);
            }
            return result;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view() {
            this.views++;
            return this;
        }

        toString() {
            let result = super.toString();
            result += "\n" + `Views: ${this.views}`.trim();
            return result;
        }
    }
    return {Post, SocialMediaPost, BlogPost}
}
let smp = new SocialMediaPost("Social", "Ibre", 100, 5);
smp.addComment("1");
smp.addComment("2");
smp.addComment("3");
console.log(smp.toString());

// expected
//'Post: TestTitle\nContent: TestContent\nRating: -5\nComments:\n* 1\n* 2\n* 3'
//'Post: TestTitle\nContent: TestContent\nRating: -5\nComments:\n * 1\n *...