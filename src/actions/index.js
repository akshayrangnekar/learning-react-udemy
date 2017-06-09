import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const BASE_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=akshay1000';

export function fetchPosts() {
    const request = axios.get(`${BASE_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback) {
    const request =
        axios.post(`${BASE_URL}/posts${API_KEY}`, values)
        .then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(postId) {
    const request = axios.get(`${BASE_URL}/posts/${postId}${API_KEY}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(postId, callback) {
    const request =
        axios.delete(`${BASE_URL}/posts/${postId}${API_KEY}`)
        .then(() => callback());

    return {
        type: DELETE_POST,
        payload: postId
    }

}
