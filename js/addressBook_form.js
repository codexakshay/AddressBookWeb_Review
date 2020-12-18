let addressBookJSONObject = {};
let isUpdate = false;

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameOutput = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            nameOutput.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;;
            nameOutput.textContent = "";
        } catch (e) {
            nameOutput.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressOutput = document.querySelector('.address-error');
    addressOutput.textContent = address.value;
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            addressOutput.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;;
            addressOutput.textContent = "";
        } catch (e) {
            addressOutput.textContent = e;
        }
    });

    const phoneNumber = document.querySelector('#phoneNum');
    const phoneOutput = document.querySelector('.phoneNum-error');
    phoneOutput.textContent = phoneNumber.value;
    phoneNumber.addEventListener('input', function() {
        if (phoneNumber.value.length == 0) {
            phoneOutput.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).phoneNumber = phoneNumber.value;;
            phoneOutput.textContent = "";
        } catch (e) {
            phoneOutput.textContent = e;
        }
    });
    checkForUpdate();
});

const saveForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
}

const setAddressBookObject = () => {
    addressBookJSONObject._name = getInputValueById('#name');
    addressBookJSONObject._address = getInputValueById('#address');
    addressBookJSONObject._city = getInputValueById('#City');
    addressBookJSONObject._state = getInputValueById('#State');
    addressBookJSONObject._zip = getInputValueById('#Zip');
    addressBookJSONObject._phoneNumber = getInputValueById('#phoneNum');
};

function createAndUpdateStorage() {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList) {
        let contact = addressBookList.find(perData => perData._id == addressBookJSONObject._id);
        if (!contact) {
            addressBookList.push(createAddressBook());
        } else {
            const index = addressBookList.map(per => per._id).indexOf(contact._id);
            addressBookList.splice(index, 1, createAddressBookData(contact._id));
        }
    } else {
            addressBookList = [createAddressBook()];
        }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createAddressBook = () => {
    let addressBook = new AddressBookData();
    addressBook.id = createNewPersonId();
    try {
        addressBook.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        addressBook.phoneNumber = getInputValueById('#phoneNum');
    } catch (e) {
        setTextValue('.phoneNum-output', e);
        throw e;
    }
    try {
        addressBook.address = getInputValueById('#address');
    } catch (e) {
        setTextValue('.address-error', e);
        throw e;
    }
    addressBook.city = getInputValueById("#City");
    addressBook.state = getInputValueById("#State");
    addressBook.zip = getInputValueById("#Zip");
    alert(addressBook.toString());
    return addressBook;
}

const resetForm = () => {
    setValue('#name', "");
    setValue('#address', "");
    setValue('#City', "");
    setValue('#State', "");
    setValue('#Zip', "");
    setValue('#phoneNum', "");
}


const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem("editPer");
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookJSONObject = JSON.parse(addressBookJson);
    setForm();
};

const setForm = () => {
    setValue("#name", addressBookJSONObject._name);
    setValue("#address", addressBookJSONObject._address);
    setValue("#City", addressBookJSONObject._city);
    setValue("#State", addressBookJSONObject._state);
    setValue("#Zip", addressBookJSONObject._zip);
    setValue("#phoneNum", addressBookJSONObject._phoneNumber);
};

const createAddressBookData = (id) => {
    let addressBook = new AddressBookData();
    if (!id) addressBook.id = createNewPersonId();
    else addressBook.id = id;
    setAddressBookData(addressBook);
    return addressBook;
} 

const setAddressBookData = (addressBook) => {
    try {
        addressBook.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        addressBook.phoneNumber = getInputValueById('#phoneNum');
    } catch (e) {
        setTextValue('.phoneNum-output', e);
        throw e;
    }
    try {
        addressBook.address = getInputValueById('#address');
    } catch (e) {
        setTextValue('.address-error', e);
        throw e;
    }
    addressBook.city = getInputValueById("#City");
    addressBook.state = getInputValueById("#State");
    addressBook.zip = getInputValueById("#Zip");
}

const createNewPersonId = () => {
    let personId = localStorage.getItem("PersonID");
    personId = !personId ? 1 : (parseInt(personId) + 1).toString();
    localStorage.setItem("PersonID",personId);
    return personId;
};

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
};
