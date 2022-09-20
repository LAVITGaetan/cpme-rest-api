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

// POST REQUESTS
function postForm(event) {
    event.preventDefault();
    let form = document.getElementById('add-form')
    let ressource = form.getAttribute('data-ressource')
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
            })
    } catch (error) {
        console.log(error.message);
    }
}

// PATCH REQUESTS
function patchForm(event) {
    event.preventDefault();
    let form = document.getElementById('add-form')
    let ressource = form.getAttribute('data-ressource')
    let data = new FormData(form)
    console.log(data);
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
            })
    } catch (error) {
        console.log(error.message);
    }
}
