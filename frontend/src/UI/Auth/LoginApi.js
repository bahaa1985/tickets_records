export default async function authUser() {
  const response = await fetch("/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
  return response;
}


export async function setAuthUsr(user){
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(user)
  });
  return response;
}