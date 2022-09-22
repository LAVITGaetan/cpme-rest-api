function generateCode() {
    let field = document.getElementById('identifiant');
    let result = ''
    var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    field.value = result;
}

function showModalRepresentation(id, titre) {
    let modal = document.getElementsByClassName('modal')[0];
    let input = document.getElementById('input-titre');
    let submit = document.getElementById('modal-submit');
    submit.setAttribute('onclick', `editRepresentation('${id}')`)
    modal.style.display = 'grid';
    input.value = titre;
}


function closeModal() {
    document.getElementsByClassName('modal')[0].style.display = 'none'
}
