// using selectors inside the element approach

const questions = document.querySelectorAll(".question");

questions.forEach(function(question) {
    const btn = question.querySelector(".question-btn");
    btn.addEventListener("click", function () {
        questions.forEach(function (item) {
            if (item !== question) {
                item.classList.remove("show-text");
            }
        })
        question.classList.toggle("show-text");
    })
})


// traversing the dom approach

// Traversing the DOM means to go up and/or down the list of objects
// ie: console logging an event to detemine the tree structure
// necessary for targeting specific classes/ids

/*
const btns = document.querySelectorAll('.question-btn');

btns.forEach(function(btn){
    btn.addEventListener('click', function(e){
        const question = e.currentTarget.parentElement.parentElement;
        question.classList.toggle('show-text');
    });
});

*/
