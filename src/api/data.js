import { get, post, put, del } from "./api.js";

export async function getAllGames() {
    return get('/data/games?sortBy=_createdOn%20desc');
}

export async function getAllGamesSortedByRecent() {
    return get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}


export async function getAllCommentsByGameId(gameId) {
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createComment(comment) {
    return post('/data/comments', comment);
}

export async function getGameById(id) {
    return get('/data/games/' + id);
}

export async function createGame(game) {
    return post('/data/games', game);
}

export async function deleteGame(id) {
    return del('/data/games/' + id);
}

export async function updateGame(id, game) {
    return put('/data/games/' + id, game);
}