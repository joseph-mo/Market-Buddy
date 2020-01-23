# INFO 4340 Final Project

## Table of Contents

Heroku URL: blue-magic-project.herokuapp.com

- [Team Contract](documents/team-contract.md)
- [Milestone 2](documents/m-2.md)
  - **Revised Work:** [MileStone 2 Updated](documents/m2-updated.md)
  - Revision Notes:
    - We updated the problem and value props to be more relevant to our final design.
    - We decided to update our persona needs to better reflect some of the feedback we got on milestones 3 & 4
- [Milestone 3](documents/m-3.md)
  - **Revised Work:** [MileStone 3 Updated](documents/m3-updated.md)
  - Revision Notes:
    - After getting feedback on out milestone 3 design, we decided to pivot the focus of our project from a informational community forum to a planning and reminder app.
    - Rewrote our value props & persuasive design approach
    - Redid out sketches and paper prototype
    - Reconducted a few user tests to understand the effectiveness of out new paper prototype
- [Milestone 4](documents/m-4.md)
- [Milestone 5](documents/m-5.md)


## Additional info for grader
- Our app is designed as a prototype for real use, so we want to communicate how to use it as it currently is to test it out.
    - Testing all stages of using the app by selecting a specific date
        - Because we are currently using fake data for information about each day at the market, this complicates functionality that involves dates.
        - As such, our app shows dates that are in the past. A final implementation of this app would automatically remove any old dates, however we included them so that it is possible to view the 'level up' functionality. 
        - If a future date is selected, you will view what the user would really view in the app, up until the date of the selected event.
        - If you select a past date, click through to ViewPlan to view what the user would see upon opening the app AFTER their selected date has passed. 
    - Other helpful info
        - The geolocation feature is currently set to only work if your actual current location is at the market. If you wish to test this feature, simply change 'marketlat' and 'marketlon' variables in ViewPlan to your current latitude and longitude. 
        - For testing purposes we have a button which resets the level to 0, simply uncomment the line at the top of Home.vue.