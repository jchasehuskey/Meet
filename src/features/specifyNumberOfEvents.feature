Feature: Specify Number Of Events

Scenario: When user has not specified a number let 32 be the default number
Given that a user has not specified a number of events
When selecting cities
Then A default number of 32 is loaded on the page

Scenario: User can change the number of events they want to see
Given that the user does not want to view all events
When user changes the number of events in the input box
Then the User should be able to change the number of events they want to see.