//Get pets
import { loadPetsFromLocalStorage, savePetsToLocalStorage } from './utilities.js';

let pets = loadPetsFromLocalStorage();


//Pets Table
function displayRows() {
    const table = document.getElementById("petRows");
    let rows = "";

    for (let i = 0; i < pets.length; i++) {
        rows += `
            <tr id="${i}">
                <td>${pets[i].name}</td>
                <td>${pets[i].age}</td>
                <td>${pets[i].gender}</td>
                <td>${pets[i].breed}</td>
                <td>${pets[i].service}</td>
                <td>${pets[i].type}</td>
                <td><button class="btn btn-sm btn-danger" onclick="deletePet(${i})">Delete</button></td>
            </tr>`;
    }

    table.innerHTML = rows;
    document.getElementById("registeredPets").innerHTML = "Total Registered: " + pets.length;
}

function deletePet(petID) {
    //console.log("Delete");
    let rowToRemove = document.getElementById(petID);
    if (rowToRemove) {
        rowToRemove.remove();
    } else {
        console.error("Pet with ID", petID, "not found.");
    }

    pets.splice(petID, 1);
    savePetsToLocalStorage(pets);
    displayRows();
}

window.deletePet = deletePet; //Needed due to module handling.. REMEMBER THIS!


//Search
function search() {
    let searchText = document.getElementById("txtSearch").value;
    displayRows();

    if (searchText) {
        const rows = document.querySelectorAll("#petRows tr");//Specifying Rows
        //Keeping rows that match search, Hiding those that do not. NIFTY!
        rows.forEach(row => { 
            const name = row.cells[0].textContent.toLowerCase();
            if (!name.includes(searchText.toLowerCase())) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
            }
        });
    }
}
//Auto run the search
document.getElementById("txtSearch").addEventListener("input", search);


//onLoad
function init() {
    displayRows();
    //console.log("Init");
}

window.addEventListener('load', init);