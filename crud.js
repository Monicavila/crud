import preLoadedCars from './cars.js';

/*First access local storage and load local storage data if is available
If not available write the data from the cars.js array (get item = null)
Last write data in local storage*/

////MANAGE STORAGE AND DISPLAY HTML
//Check content in localStorage
const loadCarsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem ('carsLabel'));
};
//Repeat the action save at localStorage
const saveCarsInStorage = () => {
    const arrayCars = preLoadedCars;
    localStorage.setItem('carsLabel', JSON.stringify(arrayCars, null, 2));
    return loadCarsFromLocalStorage();
};
//From Array preLoadedCars and set at localStorage
const loadArrayCarList = () => {
    if (!localStorage.getItem('carsLabel')) {
        saveCarsInStorage();
    }
    return loadCarsFromLocalStorage();
};
//Display in screens
function pritnCarsToScreen() {   
    const displayCarList = (carsToPrint) => {
        const carList = document.getElementById('list');
        const formatterDolar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        if (carList) {
            let rows = '';
             carsToPrint.forEach( car => {
                rows += `<tr>
                            <th>${car.brand}</th>
                            <th>${car.model}</th>
                            <th>${car.color}</th>
                            <th>${car.year}</th>
                            <th>${formatterDolar.format(car.price)}</th>
                            <th>
                            <button onclick="removeCar(${car.id})" class="btn btn-danger">Delete</button>
                            </th>
                            <th>
                            <button onclick="editCar(${car.id})" class="btn btn-warning">Edit</button>
                            </th>
                        </tr>`;
            });
            carList.innerHTML = rows;
        }
    };
    let cars = loadArrayCarList ();
    displayCarList(cars);
};
//Assign an id to a new Car
function assignId() {
    let id;
    let arrayLenght = preLoadedCars.length;
    if (!preLoadedCars.length) {
        id = 1;
    }
    if (preLoadedCars.length !== 0) {
        id = preLoadedCars[arrayLenght-1].id+1;
    }
    return id;
};

//// ADD A NEW CAR
document.querySelector('#btn-add').addEventListener('click', function addCarToPreList() {
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
    var carToAdd = {
        id: id,
        brand: brandValue,
        model: modelValue,
        color: colorValue,
        year: yearValue,
        price: priceValue
    };
    //Add new car to array cars (PreList)
    preLoadedCars.push(carToAdd);
    //Add new car to locaStorge
    saveCarsInStorage();
    //Add new car to inner.HTML
    pritnCarsToScreen();

});

////DELETE A CAR IN THE AEAY
function removeCar(id) {
    
    //Pop-op an advice to confirm delete action
    if (window.confirm('Are you sure you want to delete this car?')) { 
        const index = preLoadedCars.findIndex(car => car.id === id);
        //Delete car in the array cars (PreList)
        preLoadedCars.splice(index, 1);
    }
    //Delete car in the locaStorge
    saveCarsInStorage();
    //Delete car at inner.HTML
    pritnCarsToScreen();
};

////EDIT A CAR
let editingCar = {}; //Object with edited values
//Get values as a result of edit a car in the list
function editCar(idToEdit) {

    //Active and desactive buttons Save vs Add
    var y = document.getElementById('btn-add');
    if (y.style.display === 'block') {
    y.style.display = 'none';
    } 
    var x = document.getElementById('btn-save');
    if (x.style.display === 'none') {
    x.style.display = 'block';
    } 
    //Identify the car is editing
    const editingCar = preLoadedCars.find((car) => car.id === idToEdit);
    document.getElementById('brand').value = editingCar.brand;
    document.getElementById('model').value = editingCar.model;
    document.getElementById('color').value = editingCar.color;
    document.getElementById('year').value = editingCar.year;
    document.getElementById('price').value = editingCar.price;

    //Edit values in the locaStorge
    saveCarsInStorage();
    //Edit values at inner.HTML
    pritnCarsToScreen();
};
//Save chages in edit car function
document.querySelector('#btn-save').addEventListener('click', function saveEditedCar() {
    
    //Active and desactive buttons Add vs Save
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
    saveCarsInStorage();
    //Save update values at inner.HTML
    pritnCarsToScreen();

});
pritnCarsToScreen(); // ALWAYS AFTER ALL THE FUNCTIONS
window.removeCar = removeCar;
window.editCar = editCar;