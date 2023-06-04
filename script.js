let filterBar = document.querySelector("#filter");
let tags = document.querySelectorAll(".tag")
let clear = document.querySelector("#clear")
let jobPanels = document.querySelectorAll(".job-panel")

let filterList = []

function addFilter(tag) {
    filterBar.style.display = "flex"
    let filterTag = `<p class="filter-tag ${tag.innerText}">${tag.innerText}<span class="tag-close" onClick="clearOneFilter(this);filter()">&times</span></p>`
    if (!filterList.includes(tag.innerText)){
        filterBar.firstElementChild.innerHTML += filterTag 
        filterList.push(tag.innerText)
    }
    filter()
}

function clearOneFilter(self) {
    let filter = self.parentElement.innerText.toString()
    let filterName = filter.slice(0,filter.length - 2)
    if (filterList.includes(filterName)) {
        filterList = filterList.filter(filter => filter != filterName)
    }
    self.parentElement.remove()
    self.remove()
    if (filterList.length < 1) {
        filterBar.style.display = "none"
    }
}

function clearAllFilters() {
    let filterTags = document.querySelectorAll(".filter-tag")
    filterTags.forEach(filterTag => filterTag.remove())
    filterList = []
    jobPanels.forEach(panel => panel.style.display = "flex")
    if (filterList.length < 1) {
        filterBar.style.display = "none"
    }
}

function filter() {
    jobPanels.forEach(panel => {
        let panelTags = [...panel.lastElementChild.children]
        panelTags = panelTags.map((tag) => tag.innerText)
        if (filterList.every(tag => panelTags.includes(tag))) {
            panel.style.display = "flex"
        } else {
            panel.style.display = "none"
        }
        } 
    )
}

tags.forEach(tag => tag.addEventListener("click", () => addFilter(tag)))
clear.addEventListener("click", () => clearAllFilters())