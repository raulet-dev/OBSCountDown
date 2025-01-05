function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.size > 0) {
        for (const [key, value] of urlParams) {
            const numValue = Number(value);
            params[key] = isNaN(numValue) ? value : numValue;
        }
    }
    return params;
}

function displayQueryParams() {
    const params = getQueryParams();
    if(JSON.stringify(params) === "{}") {
        document.getElementById("display").innerText = "Expected Params: ?year=2025&month=01&day=05&hour=22&minute=50&second=00";
    } else {
        const displayElement = document.getElementById("display");
        const now = new Date()
        const year = parseInt(params.year);
        const month = parseInt(params.month) - 1; // Months are zero-indexed
        const day = parseInt(params.day);
        const hour = parseInt(params.hour);
        const minute = parseInt(params.minute);
        const second = parseInt(params.second);
        const desiredDate = new Date(year, month, day, hour, minute, second)
        let count = Math.floor((desiredDate.getTime() - now.getTime())/1000)
        let timeLeft = getCount(count)
        displayElement.innerText = "Time: " + timeLeft.day + ":" + timeLeft.hour + ":" + timeLeft.minute + ":" + timeLeft.second + "";
    }
}

function getCount(secs){
    let count = {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
    }
    count.second = (secs % 60)<0? 0 : (secs % 60)
    count.minute = (Math.floor(secs / 60) % 60)<0? 0 : (Math.floor(secs / 60) % 60)
    count.hour = (Math.floor(secs / 3600)<0)? 0 : (Math.floor(secs / 3600))
    count.day = ((Math.floor(secs / 86400) -1) < 0)? 0 : (Math.floor(secs / 86400) -1  );
    return count
}

//convert to 2 digit formula
// if (!isNaN(numValue) && numValue >= 0 && numValue <= 9) { params[key] = `0${numValue}`; } else { params[key] = isNaN(numValue) ? value : numValue; }

displayQueryParams();

setInterval(displayQueryParams, 1000);
