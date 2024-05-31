## Login
"As a user, I want to login with an email and password  so that I can access my study groups and personal page"
  
- Scenario - I am a student that needs an account on the study app
- Given - that I am on the homepage or applying to groups
- When - I click register/login in the header
- OR
- When - I click a group in the search
- Then - I am taken to a login/register modal/page where I can login, manage my groups or update my profile info.

## Edit Account
"As a registered user of a study group app, I want to be able to edit my profile information so that I can keep it up-to-date and relevant."

- Scenario - As a registered, logged-in student of a study group app I want to edit my account information
- Given - I'm logged in with my registered account.
- When - I navigate to my profile settings.
- And - I choose the option to edit my profile.
- Then - I can update my experience level, and area of study as needed.
- And -After making changes, I save my updated profile.
- And - I receive a confirmation message indicating that my profile has been successfully updated.

## Create study group
"As a registered, logged-in student, I want to create a study group so that I can collaborate with other students"
  
- Scenario - I am a student with an account and signed in on the study app and a time and place in mind or zoom link
- Given - that I am either on the home or search page
- When - the study group is created the data should be saved in MongoDB and accessible through GraphQL
- Then - the new study group should appear in the list of available groups.

## Find Study Group
"As a registered, logged-in **student**, I want to find a specific group so that I am presented other students enrolled in study groups"

- Scenario - I am a student with an account and a profile on the study app
- Given - that I am logged in and am on search function looking at filter options
- When - I click on a dropdown for subjects
- Then - I am presented with various subjects that are linked to study groups

## View members of a group
"As a student, I want to view members of a study group so that I can find the appropriate group for me"

- Scenario - I am a student that wants to view members of a group
- Given - I am looking at a specific group
- When - I view "group members"
- Then - I am presented with a list of all members in study group

## Details of created groups
"As a student, I want to view meet-up/location details of a study group so that I can study with others"

- Scenario - I am a student with an account, a profile, and logged in on the study app that wants to view information about a group
- Given - I am looking at a specific group
- When - I view group details
- Then - I am presented with a way to collaborate with  other members

## Join study group
"As a logged-in student, I want to join a study group so that I can collaborate with other students"
  
- Scenario - I am a student with an account and signed in on the study app
- Given - that I am searching or viewing a group
- When - I apply with a join button to that study group
- Then - the study group should update the member list in MongoDB and an alert/model should confirm the student joined the group.

## Leave study group
"As a logged-in student, I want to leave a study group so that I can manage my groups"
  
- Scenario - I am a student with an account and signed in on the study app
- Given - that I am viewing my groups in the profile page
- When - I leave the group with a "Remove Group" button
- Then - the study group should update the member list in MongoDB and an alert/model should confirm the student left the group.

## View a study group
"As a student, I want to view details of a study group so that I can review searched groups"

- Scenario - I am a student that wants to join a study group and review their details but needs to login to join
- Given - that I am searching or filtering for groups
- When - I click into a group I see details about that group but can not join the group until logged in
- Then - a message to sign in or register if the student wants to join

## View All Groups
"As a student, I want to view all groups I am enrolled in"

- Scenario - I am a student with an account, a profile, and logged in on the study app
- Given - that I am logged in and have previously joined groups
- When - I view my account
- Then - i can see what groups I have joined

---
## Initial Creator can Delete Group (incomplete)
"As the creator of a group, I want to be able to delete group from database"
  
- Scenario - I am logged in on the study guide and have created a study group
- Given - I have created a study group and it is no longer needed
- When - I view all groups i have created and click on delete group
- Then - group is deleted