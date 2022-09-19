// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
// offsetTop - A Number, representing the top position of the element, in pixels
//
//The if statement:
// if(condition such as containerHeight === 0) {
//      this set of brackets represents the THEN part of the if statement
//      then change it to the cosen value
// }
// else this rperesents the alternative to the then statement



// ********** set date ************

const date = document.getElementById("date");
    date.innerHTML = new Date().getFullYear();


// ********** close links ************

const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function(){
/*
    This method has issues due to fixed height in css of the links container / show links
    linksContainer.classList.toggle("show-links");
*/
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    // Dynamically sets the height of the links container to the retrieved value from the linksHeight query
    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }

});


// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function(){
    const scrollHeight = this.window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if(scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }

    if(scrollHeight > 750) {
        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link");
    }
})


// ********** smooth scroll ************

// Select internal page links with precision
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        // This prevents the default which is currently out of frame
        e.preventDefault();
        // Find internal link reference # to dynamically set internal links
        const  id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        // Calculate the height
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav");
        let position = element.offsetTop - navHeight;

        if(!fixedNav){
            position = position - navHeight;
        }

        if(navHeight > 82){
            position = position + containerHeight;
        }

        window.scrollTo({
            left:0,top:position,
        });
        linksContainer.style.height = 0;
    });
})