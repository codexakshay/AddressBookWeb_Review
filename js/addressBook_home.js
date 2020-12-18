window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th>Fullname</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th></th></tr>"
    let innerHtml = `${headerHtml}`
    let addressBookList = createAddressBookJSON();
    for (const person of addressBookList) {
        innerHtml = `${innerHtml}
    <tr>
    <td>${person._name}</td>
    <td>${person._address}</td>
    <td>${person._city}</td>
    <td>${person._state}</td>
    <td>${person._zip}</td>
    <td>${person._phoneNumber}</td>
    <td>
        <img id="${person._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="${person._id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
    </td>
 </tr>
    `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const createAddressBookJSON = () => {
    let addressBookListLocal = [{
            _name: "Virat Kohli",
            _address: "Paschim Vihar",
            _city: "Gurugram",
            _state: "Haryana",
            _zip: "560468",
            _phoneNumber: "6300062138"

        },
        {
            _name: "Steve Smith",
            _address: "New Angels Street",
            _city: "Sydney",
            _state: "Sydney",
            _zip: "565156",
            _phoneNumber: "9865445210"
        }
    ];
    return addressBookListLocal;
};