# Ellen the Elevator

An elevator AI written for [http://play.elevatorsaga.com/](Elevator Saga)

## Info
The current strategy is to put idle elevators in a list and when a person presses the call elevator button one of the idle elevators are called. This turned out to be pretty bad, so the next plan is 
* When a person presses the call elevator button that information is stored together with the direction
* Each time an elevator passes a floor it checks to see if there are any stored persons for that floor that wishes to go in the same direction
* if so it picks them up and continues in it's direction, picking up and dropping of people as it travels
* When it drops of its last person. what should it do? try to find the nearest person?
