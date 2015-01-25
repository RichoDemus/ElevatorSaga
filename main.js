{
    idleElevators: [],
    init: function(elevators, floors)
    {
        const iddlare = this.idleElevators;
        const denna = this;
        elevators.forEach(function(elevator)
        {
            elevator.on("idle", function()
            {
                console.log("Elevator idle...");
                iddlare.push(elevator);
                console.log(iddlare.length + " idle elevators");
            });
            
            elevator.on("floor_button_pressed", function(floorNum)
            {
                elevator.goToFloor(floorNum);
            });
        });
        
        floors.forEach(function(floor)
        {
            floor.on("up_button_pressed", function()
            {
                denna.elevatorButtonPressed(floor);
            });
        });
        
        floors.forEach(function(floor)
        {
            floor.on("down_button_pressed", function()
            {
                denna.elevatorButtonPressed(floor);
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

