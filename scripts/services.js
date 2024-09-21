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
        <option value="${services[i].name}">$${services[i].cost} ${services[i].name}</option>`
    };
    $('#txtService').append(dropDown);
};

//Load services to Accordion
function servicesAccordion() {
    let accordion = "";

    for (let i = 0; i < services.length; i++) {
        // Generate unique IDs for each accordion item
        const headingId = `heading${i}`;
        const collapseId = `collapse${i}`;

        accordion += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="${headingId}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="${collapseId}">
                ${services[i].name}
                </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse ${i === 0 ? 'show' : ''}" aria-labelledby="${headingId}" data-bs-parent="#servicesAccordion">
                <div class="accordion-body">
                    <p>Cost: $${services[i].cost}</p>
                    <p>${services[i].desc}</p>
                </div>
            </div>
        </div>
        `;
    }

    $('#servicesAccordion').html(accordion);
}

//Default Services load
function startingServices() {
    console.log('Starting services');
    services.push(
    new Service("Basic Grooming", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit repellendus dignissimos accusamus id dicta itaque amet tenetur nihil tempora! Aliquid temporibus itaque voluptatum, est fuga accusamus nulla illum repudiandae reprehenderit?", 50),
    new Service("Nail Trimming", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit repellendus dignissimos accusamus id dicta itaque amet tenetur nihil tempora! Aliquid temporibus itaque voluptatum, est fuga accusamus nulla illum repudiandae reprehenderit?", 35),
    new Service("Bath", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit repellendus dignissimos accusamus id dicta itaque amet tenetur nihil tempora! Aliquid temporibus itaque voluptatum, est fuga accusamus nulla illum repudiandae reprehenderit?", 40),
    new Service("Package 1", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit repellendus dignissimos accusamus id dicta itaque amet tenetur nihil tempora! Aliquid temporibus itaque voluptatum, est fuga accusamus nulla illum repudiandae reprehenderit?", 75)
);
    saveServicesToLocalStorage(services);
}

//OnLoad
function init(){
    //console.log('services');
    
    if(services.length == 0){
        console.log(services.length);
        startingServices();
    }
    loadServicesFromLocalStorage();
    adminServicesDisplay();
    $('#submitServicesBtn').on('click',submitNewService);
    servicesDropDown();
    servicesAccordion();
};

window.onload = init;