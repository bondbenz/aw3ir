/*
store.js
Script pour gérer la liste de contact en JSON

Pour ajouter un contact:  contactStore.add(_lastname, _firsname, _date, _adress, _mail);
Pour récuper la liste:    contactStore.getList();
*/
var contactStore = (function () {
    // variable privée
    let contactListString = localStorage.getItem('contactList')
    var contactList = contactListString ? JSON.parse(contactListString) : [];

    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block

    return {
        add: function (_lastname, _firsname, _date, _adress, _mail) {
            var contact = {
                name: _lastname,
                firstname: _firsname,
                date: _date,
                adress: _adress,
                mail: _mail,
            };
            // ajout du contact à la liste
            contactList.push(contact);

            // persistence de la liste dans une base de données local du navigateur web
            // https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
            localStorage.setItem('contactList', JSON.stringify(contactList));
            document.getElementById('added-msg').removeAttribute('hidden', '');
            document.getElementById('reset-msg').setAttribute('hidden', 'hidden');
            displayContactList();
            return contactList;
        },
        reset: function () {
            localStorage.removeItem('contactList');
            document.getElementById('added-msg').setAttribute('hidden', 'hidden');
            document.getElementById('reset-msg').removeAttribute('hidden');
            document.getElementById('contacts-number').innerText = '0';
            document.querySelector("table tbody").innerHTML = '';
            // reseting contactList to an empty array otherwise it will not affect only after a refresh
            contactList = [];
            return contactList;
        },

        getList: function () {
            return contactList;
        },
    };
})();

function displayContactList() {
    const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
    const contactList = contactListString ? JSON.parse(contactListString) : [];
    document.getElementById('contacts-number').innerText = contactList.length;

    // Clear existing rows in the tbody (was missing)
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = '';

    for (const contact of contactList) {
        const date = new Date(contact.date);
        const formattedDate = date.toISOString().split('T')[0];
        document.querySelector("table tbody").innerHTML +=
            `<tr>
            <td>${contact.name}</td>
            <td>${contact.firstname}</td>
            <td>${formattedDate}</td>
            <td><a href="http://maps.google.com/maps?q=${contact.adress}">${contact.adress}</a></td>
            <td><a href="mailto:${contact.mail}">${contact.mail}</a></td>
            <tr>`;
    }
}