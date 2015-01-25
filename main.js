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
            elevator.on("idle", function()
            {
                console.log("Elevator idle...");
                _this.idleElevators.push(elevator);
                console.log(_this.idleElevators.length + " idle elevators");
            });
            
            elevator.on("floor_button_pressed", function(floorNum)
            {
                elevator.goToFloor(floorNum);
            });
        });
        
        floors.forEach(function(floor)
        {
            _this.allFloors.push(floor);
            floor.on("up_button_pressed", function()
            {
                _this.elevatorButtonPressed(floor);
            });
            
            floor.on("down_button_pressed", function()
            {
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
    }
}

