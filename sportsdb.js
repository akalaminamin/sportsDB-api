
// load sports wrapper
// const loadSports = async () =>{
//     const resp = await fetch(`https://www.thesportsdb.com/api/v1/json/1/all_sports.php`);
//     const data = await resp.json()
//     displaySportsData(data.sports)
// }

// loadSports();

// // display sport all data in UI
// const displaySportsData = (sports) =>{
//     const sportsWrapper = document.getElementById("sportsWrapper");
//     sports.forEach(sport =>{
//         const div = document.createElement("div");
//         div.classList.add("col");
//         div.innerHTML = `
//         <div class="card h-100">
//             <img src="${sport.strSportThumb}" class="card-img-top" alt="...">
//             <div class="card-body">
//                 <h5 class="card-title">${sport.strSport}</h5>
//                 <p class="card-text">${sport.strSportDescription.slice(0, 80)}</p>
//                 <button class="btn btn-primary">See Details</button>
//             </div>
//         </div> `;
//         sportsWrapper.appendChild(div)
//     })
// }

// searchSports 
const searchSports = async () =>{
    const searchInput = document.getElementById("input");
    const inputValue = searchInput.value;
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputValue}`
    if(inputValue === ''){
        alert("please enter your sport name")
    }else{
        fetch(url)
        const resp = await fetch(url);
        const data = await resp.json()
        await displaySports(data.teams)

        // clear search input
        searchInput.value = '';
    }
}

const displaySports = (data) =>{
    const sportsWrapper = document.getElementById("sportsWrapper");
    sportsWrapper.textContent = "";
    data.forEach(singleData =>{
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100" >
            <img src="${singleData.strStadiumThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${singleData.strSport}</h4>
                <h5>${singleData.strCountry}</h5>
                <p class="card-text">${singleData.strDescriptionEN.slice(0, 80)}</p>
                <button class="btn btn-primary" onclick="loadSingleData('${singleData.idTeam}')" >See Details</button>
            </div>
        </div> `;
        sportsWrapper.appendChild(div)
    })
}

const loadSingleData = (idTeam) =>{
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`)
        .then(resp => resp.json())
        .then(data => displaySingleData(data.teams[0]))
}

const displaySingleData = (item) =>{
    const singleData = document.getElementById("singleData");
    singleData.textContent ="";
    window.scroll(0, 50)
    const div = document.createElement("div");
    div.classList.add("col")
    div.innerHTML =`
    <div class="card h-100" >
        <img src="${item.strStadiumThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">${item.strSport}</h4>
            <h5>${item.strCountry}</h5>
            <p class="card-text">${item.strDescriptionEN}</p>
        </div>
    </div> `
    singleData.appendChild(div);
}




