const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('reset');
const resultDiv = document.getElementById('result');


// Königsberg bridges and landmarks (coordinates for reference)
const bridges = [
    { id: 'bridge1', x1: 225, y1: 160, x2: 245, y2: 190},
    { id: 'bridge2', x1: 300, y1: 160, x2: 320, y2: 190 },
    { id: 'bridge3', x1: 390, y1: 160, x2: 420, y2: 195 },
    { id: 'bridge4', x1: 375, y1: 205, x2: 400, y2: 225 },
    { id: 'bridge5', x1: 240, y1: 235, x2: 260, y2: 260 },
    { id: 'bridge6', x1: 180, y1: 235, x2: 200, y2: 260 },
    { id: 'bridge7', x1: 400, y1: 300, x2: 425, y2: 335 },
    
];

// Landmasses defined as polygons
const landmasses = [
    // Landmass 1
    [
        { x: 0, y: 225 },
        { x: 142, y: 240 },
        { x: 208, y: 168 },
        { x: 600, y: 168 },
        { x: 600, y: 0 },
        { x: 0, y: 0 },
    ],
    [
        { x: 215, y: 178 },
        { x: 383, y: 184 },
        { x: 380, y: 238 },
        { x: 173, y: 242 },
    ],
    [
        { x: 400, y: 187 },
        { x: 385, y: 303 },
        { x: 522, y: 303 },
        { x: 571, y: 279 },
        { x: 600, y: 283 },
        { x: 600, y: 187 },
    ],
    [
        { x: 360, y: 256 },
        { x: 32, y: 254 },
        { x: 0, y: 251 },
        { x: 0, y: 400 },
        { x: 600, y: 400 },
        { x: 600, y: 307 },
        { x: 569, y: 303 },
        { x: 484, y: 331 },
        { x: 383, y: 327 },
        { x: 345, y: 292 },
    ],
];

let linePoints = [];

// Track drawing
let isDrawing = false;
let clickedBridges = new Set();
let lastPoint = null;
let enteredBridge = null;
let landMassOfOrigin = null;

// Background image
const backgroundImage = new Image();
backgroundImage.src = 'koningsbergen_in_1652.jpg';

// Ensure the map is drawn when the image has loaded
backgroundImage.onload = () => {
    drawMap(); // Call the drawMap function to render the image and other elements
};


// Draw a polygon from an array of points
function drawPolygon(points, fillStyle = '#8fbc8f', strokeStyle = '#000') {
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
}

// Draw the map
function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    
     // Draw landmasses
    //landmasses.forEach(landmass => drawPolygon(landmass));

      // Draw the line
      for (let i = 0; i < linePoints.length - 1; i++) {
        const currentPoint = linePoints[i];
        const nextPoint = linePoints[i + 1];
        ctx.beginPath();
        ctx.moveTo(currentPoint.x, currentPoint.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    

    // Draw bridges
    bridges.forEach(bridge => {
        ctx.beginPath();
        // Draw rectangle from x1, y1 to x2, y2
        ctx.rect(bridge.x1, bridge.y1, bridge.x2 - bridge.x1, bridge.y2 - bridge.y1);
        ctx.strokeStyle = clickedBridges.has(bridge.id) ? 'green' : 'blue';
        ctx.lineWidth = 5;
        ctx.stroke();
    });
}

// Check if a line crosses a bridge
function checkBridgeCrossed(x, y) {
    // Get any bridge that the line crosses
    return bridges.find(bridge => {
        const { x1: bx1, y1: by1, x2: bx2, y2: by2 } = bridge;
        return x >= bx1 && x <= bx2 && y >= by1 && y <= by2
    });
}

// Check if a point is inside a polygon
function isPointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect =
            yi > point.y !== yj > point.y &&
            point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}

// Check if a point is on a bridge
function isPointOnBridge(x, y) {
    return bridges.some(bridge => {
        return x >= bridge.x1 && x <= bridge.x2 && y >= bridge.y1 && y <= bridge.y2;
    });
}

// Start drawing
canvas.addEventListener('mousedown', e => {
    isDrawing = true;
    lastPoint = { x: e.offsetX, y: e.offsetY };
});

// Continue drawing
canvas.addEventListener('mousemove', e => {
    if (!isDrawing) return;

    const currentPoint = { x: e.offsetX, y: e.offsetY };

     // Check if the current point is in water
     const onLandmass = landmasses.some(landmass => isPointInPolygon(currentPoint, landmass));
     const onBridge = isPointOnBridge(currentPoint.x, currentPoint.y);
     let currentLandmass = landmasses.find(landmass => isPointInPolygon(currentPoint, landmass));
     let currentBridge = checkBridgeCrossed(currentPoint.x, currentPoint.y);
 
     if (!onLandmass && !onBridge) {
        stopDrawing('Je bent in de rivier gevallen! Probeer opnieuw.');
         return;
     }

    linePoints.push(currentPoint);
     
    // Add to crossed if the line exits the bridge
    if (currentBridge) {
        if (clickedBridges.has(currentBridge.id)) {
            stopDrawing('Deze brug heb je al overgestoken! Probeer opnieuw.');
            return;
        }
        if (!enteredBridge){
            enteredBridge = currentBridge;
            landMassOfOrigin = currentLandmass;
        }
    } else {
        if (enteredBridge && currentLandmass !== landMassOfOrigin){ 
            clickedBridges.add(enteredBridge.id);
            enteredBridge = null
            landMassOfOrigin = null;
        } else if (enteredBridge && currentLandmass === landMassOfOrigin){
            stopDrawing('Eens je een brug betreedt, moet je deze oversteken! Probeer opnieuw.');
            enteredBridge = null;
            return;
        }
    }

    drawMap();

    lastPoint = currentPoint;

    // Check progress
    if (clickedBridges.size === bridges.length) {
        resultDiv.textContent = 'Proficiat! Je hebt alle bruggen overgestoken.';
    } else {
        resultDiv.textContent = `${clickedBridges.size} / ${bridges.length} bruggen overgestoken.`;
    }
});

function stopDrawing(message) {
    isDrawing = false;
    lastPoint = null;
    linePoints = [];
    resultDiv.textContent = message;
}

function reset() {
    clickedBridges.clear();
    linePoints = [];
    lastPoint = null;
    isDrawing = false;
    drawMap();
}

// Stop drawing
canvas.addEventListener('mouseup', () => {
    reset();
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    reset();
    resultDiv.textContent = '';
});

// Initial render
drawMap();
