{
  ("use strict");

  const buttonText = document.getElementById("getText");
  const buttonUsers = document.getElementById("getUsers");
  const buttonPosts = document.getElementById("getPosts");
  const formNode = document.getElementById("addPost");

  formNode.reset();
  buttonText.addEventListener("click", getText);
  buttonUsers.addEventListener("click", getUsers);
  buttonPosts.addEventListener("click", getPosts);
  formNode.addEventListener("submit", addPost);

  function getText() {
    fetch("../../sample.txt") // returns Promise
      .then(resp => {
        return resp.text(); // if JSON use .json()
      })
      .then(text => {
        document.getElementById("displayMessage").innerHTML = text;
      })
      .catch(err => {
        console.error(err);
      });
  }

  function getUsers() {
    fetch("../../users.json")
      .then(res => res.json())
      .then(obj => {
        const usersNode = document.getElementById("users");
        obj.forEach(user => {
          usersNode.innerHTML += `
                <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                </ul>
                `;
        });
      })
      .catch(err => console.log(err));
  }

  function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then(res => res.json())
      .then(data => {
        let restData;
        const messNode = document.getElementById("mess");
        if (data.length >= 10) {
          restData = data.splice(11);
        }
        data.forEach(mess => {
          messNode.innerHTML += `
            <div>
                <h2>${mess.title}</h2>
                <p>${mess.body}</p>
            </div>
        `;
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function addPost(e) {
    e.preventDefault();
    let titleInputValue = document.getElementById("title").value;
    let bodyInputValue = document.getElementById("body").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: titleInputValue,
        body: bodyInputValue
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        formNode.reset();
      })
      .catch(err => console.error(err));
  }
}
