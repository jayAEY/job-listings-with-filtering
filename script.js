let main = document.querySelector("main")
let filterBar = document.querySelector("#filter")
let clear = document.querySelector("#clear")
let filterList = []

async function getData() {
    // retrieve json data
    let response = await fetch("./data.json");
    let data = await response.json()

    // create panels with data
    data.forEach((job) => main.innerHTML += createJobPanel(job.company, job.logo, job.new, job.featured, job.position, job.role, job.level, job.postedAt, job.contract, job.location, job.languages, job.tools))

    let tags = document.querySelectorAll(".tag")
    let jobPanels = document.querySelectorAll(".job-panel")

    // click events for adding filters and clearing them 
    tags.forEach(tag => tag.addEventListener("click", () => addFilter(tag)))
    clear.addEventListener("click", () => clearAllFilters())

    function addFilter(tag) {
        // toggles viisibility of filter bar
        filterBar.style.display = "flex"

        // creates html for selected filter tags and adds them to the filter bar
        let filterTag = `<p class="filter-tag ${tag.innerText}">${tag.innerText}<span class="tag-close">&times</span></p>`

        // adds filter to filter list if it's not already there and filters based on filter list
        if (!filterList.includes(tag.innerText)) {
            filterBar.firstElementChild.innerHTML += filterTag
            filterList.push(tag.innerText)
        }
        filter()

        // click events for the close buttons
        let closeButtons = document.querySelectorAll(".tag-close");
        closeButtons.forEach(button => button.addEventListener("click", () => clearOneFilter(button)))
        closeButtons.forEach(button => button.addEventListener("click", () => filter()))
    }

    function clearOneFilter(self) {
        // note - self is the close buttons

        // selects filter names starting from the close buttons
        let filter = self.parentElement.innerText.toString()
        let filterName = filter.slice(0, filter.length - 2)

        // removes filters from filter list and filter bar
        if (filterList.includes(filterName)) {
            filterList = filterList.filter(filter => filter != filterName)
        }
        self.parentElement.remove()
        self.remove()

        // changes filter bar visiilty if there are no filters selected
        if (filterList.length < 1) {
            filterBar.style.display = "none"
        }
    }

    function filter() {
        jobPanels.forEach(panel => {
            // creates array of filter tags for each panel 
            let panelTags = [...panel.lastElementChild.children]
            panelTags = panelTags.map((tag) => tag.innerText)

            // toggles panel visibility based on selected filter tags
            if (filterList.every(tag => panelTags.includes(tag))) {
                panel.style.display = "flex"
            } else {
                panel.style.display = "none"
            }
        }
        )
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
}

function createJobPanel(company, logo, isNew, featured, position, role, level, postedAt, contract, location, languages, tools) {
    // creates html for each job panel based on json data

    // creates html dynamically based on number of languages
    function languageReturn(languages) {
        let tags = ""
        for (let i = 0; i < languages.length; i++) {
            tags += `<p class="tag">${languages[i]}</p>`
        }
        return tags
    }

    // creates html dynamically based on number of tools
    function toolsReturn(tools) {
        let toolTags = ""
        for (let i = 0; i < tools.length; i++) {
            toolTags += `<p class="tag">${tools[i]}</p>`
        }
        return toolTags
    }

    return (
    `<div class="job-panel ${featured ? "featured" : ""}">
        <img alt="${company} logo" class="logo" src="${logo}">
        <div class="non-tag-section">
        <div class="company-section">
            <p class="company">${company}</p>
            ${isNew ? `<p class="new">New!</p>` : ""}
            ${featured ? `<p class="featured-text">Featured</p>` : ""}
        </div>
        <p class="title">${position}</p>
        <div class="description"><p>${postedAt}</p> • <p>${contract}</p> • <p>${location}</p></div>
        <span class="line"></span>
        </div>
        <div class="tag-section">
        <p class="tag">${role}</p>
        <p class="tag">${level}</p>
        ${languageReturn(languages)}
        ${toolsReturn(tools)}
        </div>
    </div>`
    )
}

window.onload = getData