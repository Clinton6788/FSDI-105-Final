export function loadPetsFromLocalStorage() {
    const petsData = localStorage.getItem('pets');
    if (petsData) {
        return JSON.parse(petsData);
    }
    return [];
}

export function savePetsToLocalStorage(pets) {
    localStorage.setItem('pets', JSON.stringify(pets));
}

export class Pet {
    constructor(name, age, gender, breed, service, type, photo) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.breed = breed;
        this.service = service;
        this.type = type;
        this.photo = photo;
    }
}