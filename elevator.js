const ELEVATOR = 3;
const FLOOR = 5;
const HEIGHT = 100;
const WIDTH = 120;
let elevatorArray = [];

for (let i = 0; i < ELEVATOR; i++) {
    elevatorArray.push({ id: i + 1, active: false, elevatorOn: 1 });
}

const ELEVATOR_BODY_MAIN = document.querySelector('.elvator-body-main');
const ELEVATOR_NUMBER = document.querySelector('.elevator-number');
ELEVATOR_BODY_MAIN.style.height = `${HEIGHT * FLOOR + 100}px`;
ELEVATOR_NUMBER.style.height = `${HEIGHT * FLOOR}px`;

for (let i = 1; i <= ELEVATOR; i++) {
    let html = `<div class="elevator-body" style="height: ${HEIGHT * FLOOR}px; width: ${WIDTH + (FLOOR * 12)}px">
    <div class="elevator-body-part" style="height: ${HEIGHT * FLOOR}px; width: ${WIDTH + (FLOOR * 10)}px">
        <div class="elevator" id="elevator-${i}" style="height: ${HEIGHT}px; width: ${WIDTH}px; top: ${(FLOOR - 1) * HEIGHT}px; box-sizing: border-box"> 1
        </div>
    </div>
    <label class="switch">
        <input type="checkbox" id="${i}" onclick=checkElevator(${i})>
        <span class="slider round"></span>
    </label>
</div>`;
    ELEVATOR_BODY_MAIN.insertAdjacentHTML('beforeend', html);
}


let html = `<div class="number-body" style="height: ${HEIGHT}px">
<div class="number"> ${FLOOR} </div>
<div class="up" style="height: 0; width: 0;"></div>
<button class="down" id="down-${FLOOR}" style="margin-left: -5px;" onclick=floor(id)><i class="fa-solid fa-caret-down"></i></button>
</div>`;
ELEVATOR_NUMBER.insertAdjacentHTML('beforeend', html);

for (let i = FLOOR - 1; i > 1; i--) {
    let html = `<div class="number-body" style="height: ${HEIGHT}px">
    <div class="number"> ${i} </div>
    <button class="up" id="up-${i}" onclick=floor(id)><i class="fa-solid fa-caret-up"></i></button>
    <button class="down" id="down-${i}" onclick=floor(id)><i class="fa-solid fa-caret-down"></i></button>
</div>`;
    ELEVATOR_NUMBER.insertAdjacentHTML('beforeend', html);
}

html = `<div class="number-body" style="height: ${HEIGHT}px">
<div class="number"> 1 </div>
<button class="up" id="up-1" onclick=floor(id)><i class="fa-solid fa-caret-up"></i></button>
<div class="down" style="height: 0; width: 0;"></div>
</div>`;
ELEVATOR_NUMBER.insertAdjacentHTML('beforeend', html);


const floor = id => {
    mainFloor = Number(id.slice(-1));
    let minDistance = elevatorArray.map(elevator => Math.abs(elevator.elevatorOn - mainFloor))
    let num = minDistance.indexOf(Math.min(...minDistance));
    let index = elevatorArray.map(elevator => elevator.id).indexOf(elevatorArray[num].id);
    let workingElevator = document.querySelector(`#elevator-${elevatorArray[index].id}`);

    let flow = null;
    let elevatorON = FLOOR - elevatorArray[index].elevatorOn;
    let floorON = FLOOR - mainFloor;
    let pos = elevatorON * HEIGHT;
    clearInterval(flow);
    flow = setInterval(elevatorSlide, 5);
    function elevatorSlide() {
        if (elevatorON - floorON > 0) {
            if (pos == floorON * HEIGHT) {
                clearInterval(flow);
            } else {
                pos--;
                workingElevator.style.top = pos + "px";
                workingElevator.innerHTML = `${FLOOR - Math.round(pos / 100)}`;
            }
        }
        else {
            if (pos == floorON * HEIGHT) {
                clearInterval(flow);
            } else {
                pos++;
                workingElevator.style.top = pos + "px";
                workingElevator.innerHTML = `${FLOOR - Math.round(pos / 100)}`;
            }
        }
    }
    elevatorArray[index].elevatorOn = mainFloor;
}

const checkElevator = elevatorId => {
    let elevator = document.getElementById(elevatorId);
    
    let index = elevatorArray.map(elevator => elevator.id).indexOf(elevatorId);
    

    if (elevator.checked) {
        elevatorArray[index].active = elevator.checked;
        let workingElevator = document.getElementById(`elevator-${elevatorArray[index].id}`);
        
        let slide = null;
        let position = (FLOOR - elevatorArray[index].elevatorOn) * HEIGHT;
        clearInterval(slide);
        slide = setInterval(maintananceMode, 5);
        function maintananceMode() {
            if (position == (FLOOR-1)*100)
                clearInterval(slide);
            else {
                position++;
                workingElevator.style.top = position + "px";
                workingElevator.innerHTML = `${FLOOR - Math.round(position / 100)}`;
            }
        }
        elevatorArray[index].elevatorOn = 1;
        workingElevator.style.border = "1px solid red";
        elevatorArray.splice(index, 1);
    }
    else {
        elevatorArray.push({ id: elevatorId, active: false, elevatorOn: 1 });
        index = elevatorArray.map(elevator => elevator.id).indexOf(elevatorId);
        let workingElevator = document.getElementById(`elevator-${elevatorArray[index].id}`);
        workingElevator.style.border = "none";
    }
}