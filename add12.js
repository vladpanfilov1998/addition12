//1.
//Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
//https://jsonplaceholder.typicode.com/users
//    кожному елементу юзера створити кнопку, при клику на яку в окремий блок виводяться всі пости поточного юзера.
//    Кожному елементу post створити кнопку, при клику на яку в окремий блок виводяться всі коментарі поточного поста

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        return response.json();
    })
    .then(users => {
        let wraper = document.createElement('div');
        wraper.classList.add('wraper');
        for (const user of users) {
            let divUser = document.createElement('div');
            divUser.classList.add('card');
            let button = document.createElement('button');
            button.innerText = 'ВИВЕСТИ ПОСТИ';
            divUser.innerHTML = `
                        <h3>ID: ${user.id}</h3>
                        <h4>Name: ${user.name}</h4>
                        <h5>Username: ${user.username}</h5>
                        <h5>E-mail: ${user.email}</h5>
                        <h5>Phone: ${user.phone}</h5>
                        <h5>Website: ${user.website}</h5>
                        `;
            button.onclick = (id) => {
                fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => response.json())
                    .then(posts => {
                        let postDiv = document.createElement('div');
                        postDiv.classList.add('div');
                        for (const post of posts) {
                            if (user.id === post.userId) {
                                let divCard = document.createElement('div');
                                divCard.classList.add('card');
                                divCard.innerHTML = `
                        <h3>ID: ${post.id}</h3>
                        <h4>Title: ${post.title}</h4>
                        <h5>Body: ${post.body}</h5>
                        `;
                                let buttonR = document.createElement('button');
                                buttonR.innerText = 'ВИВЕСТИ КОМЕНТАРІ';
                                buttonR.onclick = (id) => {
                                    fetch('https://jsonplaceholder.typicode.com/posts/' + post.id + '/comments')
                                        .then(response => response.json())
                                        .then(comments => {
                                            for (const comment of comments) {

                                                if (post.id === comment.postId) {
                                                    let divCardComments = document.createElement('div');
                                                    divCardComments.classList.add('cardComments');
                                                    divCardComments.innerHTML = `
                                        <h3>ID: ${comment.id}</h3>
                                        <h4>Name: ${comment.name}</h4>
                                        <h5>Email: ${comment.email}</h5>
                                        <h6>Body: ${comment.body}</h6>
                                        `;
                                                    divCard.appendChild(divCardComments)
                                                }
                                                buttonR.disabled = true;
                                            }
                                        })
                                }
                                divCard.appendChild(buttonR)
                                postDiv.appendChild(divCard);
                                divUser.appendChild(postDiv);

                            }
                        }

                    });
            }

            divUser.appendChild(button);
            wraper.appendChild(divUser);
            document.body.appendChild(wraper);

        }
    });