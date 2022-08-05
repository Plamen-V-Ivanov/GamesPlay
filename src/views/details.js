import { html } from "../../node_modules/lit-html/lit-html.js";
import { createComment, deleteGame, getAllCommentsByGameId, getGameById } from "../api/data.js";
import { getUserData } from "../util.js";


let detailsTemplate = (game, isOwner, onDelete, comments, showCommentButton, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">
            ${game.summary}
        </p>
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0 ? 
                html `<p class="no-comment">No comments.</p>`:
                html `<ul>${comments.map(commentCard)}</ul>`}
        </div>
            ${gameControlsTemplate(game, isOwner, onDelete)}
    </div>
            ${commentButtonTemplate(showCommentButton, onComment)}
</section>`;


let gameControlsTemplate = (game, isOwner, onDelete) => {
    if (isOwner) {
        return html`<div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a  @click="${onDelete}" href="javascript:void(0)" class="button">Delete</a>
                    </div>`;
    } else {
        return null;
    }
}

let commentButtonTemplate = (showCommentButton, onComment) => {
    if (showCommentButton) {
        return html`<article class="create-comment">
                        <label>Add new comment:</label>
                            <form @submit=${onComment} class="form">
                                <textarea name="comment" placeholder="Comment......"></textarea>
                                <input class="btn submit" type="submit" value="Add Comment">
                            </form>
                    </article>`;
    } else {
        return null;
    }
}

let commentCard = (singleComment) => {
     return html`<li class="comment"> <p>Content: ${singleComment.comment}</p></li>`;
}


export async function detailsView(context) {
    let userData = getUserData();
    let [game, comments] = await Promise.all([
        getGameById(context.params.id),
        getAllCommentsByGameId(context.params.id)
    ]);

    let isOwner = userData && userData.id == game._ownerId;
    let showCommentButton = isOwner == false && userData != null;

    context.render(detailsTemplate(game, isOwner, onDelete, comments, showCommentButton, onComment));

    async function onDelete() {
        await deleteGame(context.params.id);
        context.page.redirect('/');
    }

    async function onComment(event) {

        event.preventDefault();
        const formData = new FormData(event.target);

        const comment = {
            gameId: context.params.id,
            comment: formData.get('comment').trim(),
        }

        if (comment.comment == '') {
            return alert('Empty field is not allowed');
        }
        await createComment(comment);
        event.target.reset();
        context.page.redirect('/games/' + context.params.id);

    }

}

