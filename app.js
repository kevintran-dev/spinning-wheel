let wheelCanvas = document.getElementById('wheel');
let wheelContext = wheelCanvas.getContext('2d');

let addNameForm = document.getElementById("addNameForm")
let clearWheelForm = document.getElementById("clearWheelForm")
let spinBtn = document.getElementById("spinWheelBtn")

let value = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function () {
    wheelCanvas.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);
}

let nameArray = [];
wheelCanvas.width = 500;
wheelCanvas.height = 500;

// declare the center of the drawing
let x = wheelCanvas.width / 2;
let y = wheelCanvas.height / 2;

// number of segments
let segments = 0;

// number of angles (slices)
let segmentWidth = 360 / segments;

let arrow = document.getElementById("arrow");

// how thick you want a segment
let segmentDepth = 248;


addNameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name");
    nameArray.push(name.value);
    segments++;
    console.log(nameArray, segments)
    drawSegments(segmentDepth);

})
clearWheelForm.addEventListener("submit", (e) => {
    e.preventDefault();
    nameArray = []
    segments = 0
    wheelContext.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
})


function drawSegments(radius) {
    // size of a pie : it is an angle in radians
    let pieAngle = 2 * Math.PI / segments;
    console.log("inside drawsegment", nameArray, segments)
    for (let i = 0; i < segments; i++) {
        let startAngle = i * pieAngle;
        let endAngle = (i + 1) * pieAngle;
        console.log("inside the loop", startAngle, endAngle)
        wheelContext.beginPath();
        if (segments > 1) {
            wheelContext.moveTo(x, y);
        }

        wheelContext.arc(x, y, radius, startAngle, endAngle, false);
        wheelContext.lineWidth = segmentDepth;

        let hueValue = i * 40;
        wheelContext.fillStyle = 'hsl(' + hueValue + ',70%, 60%)';


        wheelContext.fill();
        wheelContext.lineWidth = 2;
        wheelContext.strokeStyle = '#444';
        wheelContext.stroke();

        var pieRadius = Math.min(x, y);
        console.log("pieradius", pieRadius)
        var labelX = x + (pieRadius / 2) * Math.cos(startAngle + (endAngle - startAngle) / 2);
        var labelY = y + (pieRadius / 2) * Math.sin(startAngle + (endAngle - startAngle) / 2);
        console.log("labels", labelX, labelY);
        wheelContext.fillStyle = "black";
        wheelContext.font = "bold 10px Arial";
        wheelContext.fillText(nameArray[i], labelX, labelY);

    }
}

