'use strict';


for (let i = 1; i < 7; i++) {
    let categoryNumber = ".category" + i;
    $(categoryNumber).click(event => {
        event.preventDefault();
        let query = $(categoryNumber).text();
        console.log(query);
        query = query.replace(/\W/g, '')
        sessionStorage.setItem('actionQuery', query);
        window.location.href = "searchpage.html"; 
    })
}

for (let i = 1; i < 7; i++) {
    let categoryNumber = ".category-" + i;
    $(categoryNumber).click(event => {
        event.preventDefault();
        let query = $(categoryNumber).text();
        console.log(query);
        query = query.replace(/\W/g, '')
        sessionStorage.setItem('actionQuery', query);
        window.location.href = "searchpage.html"; 
    })
}