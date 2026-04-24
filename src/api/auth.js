const REGISTER_URL = "https://93vkgquhi8.execute-api.eu-north-1.amazonaws.com/test/register";
const LOGIN_URL    = "https://by9pvln2o0.execute-api.eu-north-1.amazonaws.com/test/login";
const UPLOAD_URL   = "https://v0kvuaubkg.execute-api.eu-north-1.amazonaws.com/test/upload";
const FETCH_POSTS_URL = "https://069v2o9g2f.execute-api.eu-north-1.amazonaws.com/test/getcreatorposts";
const FEED_URL      = "https://dvzqyeafr6.execute-api.eu-north-1.amazonaws.com/test/fetchPosts";
const LIKE_URL      = "https://tw3ryhaefe.execute-api.eu-north-1.amazonaws.com/test/like";
const COMMENT_URL   = "https://q708i2jfai.execute-api.eu-north-1.amazonaws.com/test/comments";

export async function registerUser({ username, password, role }) {
  const res = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  });

  const data = await res.json();

  if (res.status === 409) throw new Error("Username already taken");
  if (res.status === 400) throw new Error("Missing required fields");

  return data;
}

export async function loginUser({ username, password }) {
  const res = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.status === 401) throw new Error("Invalid username or password");
  if (res.status === 400) throw new Error("Missing required fields");

  return data;
}

export async function uploadPost({ fileName, fileContent, contentType, title, caption }) {
  const creator = localStorage.getItem("username");

  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, fileContent, contentType, title, caption, creator }),
  });

  const data = await res.json();
  if (res.status === 500) throw new Error(data.error || "Upload failed");
  return data; // { postId, imageUrl }
}
export async function fetchCreatorPosts(creator) {
  const res = await fetch(`${FETCH_POSTS_URL}?creator=${creator}`);
  const data = await res.json();
  if (res.status === 500) throw new Error(data.error || "Failed to fetch posts");
  return data; // { posts: [...] }
}
export async function fetchAllPosts() {
  const username = localStorage.getItem("username");
  const res = await fetch(`${FEED_URL}?username=${username}`);
  const data = await res.json();
  if (res.status === 500) throw new Error(data.error || "Failed to fetch feed");
  return data;
}

export async function toggleLike(postId) {
  const username = localStorage.getItem("username");
  const res = await fetch(LIKE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, username }),
  });
  const data = await res.json();
  if (res.status === 500) throw new Error(data.error || "Failed to like post");
  return data; // { liked: true/false }
}

export async function addComment(postId, text) {
  const username = localStorage.getItem("username");
  const res = await fetch(COMMENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, username, text }),
  });
  const data = await res.json();
  if (res.status === 500) throw new Error(data.error || "Failed to add comment");
  return data;
}