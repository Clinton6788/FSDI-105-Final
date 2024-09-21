//Local sotrage handling
function loadServicesFromLocalStorage() {
    const servicesData = localStorage.getItem('services');
    if (servicesData) {
        return JSON.parse(servicesData);
    }
    return [];
}
function saveServicesToLocalStorage(services) {
    localStorage.setItem('services', JSON.stringify(services));
}
let services = loadServicesFromLocalStorage();

//Constructor
class Service {
    constructor(name, desc, cost) {
        this.name = name;
        this.desc = desc;
        this.cost = cost;
    }
};

//Validation
function validateForm(){
    let servicesName = $('#servicesName').val();
    let servicesDesc = $('#servicesDesc').val();
    let servicesCost = $('#servicesCost').val();
    if(servicesName === "" || servicesDesc === "" || servicesCost === ""){
        alert('All fields are required.');
        return false;
    }
    return true;
};

    
//Submit Form

function submitNewService(){
    if(!validateForm()){
        return;
    }
    const servicesName = $('#servicesName').val();
    const servicesDesc = $('#servicesDesc').val();
    const servicesCost = $('#servicesCost').val();
    const newService = new Service(servicesName, servicesDesc, servicesCost)
    services.push(newService);
    saveServicesToLocalStorage(services)
    $('.small-inputs-space input').val("");
    $('.services-form textarea').val("");
    console.log(servicesName);
    console.log('submit function');
    adminServicesDisplay();
};

//Clear Form
// function clearForm() {
//     $('#servicesName').val('');
//     $('#servicesDesc').val('');
//     $('#servicesCost').val('');
// }

//Display current Services on ADMIN
function adminServicesDisplay(){
    const table = $('#serviceRows');
    let rows = "";

    for(let i=0; i < services.length; i++){
        rows +=`
            <tr id="${i}">
                <td>${services[i].name}</td>
                <td>$${services[i].cost}</td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteService(${i})">Delete</button></td>
            </tr>`;
            //console.log(services[i].name);
            
    }
    //console.log('services display');
    
    table.html(rows);
}

//Delete Service
function deleteService(serviceID) {
    //console.log("Delete");
    let rowToRemove = $('#serviceID');
    if (rowToRemove) {
        rowToRemove.remove();
    } else {
        console.error("Service with ID", serviceID, "not found.");
    }

    services.splice(serviceID, 1);
    saveServicesToLocalStorage(services);
    adminServicesDisplay();
}

//Load services to Registration
function servicesDropDown(){
    let dropDown = "";

    for(let i=0;i<services.length;i++){
        dropDown +=`
        <option value="${services[i].name}">${services[i].name} --- $${services[i].cost}</option>`
    };
    $('#txtService').append(dropDown);
};

//OnLoad
function init(){
    //console.log('services');
    loadServicesFromLocalStorage();
    adminServicesDisplay();
    $('#submitServicesBtn').on('click',submitNewService);
    servicesDropDown();
};

window.onload = init;