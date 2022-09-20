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