let addressBookJSONObject = {};

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
});

const saveForm = () => {
    try {
        let addressBook = createAddressBook();
    } catch (e) {
        return
    }
}

const createAddressBook = () => {
    let addressBook = new AddressBookData();
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

const setaddressBookJSONObject = () => {
    addressBookJSONObject._name = getInputValueById('#name');
    addressBookJSONObject._address = getInputValueById('#address');
    addressBookJSONObject._city = getInputValueById('#city');
    addressBookJSONObject._state = getInputValueById('#state');
    addressBookJSONObject._zip = getInputValueById('#zip');
    addressBookJSONObject._phoneNumber = getInputValueById('#phoneNum');
    alert("Added Json Object : " + addressBookJSONObject._name );
};

const getInputValueById = (propertyId) => {
    let value = document.querySelector(propertyId).value;
    return value;
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}