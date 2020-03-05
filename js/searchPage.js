'use strict';
window.onload=function() {
// Base of the url for performing a search
    const urlBase = "https://www.googleapis.com/books/v1/volumes?q=";

    if(sessionStorage.getItem('actionQuery')) {
        if ($('.search-container').length !== 0) {
            $('.search-container').empty();
        }
        renderURL(sessionStorage.getItem('actionQuery'), "subject");
        sessionStorage.removeItem('actionQuery');
    }

    if(sessionStorage.getItem('inputQuery')) {
        if ($('.search-container').length !== 0) {
            $('.search-container').empty();
        }
        renderURL(sessionStorage.getItem('inputQuery'), "intitle");
        sessionStorage.removeItem('inputQuery');
    }

    $('#search-btn').click( event => {
        event.preventDefault();
        // get the value of book search input and construct the API query
        let query = $('#search-book-box').val();
        if ($('.search-container').length !== 0) {
            $('.search-container').empty();
        }
        renderURL(query, "intitle");
    })

    $("#search-btn-responsive").click(event => {
        event.preventDefault();
        let query = $("#search-box-responsive").val();
        if ($('.search-container').length !== 0) {
            $('.search-container').empty();
        }
        renderURL(query, "intitle");
    })

    $('#search-form-submit').click( event => {
        event.preventDefault();
        // get the value of book search input and construct the API query
        let query = $('#search-form').val();
        $('.search-container').empty();
        renderURL(query, "intitle");
    })

    function renderURL(givenQuery, titleTerm) {
        let query = givenQuery.replace(/\s/g, '');
        let paginationTerm = "maxResults=";
        let paginationNumber = 40;
        let url = urlBase + query + "+" + titleTerm + "&" + paginationTerm + paginationNumber;
        renderData(givenQuery, url)
    }

    function renderData(givenQuery, url) {
        let t0 = performance.now(); // for testing speed
        // Fetch the data at that url, then return the .json() of that response
        fetch(url)
            .then(response => response.json())
            // Pass the results to the renderSearchResults
            .then(data => renderSearchResults(data))
            // Catch any of the errors
            .catch(error => console.error(error));
        let t1 = performance.now();  // for testing speed
        let speedTestText = "Took " + (t1 - t0) + " milliseconds to generate the result for '" + givenQuery + "'";
        $("#search-result").empty().append(document.createTextNode(speedTestText));
        return false;
    }

    // function to render search results. It iterates though items in the passed results and call the renderItem function
    function renderSearchResults(results) {
        if (results) {
            if ($('.search-container').length === 0) {
                let ul = $("<ul>");
                ul.addClass('search-container');
                ul.insertAfter("#search-result");
            }
            let li = $('<li>');
            $('.search-container').append(li);
            //iterate through the passed in results and call the renderItem function 
            if (results.items) {
                results.items.map(item => renderItem(item, li));
            }
        }
    }

    // function to render an <li> inside of the search container
    function renderItem(item, parent) {
        let searchCard = $('<div>');
        searchCard.addClass("search-card");
        parent.append(searchCard);
        let searchResultImg = $('<div>');
        searchCard.append(searchResultImg);
        searchResultImg.addClass('search-result-img');
        let resultImage = $('<img>');
        let imageLinks = item.volumeInfo.imageLinks;
        if (imageLinks) {
            resultImage.attr("src", imageLinks.thumbnail);
        } else {
            resultImage.attr("src", 'img/img-not-available.png');
        }
        searchResultImg.append(resultImage);
        let searchInfo = $('<div>');
        searchInfo.addClass('search-info');
        searchCard.append(searchInfo);
        let searchInfoTitle = $('<h2>');
        let bookTitle = item.volumeInfo.title;
        searchInfoTitle.addClass('search-info-title');
        searchInfoTitle.append(document.createTextNode(bookTitle));
        searchInfo.append(searchInfoTitle);

        // display author
        let authorName = "Author(s): "
        if (item.volumeInfo.authors) {
            let authorNameArray = item.volumeInfo.authors;
            authorName += authorNameArray[0];
            for (let i = 0; i < authorNameArray.length; i++) {
                authorName += ", " + authorNameArray[i];
            }
        } else {
            authorName += " Unknown"
        }
        let author = $("<p>").append(document.createTextNode(authorName));
        searchInfo.append(author);
        let price = "Price: "
        if (item.saleInfo.listPrice) {
            let bookListPirce = item.saleInfo.listPrice;
            let bookPrice = bookListPirce.amount;
            let bookPriceCurrency = bookListPirce.currencyCode;
            price += bookPrice + " " + bookPriceCurrency;
        } else {
            let saleability = item.saleInfo.saleability;
            if (saleability === 'NOT_FOR_SALE') {
                saleability = 'NOT FOR SALE';
            }
            price += saleability;
        }
        let priceNode = $("<p>").append(document.createTextNode(price));
        searchInfo.append(priceNode);
        // Display EBook Availability
        let eTextNode = $("<p>");
        eTextNode.addClass("text-left");
        searchInfo.append(eTextNode);
        let etextSpan = $('<span>').append(document.createTextNode("E-Book Availability: "));
        eTextNode.append(etextSpan);

        if(item.accessInfo.viewability !== "NO_PAGES") {
            if(item.accessInfo.webReaderLink) {
                let eTextLink = $("<a>").append(document.createTextNode("Availabile"));
                eTextLink.attr('href', item.accessInfo.webReaderLink);
                eTextLink.attr('target', '_blank');
                eTextNode.append(eTextLink);
            }
        } else {
            let eTextLink = $("<span>").append(document.createTextNode("Not Availabile"));
            eTextNode.append(eTextLink);
        }

        // Display ISBN
        let identifierNode = $("<p>");
        identifierNode.addClass("text-left");
        searchInfo.append(identifierNode);
        if (item.volumeInfo.industryIdentifiers) {
            let identifierArray = item.volumeInfo.industryIdentifiers;
            for (let i = 0; i < identifierArray.length; i++) {
                let type = item.volumeInfo.industryIdentifiers[i].type + ": ";
                type = type.replace(/_/g, "-");
                if (type !== 'OTHER: ') {
                    let identifierSpan = $('<span>').append(type);
                    identifierNode.append(identifierSpan);
                }
                let identifier = item.volumeInfo.industryIdentifiers[i].identifier;
                let isbn = $("<span>").append(identifier);
                identifierNode.append(isbn);
                identifierNode.append($('<br>'));
            }
        } else {
            let isbn = $("<span>").append(document.createTextNode("Not Found"));
            identifierNode.append(isbn)
        }
    }
}