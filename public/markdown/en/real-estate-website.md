### 🏠 Real Estate Website Project
I built a web application for house listings as part of an assessment for [DTT](https://www.d-tt.nl/). The application allows users to view, create, edit, and delete house listings. It was developed using Vue3, HTML, CSS, and JavaScript, following the high-quality standards and detail-oriented approach of DTT. This project showcases my ability to contribute to DTT and its clients, such as Greenpeace, Randstad, ING, Philips, Rabobank, FOX Sports, and KPMG.

&nbsp;

#### API Information 🔌
Data was fetched from a remote source using an existing API, which required an api-key for operations.

&nbsp;

#### Design 🎨
The web app's design was provided upfront through links to desktop and mobile workflows.

&nbsp;

#### User Stories 📖
DTT uses user stories as a baseline for all their (technical/design) documentation.

&nbsp;

**User story 1:** As a user, I want to be able to see a fixed navigation header, so that I can easily navigate through the app.
  - 🧭 I want to be able to navigate to the Houses page.
  - 📍 I want to be able to see what page is currently active.

&nbsp;

**User story 2:** As a user, I want to be able to see an overview of all available houses as the homepage of the web app, so that I can see what the app has to offer.
  - 🏠 I want to be able to see the address, postal code, and city of the listing.
  - 🖼️ I want to be able to see the image, size, and the number of bedrooms and bathrooms of the listing.

&nbsp;

**User story 3:** As a user, I want to be able to search through the available houses by at least one of the house listing properties, so that I can find specific houses based on search criteria.
  - 🔍 I want to be able to clear my search input, after I start typing.
  - 📊 I want to be able to see a result indication, informing me about the number of results that are found or if my search input did not match any results.

&nbsp;

**User story 4:** As a user, I want to be able to sort the available houses shown on the Homepage by at least one option (price or size), so that I can sort based on my preference.
  - 📈 I want to be able to sort by price.
  - 📏 I want to be able to sort by size.

&nbsp;

**User story 5:** As a user, I want to be able to access the details of a house, so that I can read more in-depth information about my selected house.
  - 🏡 I want to be able to see the address, postal code, and city of the listing.
  - 📋 I want to be able to see the description, image, number of bedrooms and bathrooms, the size, construction date, and if the listing has a garage or not.
  - ✏️ I want to be able to delete and edit the listing, in case it is my listing.

&nbsp;

**User story 6:** As a user, I want to be able to create my listing(s) by completing all the required fields in a form.
  - 🏢 I want to be able to add the address (street name, house number, addition, postal code, and city) of my listing.
  - 📝 I want to be able to set an image, a description, a price, the size, the amount of bedrooms and bathrooms, the construction date, and whether my listing has a garage or not.
  - ⚠️ If I have not completed all the required fields or there is a validation error in the form, I should see an appropriate error message.
  - 🔄 After completing the form and creating the listing, I should be redirected to the newly created listing detail page.

&nbsp;

**User story 7:** As the owner of a listing, I want to be able to have an edit and delete button on the detail page of a house that I own, so that I can navigate to the edit page of my listing or delete the listing.
  - ✏️ I want an edit button on my listing's detail page.
  - ❌ I want a delete button on my listing's detail page.

&nbsp;

**User story 8:** As the owner of a listing, I want to be able to edit my listing(s).
  - 🏢 I want to be able to edit the address (street name, house number, addition, postal code, and city) of my listing.
  - 📝 I want to be able to edit the image, description, price, size, amount of bedrooms and bathrooms, the construction date, and whether my listing has a garage or not.
  - ⚠️ If I have not completed all the required fields or there is a validation error in the form, I want to be able to see an appropriate error message.

&nbsp;

**User story 9:** As the owner of a listing, I want to be able to delete my listing(s).
  - ⚠️ I want to be able to see a warning before the successful deletion of my listing.
  - 🗑️ I want the listing to be permanently deleted after confirmation.