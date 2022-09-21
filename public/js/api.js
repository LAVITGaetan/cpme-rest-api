function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

// SUCCESS MESSAGE
function showModalSucces(message, redirection) {
    let modal = document.getElementById('modal');
    let text = document.getElementById('modal-text');
    let submit = document.getElementById('modal-redirection')
    submit.setAttribute('href', redirection);
    text.innerHTML = message;
    modal.style.display = 'grid';
}

// POST REQUESTS
function postForm(event) {
    event.preventDefault();
    let form = document.getElementById('add-form')
    let ressource = form.getAttribute('data-ressource')
    let message = form.getAttribute('data-message')
    let redirection = form.getAttribute('data-redirection')
    let data = new FormData(form)
    try {
        fetch(`http://localhost:9999/api/${ressource}`, {
            method: 'POST',
            headers: {
                'auth-token': getCookie('token')
            },
            body: data
        })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                showModalSucces(message, redirection)
            })
    } catch (error) {
        console.log(error.message);
    }
}

// PATCH REQUESTS
function patchForm(event) {
    event.preventDefault();
    let form = document.getElementById('add-form')
    let message = form.getAttribute('data-message')
    let redirection = form.getAttribute('data-redirection')
    let ressource = form.getAttribute('data-ressource')
    let data = new FormData(form)
    try {
        fetch(`http://localhost:9999/api/${ressource}`, {
            method: 'PATCH',
            headers: {
                'auth-token': getCookie('token')
            },
            body: data
        })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                showModalSucces(message, redirection)
            })
    } catch (error) {
        console.log(error.message);
    }
}

// DELETE REQUESTS
function deleteRessource(element) {
    let ressource = element.getAttribute('data-ressource');
    let message = element.getAttribute('data-message');
    let redirection = element.getAttribute('data-redirection');
    if(confirm('Confirmez-vous la suppression ?')) {
        try {
            fetch(`http://localhost:9999/api/${ressource}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': getCookie('token')
                }
            })
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    showModalSucces(message, redirection)
                })
        } catch (error) {
            console.log(error.message);
        }
    }
}
