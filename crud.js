import preLoadedCars from './cars.js';

////VARIABLES
var editingCar = {}; //Object with edited values
let cars = loadCarsList(); // Array to apply all functions

////MANAGE LOCAL STORAGE
/*First access local storage and load local storage data if is available display.
If not available write the data from the cars.js array (get item = null or ! not exist)
Last write data in local storage*/

function loadCarsList() {
    var carsList = [],
        storedList = localStorage.getItem('carsLabel');
    if (storedList !== null) {
        carsList = JSON.parse(storedList);
    }
    else if (!storedList) {
        carsList = preLoadedCars;
    }
    return carsList;
}

function saveToLocalStorage() {
    const arrayCars = cars;
    localStorage.setItem('carsLabel', JSON.stringify(arrayCars));
}

////ASSIGN an ID to a new Car
function assignId() {
    let id;
    let arrayLenght = cars.length;
    if (!cars.length) {
        id = 1;
    }
    if (cars.length !== 0) {
        id = cars[arrayLenght-1].id+1;
    }
    return id;
};

////DISPLAY IN SCREENS
function printCarsToScreen() {   
    const displayCarList = (carsToPrint) => {
        const tBody = document.getElementById('list');
        const formatterDolar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        if (tBody) {
            let rows = '';
             carsToPrint.forEach( car => {
                rows += `<tr>
                            <th>${car.brand}</th>
                            <th>${car.model}</th>
                            <th>${car.color}</th>
                            <th>${car.year}</th>
                            <th>${formatterDolar.format(car.price)}</th>
                            <th class="text-center">
                            <i onclick="editCar(${car.id})" class="fas fa-edit" style="cursor:pointer; color: #307DF6" name="hand"></i>
                            </th>
                            <th class="text-center">
                            <i onclick="removeCar(${car.id})" class="fas fa-trash-alt" style="cursor:pointer; color: red" name="hand"></i>
                            </th>
                        </tr>`;
            });
            tBody.innerHTML = rows;
        }
    };
    displayCarList(cars);
};

//// ADD A NEW CAR
document.querySelector('#btn-add').addEventListener('click', function addACar() {
    const brand = document.getElementById('brand'); //position const in DOM
    const brandValue = brand.value; //save value in new const
    brand.value = ''; //clear data
    const model = document.getElementById('model');
    const modelValue = model.value;
    model.value = '';
    const color = document.getElementById('color');
    const colorValue = color.value;
    color.value = '';
    const year = document.getElementById('year');
    const yearValue = year.value;
    year.value = '';
    const price = document.getElementById('price');
    const priceValue = price.value;
    price.value = '';
    const id = assignId();
    //Define newCar as an object
    //Add new car to array cars (PreList)
    cars.push({
        id: id,
        brand: brandValue,
        model: modelValue,
        color: colorValue,
        year: yearValue,
        price: priceValue
    });
    //Add new car to locaStorge
    saveToLocalStorage();
    //Add new car to inner.HTML
    printCarsToScreen();

});

////DELETE A CAR IN THE ARRAY
/// Splice Cars array
function removeCar(id) {
    
    //Pop-op an advice to confirm delete action
    if (window.confirm('Are you sure you want to delete this car?')) { 
        const index = cars.findIndex(car => car.id === id);
        //Delete car in the array cars (PreList)
        cars.splice(index, 1);
    }
    //Delete car in the locaStorge
    saveToLocalStorage();
    //Delete car at inner.HTML
    printCarsToScreen();
};

////EDIT A CAR
//Get values as a result of edit a car in the list
function editCar(idToEdit) {
    //Active and desactive buttons Save & Add
    var y = document.getElementById('btn-add');
    if (y.style.display === 'block') {
    y.style.display = 'none';
    } 
    var x = document.getElementById('btn-save');
    if (x.style.display === 'none') {
    x.style.display = 'block';
    } 
    //Identify the car is editing
    editingCar = cars.find((car) => car.id === idToEdit);
    document.getElementById('brand').value = editingCar.brand;
    document.getElementById('model').value = editingCar.model;
    document.getElementById('color').value = editingCar.color;
    document.getElementById('year').value = editingCar.year;
    document.getElementById('price').value = editingCar.price;
    
};
//Save chages in edit car function
document.querySelector('#btn-save').addEventListener('click', function saveEditedCar() {
    if (window.confirm('Are you sure you want to save changes?')) {
        //Active and desactive buttons Add & Save
        var y = document.getElementById('btn-add');
        if (y.style.display === 'none') {
            y.style.display = 'block';
        } 
        var x = document.getElementById('btn-save');
        if (x.style.display === 'block') {
            x.style.display = 'none';
        }
        //Save value per value
        const editedBrand = document.getElementById('brand'); //Position const in DOM trought the id
        const editedBrandValue = editedBrand.value; //Get edited values by user
        editingCar.brand = editedBrandValue; //Save update values and assign to editing car
        editedBrand.value = ''; //Clear data
        const editedModel = document.getElementById('model');
        const editedModelValue = editedModel.value;
        editingCar.model = editedModelValue;
        editedModel.value = '';
        const editedColor = document.getElementById('color');
        const editedColorValue = editedColor.value;
        editingCar.color = editedColorValue;
        editedColor.value = '';
        const editedYear = document.getElementById('year');
        const editedYearValue = editedYear.value;
        editingCar.year = editedYearValue;
        editedYear.value = '';
        const editedPrice = document.getElementById('price');
        const editedPriceValue = editedPrice.value;
        editingCar.price = editedPriceValue;
        editedPrice.value = '';
        
        //Save update values in the locaStorge
        saveToLocalStorage();
        //Save update values at inner.HTML
        printCarsToScreen();
    }
});
    

printCarsToScreen(); // ALWAYS AFTER ALL THE FUNCTIONS
window.removeCar = removeCar;
window.editCar = editCar;