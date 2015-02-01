{
    idleElevators: [],
    allElevators: [],
    allFloors: [],
    init: function(elevators, floors)
    {
        const _this = this;
        elevators.forEach(function(elevator)
        {
            _this.allElevators.push(elevator);
            elevator.direction = "";
            elevator.on("idle", function()
            {
                //TODO what should idle elevators do? same as before?
                console.log("Elevator idle...");
                _this.idleElevators.push(elevator);
                console.log(_this.idleElevators.length + " idle elevators");
            });
            
            elevator.on("floor_button_pressed", function(floorNum)
            {
                //elevator.goToFloor(floorNum);
                //should be added to some sorted list or something, 
                //so that the elevator can check this list just before it passes a floor
                //there is already an array for this
            });
            
            /**
            * Triggered slightly before the elevator will pass a floor. 
            * A good time to decide whether to stop at that floor. 
            * Note that this event is not triggered for the destination floor. 
            * Direction is either "up" or "down".
            */
            elevator.on("passing_floor", function(floorNum, direction)
            {
                if(elevator.loadFactor() === 1)
                {
                    //Elevator is full, do not stop to pick up passengers
                    return;
                }
                
                const floor = _this.allFloors[floorNum];
                if(direction === "up" && floor.peopleWaitingToGoUp > 0)
                {
                    console.log("People are waiting to go up on floor " + floorNum);
                    elevator.stop();
                    return;
                }
                if(direction === "down" && floor.peopleWaitingToGoDown > 0)
                {
                    console.log("People are waiting to go down on floor " + floorNum);
                    elevator.stop();
                    return;
                }
                //Will not stop at the next floor
            });
            
            elevator.on("stopped_at_floor", function(floorNum)
            {
                
            });
        });
        
        floors.forEach(function(floor)
        {
            floor.peopleWaitingToGoUp = 0;
            floor.peopleWaitingToGoDown = 0;
            
            _this.allFloors[floor.floorNum] = floor;
            floor.on("up_button_pressed", function()
            {
                floor.peopleWaitingToGoUp++;
                _this.elevatorButtonPressed(floor);
            });
            
            floor.on("down_button_pressed", function()
            {
                floor.peopleWaitingToGoDown++;
                _this.elevatorButtonPressed(floor);
            });
        });
                
    },
    update: function(dt, elevators, floors)
    {
        // We normally don't need to do anything here
    },
    elevatorButtonPressed: function(floor)
    {
        console.log("button pressed on floor: " + floor.floorNum());
        const elevator = this.idleElevators.shift();
        if(!elevator)
        {
            console.log("No idle elevator, skipping");
            return;
        }
        elevator.goToFloor(floor.floorNum());
        
        if(elevator.currentFloor() > floor.floorNum())
        {
            elevator.direction = "down";
            return;
        }
        elevator.direction = "up";
        
    },
    
}

