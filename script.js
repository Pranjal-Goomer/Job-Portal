
let jobs = [];
let form = document.querySelector("#jobForm");
let jobContainer = document.querySelector("#jobCardsContainer");
let searchForm = document.querySelector("#searchForm");
let searchResults = document.querySelector("#searchResults");

function loadStaticJobs() {
    let remoteJobs = document.querySelectorAll("#remote-jobs article");
    remoteJobs.forEach(article => {
        let title = article.querySelector("h3").innerText.replace(/<u>|<\/u>/g, '');
        let company = article.querySelector("p:nth-child(2)").innerText.replace("Company: ", "");
        let experience = article.querySelector("p:nth-child(3)").innerText.replace("Experience: ", "");
        let location = "Remote";
        let description = ""; 
        jobs.push({ title, company, location, experience, description });
    });

    let mncJobs = document.querySelectorAll("#mnc-jobs article");
    mncJobs.forEach(article => {
        let title = article.querySelector("h3").innerText;
        let company = article.querySelector("p:nth-child(2)").innerText.replace("Company: ", "");
        let location = article.querySelector("p:nth-child(3)").innerText.replace("Location: ", "");
        let experience = ""; 
        let description = "";
        jobs.push({ title, company, location, experience, description });
    });

    let internships = document.querySelectorAll("#internships article");
    internships.forEach(article => {
        let title = article.querySelector("h3").innerText;
        let duration = article.querySelector("p:nth-child(2)").innerText;
        let stipend = article.querySelector("p:nth-child(3)").innerText;
        let description = duration + " " + stipend;
        jobs.push({ title, company: "", location: "", experience: "Fresher", description });
    });
}

function createJobCard(job, container, isPosted = false) {
    let card = document.createElement("article");

    let h3 = document.createElement("h3");
    h3.innerText = job.title;

    let p1 = document.createElement("p");
    p1.innerText = "Company: " + job.company;

    let p2 = document.createElement("p");
    p2.innerText = "Location: " + job.location;

    let p3 = document.createElement("p");
    p3.innerText = "Experience: " + job.experience;

    let p4 = document.createElement("p");
    p4.innerText = job.description;

    card.appendChild(h3);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(p3);
    card.appendChild(p4);

    if (isPosted) {
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        card.appendChild(editBtn);
        card.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", function() {
            container.removeChild(card);
            let index = jobs.indexOf(job);
            if (index > -1) jobs.splice(index, 1);
        });

        editBtn.addEventListener("click", function() {
            document.querySelector("#jobTitle").value = job.title;
            document.querySelector("#companyName").value = job.company;
            document.querySelector("#jobLocation").value = job.location;
            document.querySelector("#jobExperience").value = job.experience;
            document.querySelector("#jobDescription").value = job.description;

            container.removeChild(card);

            let index = jobs.indexOf(job);
            if (index > -1) jobs.splice(index, 1);
        });
    }

    container.appendChild(card);
}


loadStaticJobs();


form.addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.querySelector("#jobTitle").value;
    let company = document.querySelector("#companyName").value;
    let location = document.querySelector("#jobLocation").value;
    let experience = document.querySelector("#jobExperience").value;
    let description = document.querySelector("#jobDescription").value;

    if(title == "" || company == "" || location == "" || experience == "" || description == "") {
        alert("Please fill all fields before submitting");
        return;
    }

    let job = { title, company, location, experience, description };
    jobs.push(job);
    createJobCard(job, jobContainer, true);

    form.reset();
});

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let skills = document.querySelector("#Skills").value.toLowerCase();
    let experience = document.querySelector("#Experience").value;
    let location = document.querySelector("#Location").value.toLowerCase();

    let filteredJobs = jobs.filter(job => {
        let matchSkills = !skills || job.title.toLowerCase().includes(skills) || job.description.toLowerCase().includes(skills);
        let matchExperience = !experience || experience === "Select" || job.experience === experience;
        let matchLocation = !location || job.location.toLowerCase().includes(location);
        return matchSkills && matchExperience && matchLocation;
    });

    searchResults.innerHTML = "";

    if (filteredJobs.length === 0) {
        searchResults.innerHTML = "<p>No jobs found matching your criteria.</p>";
    } else {
        filteredJobs.forEach(job => createJobCard(job, searchResults, false));
    }
});
