Feature: Show/Hide an Event Details

Scenario: An event element is collapsed by default
Given that a user has not selected a city
When the user opens the app and performs no action
Then all events details should be hidden.

Scenario: User can expand an event to see its details
Given that a user has selected an event
When the user clicks on the event show details button
Then the event details should be displayed.

Scenario: User can collapse an event to hide its details
Given that a user has finished viewing a selected event
When the user clicks on the details button again
Then the event details should be hidden.