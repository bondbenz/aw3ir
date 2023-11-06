window.onload = function () {   // ce code est exécuter une fois que toute la page est téléchargée par le navigateur
    // voir plus : https://www.w3schools.com/js/js_htmldom.asp
     console.log( "DOM ready!" );

};

function validate(){
    let first_name = document.getElementById("prenom").value;
    let last_name = document.getElementById("nom").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("adresse").value;
    let data_of_birth = document.getElementById("date-de-naissance").value;
    const birthdayDate = new Date(data_of_birth);
    const birthdayTimestamp = birthdayDate.getTime();
    
    if (first_name == '' || last_name == '' || data_of_birth == '' || email == ''){
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        return false;
    }

    if (first_name.length < 5){
        alert('Prénom doit avoir 5 caractères minimum');
        return false;
    }

    if (last_name.length < 5){
        alert('Nom doit avoir 5 caractères minimum');
        return false;
    }

    if (address.length < 5){
        alert('Adresse doit avoir 5 caractères minimum');
        return false;
    }

    if (data_of_birth == ''){
        alert('Svp entrez une date de naissance!');
        return false;
    }

    if (!validateEmail(email)){
        alert('Email invalid!');
        return false;
    }

    if (birthdayTimestamp > Date.now()){
        alert('Date de naissance invalid!');
        return false;
    }
    
    map_data = constructMap(address);
    console.log(map_data);
    // Updating modal data
    document.getElementById("target-firstname").textContent = first_name;
    document.getElementById("target-birthday").textContent= data_of_birth;
    document.getElementById("target-firstname").textContent = first_name;
    document.getElementById("target-map-img").src = map_data['img-url'];
    document.getElementById("target-map-url").href = map_data['url'];
    document.getElementById("target-address").textContent = address;

    let dataModal = new bootstrap.Modal(document.getElementById('dataModal'));
    dataModal.show();
    return false;

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function constructMap(address){
    return {
        'img-url': `https://maps.googleapis.com/maps/api/staticmap?markers=${address}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`,
        'url': `http://maps.google.com/maps?q=${address}`,
    };
}