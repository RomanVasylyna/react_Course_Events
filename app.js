
// нужные поля index, name, region, population, area, flag
// 2) фильтрация через поисковик. вводим символы - в таблице отображены 
// страны с частичным совпадением по name, capital, region

// Очищаем tbody
const clearElem = selector => {        
$(`${selector}`).html("");    
$(`${selector}`).val(""); 
}

// Задаем события
const setListeners = (object) => {

// Событие для селекта    
// Меняется опция - фильтруются страны согласно региону
$('#select').change(e => {
clearElem('#table tbody');
let newRegions = object.filter(elem => elem.region == e.currentTarget.value);
console.log(newRegions);
addToDom(newRegions);
});

// Событие для инпута
$('#search').keyup(e => {    
// 1. Я ввожу букву 
// 2. Проверяю все страны у которых в названии есть эта буква (через фильтр)
// 3. Обновляю таблицу согласно названию стран   
console.log(e.target.value); 
})

};


// Главная функция
const renderCountries = () => {
// Получаем страны (GET request)
$.ajax('https://restcountries.eu/rest/v2/all')
.then(data => {
console.log(data); // Просто выводим в консоль объекты с результатами
addToDom(data);
filterRegions(data);
setListeners(data);
})
.catch(err => console.log(err)); // Если GET запрос не удался - выводим ошибку
}


// Фильтрация регионов через select
function filterRegions(object) {

// Создаем новый массив с регионами
const regions = object.map(el => {
// Если у страны нет региона, то вместо пробела оставляем "No Region"    s
el.region ? el.region === "" : el.region = "No Region";    
return el.region;  
});

console.log(removeDuplicates(regions));

removeDuplicates(regions).forEach((elem, index) => {
// Наполняем селект регионами    
$('#select').append(`<option value="${elem}">${elem}</option>`);
})
 
}

// Убираем повторы из массива
const removeDuplicates = arr => [...new Set(arr)];


// Добавляем свойства объекта в DOM
const addToDom = object => {
object.forEach((elem, index) => {
$('#table tbody').append(`<tr>
<td>${index+1}</td>
<td>${elem.name}</td>
<td>${elem.capital}</td>
<td>${elem.region}</td>
<td>${elem.population}</td>
<td>${elem.area}</td>
<td><img src="${elem.flag}" width="50px"></img></td>
</tr>`);
})
}
