const goalCount = {"water": 10,"meals": 3, "brain": 1, "outdoors": 1,"cardio": 1,"lift": 1,"stretch":1,"social":1, "social_media": 0}

let goalCurrent = {"water": 0,"meals": 0, "brain": 0, "outdoors": 0,"cardio": 0,"lift": 0,"stretch":0,"social":0, "social_media": 0}


let now = new Date(new Date().toLocaleString("en-US", {timeZone: "CST"}));

let start = new Date(now.getFullYear(), 0, 0);
let diff = now - start;
let oneDay = 1000 * 60 * 60 * 24;
let day = Math.floor(diff / oneDay);

let lastDay = localStorage.getItem("last_day")
if(lastDay){
    lastDay = Number(lastDay)
    if(lastDay !== day){
        localStorage.setItem("last_day", day)
        resetGoals()
    }
}
else{
    localStorage.setItem("last_day", day)
    resetGoals()
}

//cardio on odd days, lift on even days
if(day % 2 === 0){
    let eToHide = document.getElementById("cardio")
    eToHide.style.display = ("none")
}
else{
    let eToHide = document.getElementById("lift")
    eToHide.style.display = ("none")
}

let buttonList = document.getElementsByClassName("background")

for(i = 0; i<buttonList.length; i++){
    let button = buttonList[i]
    let categoryLong = button.id
    let category = categoryLong.substring(0,categoryLong.indexOf("-"))

    button.addEventListener("click",()=>addGoodThing(category))
    addBackground(category)
}

function resetGoals(){
    for( let key in goalCount){
        localStorage.setItem(key, 0)
    }
}

function addGoodThing(category){
    let current = Number(localStorage.getItem(category))

    if(!current){
        current = 0
        localStorage.setItem(category,current)
    }
    let goal = goalCount[category]

    if(category === "social_media"){
        current = current - 1
        localStorage.setItem(category,current)
        goalCurrent[category] = current

        let backgroundWorking = document.getElementById(category+"-coin")
        let classes = backgroundWorking.getAttribute("class")
        classes = classes.replace("complete","")
        backgroundWorking.setAttribute("class",classes )
        addBackground(category)
    }
    else if(current !== goal){
        current = current + 1
        localStorage.setItem(category,current)
        goalCurrent[category] = current
        addBackground(category)
    }
}

function addBackground(category){
    let current = Number(localStorage.getItem(category))
    
    console.log(category, current)

    let goal = goalCount[category]
    let backgroundWorking = document.getElementById(category+"-coin")

    if(current === goal){
        let classes = backgroundWorking.getAttribute("class")
        classes = classes + " complete"
        backgroundWorking.setAttribute("class",classes )
        backgroundWorking.setAttribute('style', 'background: radial-gradient(rgb(183, 255, 200) 0%, rgb(183, 255, 200) 55%, rgb(0, 173, 95) 75%);');
    }

    else if(goal === 1 || category === "social_media"){
        backgroundWorking.setAttribute('style', 'background: radial-gradient(white 45%, pink 45%,transparent 55%, transparent,rgba(0,0,0,0)), conic-gradient(from 180deg, rgba(255, 255, 255, 0.701));');
    }

    else{
        let degPerSeg = (360 - goal)/goal
        let segNum = 1

        let backToAdd = "background: radial-gradient(white 45%, pink 45%,transparent 55%, transparent), conic-gradient(from 179.5deg, pink 0deg, pink 1deg"

        while(segNum <= goal){
            let spot1 = (degPerSeg*(segNum-1))+1
            let spot2 = degPerSeg*segNum
            let spot3 = (degPerSeg*segNum)+1

            if(segNum <= current){
                backToAdd = backToAdd + ',rgb(254, 104, 129) ' + spot1 +'deg, rgb(254, 104, 129) ' + spot2 +'deg'
            }
            else{
                backToAdd = backToAdd + ',rgba(255, 255, 255, 0.701) ' + spot1 +'deg, rgba(255, 255, 255, 0.701) ' + spot2+'deg'
            }

            if(segNum < goal){
                backToAdd = backToAdd + ', pink ' + spot2 +'deg, pink ' + spot3 +'deg'
            }

            segNum = segNum + 1
        }
        backToAdd = backToAdd + ");"

        backgroundWorking.setAttribute('style', backToAdd);
    }
}
