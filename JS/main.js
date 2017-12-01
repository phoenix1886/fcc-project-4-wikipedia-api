
window.onload = function () {
    var var1Element = document.getElementById('var1');
    var var2Element = document.getElementById('var2');
    var container = document.getElementById('container');
    var inputElement = document.getElementById('search');
    var mainContainer = document.getElementsByTagName('main')[0];

    container.appendChild(var1Element);
    var1Element.style.display = 'block';
    console.log('loaded...');

    var step1Condition = function () {
        mainContainer.style.marginTop = 'auto';
        var searchIcon = document.getElementById('input-icon');
        searchIcon.classList.remove('fa-times');
        searchIcon.classList.add('fa-search');
    };

    var step2Condition = function () {
        mainContainer.style.marginTop = '25px';
        var searchIcon = document.getElementById('input-icon');
        searchIcon.classList.remove('fa-search');
        searchIcon.classList.add('fa-times');
    };


    var showSearchReasults = function (jsonResponse) {
        console.log(jsonResponse);
        var titles = jsonResponse[1];
        var descriptions = jsonResponse[2];
        var urls = jsonResponse[3];
        fillResults(titles, descriptions, urls);
    };

    var fillResults = function (titleArray, descriptionArray, urlError) {
        var resultsContainer = document.getElementById('searchResultsContainer');
        clearContainer(resultsContainer);

        if (titleArray.length == 0){
            var element = createSearchElement('Error', 'No articles found. Try another query.', '');
            resultsContainer.appendChild(element);
            return false;
        }

        for (var i = 0; i < titleArray.length; i++){
            var element = createSearchElement(titleArray[i], descriptionArray[i], urlError[i]);
            console.log(element);
            resultsContainer.appendChild(element);
        }
        var children = resultsContainer.children;
        console.log(children);
        for (var i = 0; i < children.length; i++){
            children[i].firstChild.addEventListener('mouseover', function (event) {
                this.style.backgroundColor = '#e6f9ff';
                // this.children.forEach(function (t) { t.style.backgroundColor = '#e6f9ff'; });
            }, false);
            children[i].firstChild.addEventListener('mouseout', function (event) {
                this.style.backgroundColor = 'white';
            }, false);
        }
    };

    var clearContainer = function(container){
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }
    };

    var createSearchElement = function (title, description, urlRef) {
        var element = document.createElement('a');
        element.setAttribute('href', urlRef);
        element.setAttribute('target', '_blank');
        element.setAttribute('class', 'result-anchor')

        element.innerHTML = '<div class="searchResult"><h1>' + title +'</h1>' +
                            '<p>' + description + '</p></div>';

        console.log(element.innerHTML);
        return element;
    };

    var searchInWiki = function(word) {
        $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',
                dataType: 'jsonp',
                data: {
                    action: 'opensearch',
                    format: 'json',
                    limit: 10,
                    search: word
                },
                success: showSearchReasults
            }
        );
    };


    var searchElement = document.getElementById('search-anchor');

    searchElement.onclick = function () {
        var1Element.style.display = 'none';
        container.appendChild(var2Element);
        var2Element.style.display = 'block';
        inputElement.focus();
        // mainContainer = document.getElementsByTagName('body')[0];
        mainContainer.appendChild(var1Element);
        return false;
    };


    $('#search').on('search', function (event) {
        console.log('trigerred');
        step2Condition();
        var word = inputElement.value;
        searchInWiki(word);
    });



    var searchIconAnchor = document.getElementById('input-icon-anchor');

    searchIconAnchor.onclick = function (event) {

       if (searchIconAnchor.firstElementChild.classList.contains('fa-times')){
           inputElement.value = '';
           step1Condition();
           var2Element.style.display = 'none';
           container.appendChild(var1Element);
           var1Element.style.display = 'block';
           inputElement.focus();
           // mainContainer = document.getElementsByTagName('body')[0];
           mainContainer.appendChild(var2Element);

           var searchResults = document.getElementById('searchResultsContainer');
           clearContainer(searchResults);
           return false;
       } else {
           console.log('ahaha');

            $('#search').trigger("search");
           return false;
       }
    };




};