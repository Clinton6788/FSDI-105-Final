//Load pets array
import { loadPetsFromLocalStorage, savePetsToLocalStorage, Pet } from './utilities.js';

let pets = loadPetsFromLocalStorage();


//Form handling
function validateForm() {
    const name = document.getElementById('txtName').value.trim();
    const age = document.getElementById('txtAge').value.trim();
    const breed = document.getElementById('txtBreed').value.trim();
    const service = document.getElementById('txtService').value.trim();
    const type = document.getElementById('txtType').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    if (name === '' || age === '' || breed === '' || service === '' || type === '' || !gender) {
        return false;
    }
    return true;
}

//Asterisks for form
$(document).ready(function() {
    $('#registerForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting immediately

        // Remove previous asterisks
        $('.required').each(function() {
            $(this).find('.required-asterisk').remove();
        });

        let isValid = true;

        if ($('#txtName').val().trim() === '') {
            isValid = false;
            $('<span class="required-asterisk" style="color: red;"> *</span>').appendTo('label[for="txtName"]');
        }

        if ($('#txtAge').val().trim() === '') {
            isValid = false;
            $('<span class="required-asterisk" style="color: red;"> *</span>').appendTo('label[for="txtAge"]');
        }

        if ($('#txtBreed').val().trim() === '') {
            isValid = false;
            $('<span class="required-asterisk" style="color: red;"> *</span>').appendTo('label[for="txtBreed"]');
        }

        if ($('#txtService').val() === '') {
            isValid = false;
            $('<span class="required-asterisk" style="color: red;"> *</span>').appendTo('label[for="txtService"]');
        }

        if ($('#txtType').val() === '') {
            isValid = false;
            $('<span class="required-asterisk" style="color: red;"> *</span>').appendTo('label[for="txtType"]');
        }

        const genderSelected = $('input[name="gender"]:checked').length;
        if (genderSelected === 0) {
            isValid = false;
            $('<span class="required-asterisk" style="color: red;"> *</span>').appendTo('.form-radio legend');
        }
    });
});


function clearForm(){
    document.getElementById('txtName').value = "";
    document.getElementById('txtAge').value = "";
    document.getElementById('txtBreed').value = "";
    document.getElementById('txtService').value = "";
    document.getElementById('txtType').value = "";
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    document.getElementById("imgPhoto").value = "";
}


//Register and push new pets
export function register() {
    if (!validateForm()) {
        return;
    }

    const inputName = document.getElementById('txtName').value;
    const inputAge = document.getElementById('txtAge').value;
    const inputBreed = document.getElementById('txtBreed').value;
    const inputService = document.getElementById('txtService').value;
    const inputType = document.getElementById('txtType').value;
    const inputGender = document.querySelector('input[name="gender"]:checked');
    const inputPhoto = document.getElementById('imgPhoto');
    const file = inputPhoto.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const img = new Image();
            img.src = reader.result;
            img.onload = function () {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const size = Math.min(img.width, img.height);
                const x = (img.width - size) / 2;
                const y = (img.height - size) / 2;
                canvas.width = size;
                canvas.height = size;
                ctx.drawImage(img, x, y, size, size, 0, 0, size, size);
                const croppedImageUrl = canvas.toDataURL('image/jpeg');

                const newPet = new Pet(inputName, inputAge, inputGender.value, inputBreed, inputService, inputType, croppedImageUrl);
                pets.push(newPet);
                savePetsToLocalStorage(pets);
                petsDisplay();
                clearForm();
            };
        };
        reader.readAsDataURL(file);
    } else {
        const getImagePath = (inputType) => {
            let imagePath;
            
            switch (inputType) {
                case 'dog':
                    imagePath = './img/genDog.jpg';
                    break;
                case 'cat':
                    imagePath = './img/genCat.jpg';
                    break;
                case 'bird':
                    imagePath = './img/genBird.jpg';
                    break;
                case 'other':
                    imagePath = './img/genOther.jpg';
                    break;
            }
            return imagePath;
        };
        const imagePath = getImagePath(inputType);
        const newPet = new Pet(inputName, inputAge, inputGender.value, inputBreed, inputService, inputType, imagePath);
        pets.push(newPet);
        savePetsToLocalStorage(pets);
        petsDisplay();
        clearForm();
    }
}


//Display Pets
export function petsDisplay() {
    const petBoxes = document.getElementById("petBoxes");
    petBoxes.innerHTML = '';

    for (let i = 0; i < pets.length; i++) {
        petBoxes.innerHTML += `
            <div class="pet-box">
                <div class="center-img">
                    <img class="pet-img" src="${pets[i].photo || 'default-image.jpg'}" alt="">
                </div>
                <h3>${pets[i].name}, ${pets[i].age} year(s)</h3>
                <div class="details-grid">
                    <p>Gender:</p>
                    <p>${pets[i].gender}</p>
                    <p>Breed:</p>
                    <p>${pets[i].breed}</p>
                    <p>Service:</p>
                    <p>${pets[i].service}</p>
                    <p>Type:</p>
                    <p>${pets[i].type}</p>
                </div>    
            </div>`;
    }
    document.getElementById("numberRegistered").innerHTML = "Currently Registered: " + pets.length;
}


//Pre-loaded pets
export function startingPets() {
    pets.push(new Pet("Frank Lee", 1, "Male", "Bernedoodle", "Grooming", "Dog", "./img/Frank.jpg"),
    new Pet("Luna Borfuna", 3, "Female", "Golden Mountain", "Nail Trim", "Dog", "./img/Luna.jpg"),
    new Pet("Chloe Cat", 7, "Female", "Shorthair", "Bath", "Cat", "./img/Chloe.jpg"),
    new Pet("Freyja the Butt", 3, "Female", "Shorthair", "Attitude Adjustment", "Cat", "./img/Freyja.jpg")
);
    savePetsToLocalStorage(pets);
}


//OnLoad
function init() {
    if (pets.length === 0) {
        startingPets(); // Add default pets if no pets are in local storage
    }
    petsDisplay();

    document.getElementById('registerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        register(); 
    });
}



window.addEventListener('load', init);