export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("auth header", user);
  if (user && user.access_token) {
    return { 'x-access-token': user.access_token };
  } else {
    return {};
  }
}
