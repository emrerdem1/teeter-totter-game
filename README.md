# teeter-totter-game

In this project, we expect you to create a standing in balance teeter totter.

● At the right side of the teeter totter, there will be randomly placing objects with
random weights. On the left side, there will be nothing but there will be objects
falling from top to bottom. According to weight on the sides, the teeter totter
will be bending towards the heavy side.

● You will be managing those object's placement by arrow keys to keep the teeter
totter on balance.

● Your task is, keeping this balance as much as you can.

### Rules:

● The width of the teeter totter will be 10m.
● There will be three different object types with different weights. Triangle,
circle and rectangle.
● On the left side, only falling objects can be placed. You will be controlling objects
with arrow keys. The placement of objects should keep balance as its best.
● On the right side, there will be randomly placing objects, which are created
randomly and placed randomly.
● The weights will be between 1 and 10.
● The bending speed will be increasing or decreasing according to balance.
● The maximum bending percentage is %30, if it exceeds this limit, simulation
ends.
● If there is extra 20kgm(10kg \* 2m) on the one side, simulation ends
immediately.
● Distance from center will be considered as factor when placing the objects to
keep the teeter totter on balance.
● There will be a pause and continue feature. The simulation can be paused and
can be resumed in the last paused state.
● Vuex store usage expected. Component design expected.
● You can use any color or styling.

### Bonus:

● The size of the boxes will be determined by its weight.
● The boxes may placed one upon another regardless of its type.
● The drop speed of boxes may increase as the time goes on
● Auto mode: Instead of user control, the simulation will play itself. The boxes will
be placed automatically without user control.
● There can be a shatter effect at the end of simulation. You are free to choose
the effect.
