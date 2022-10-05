# SpaceX-app

Hi! My name is Dmytro and this is one of my test task created in order to show the stack of technologies I know.

In this project, I used the Redux Toolkit as the main tool for creating the store and processing it.
Store consists of 2 reducers (slices):

- Rockets slice
- User slice

### Rockets Slice

This Slice created with Entity Adapter for easier CRUD processing,
Initial state looks like this:

`initState = {entities:{}, ids: []} `

So you can easily operate with the entities (Dragon information),
calling it with its id. Moreover, the actions of this reducer are the standard CRUD functions of the entityAdapter.

### User Slice

This slice was created to keep state of logged in User.
In order to avoid errors when accessing an empty state, I gave it default values. Not the prettiest way, but it worked.
So state consists of 2 parts

- Authorization information (token, uId, isAuthorized)
- Profile information (Name, Surname, urlUserpic, Mobile and Favourite Dragons)

Next, I will explain why the state looks like this.

### Styles

For the layout of this application, I used **Bootstrap 5** and **React Bootstrap**.
But I also wrote some styles manually in `/index.css`.
This was necessary in order to make a mobile-to-desktop layout.

## Authentification

Authentification and Registration of the User provided with **Firebase** cloud service.
Storage of User's personal information provided with **Firestore**.
Therefore, when a user logs in, 2 requests are made - one to the Firebase server, from where Api comes to us with authentication information (token, uid, isAuthorized). The second request is a request to the Firestore server, when we got the user's **uId**. We use it to access user's document and get the profile data from Firestore.
That is why User state consists of 2 parts.

When registering a user, the request cycle is exactly the same. But when we access the Firebase, we pass the default Profile Data to the Firestore. This is necessary in order to maintain a single data storage structure on the server.

When the user logs in, this default information will be pulled into the state and into the Profile data component, and the user will be able to change it manually.

I made Authentification Context `/src/athContext.js`  
to access the authentication data that we get from the `getAuth()` function, and in order not to call this function in different places (it is necessary for any kind of requests to the Firebase server).

Here I wrote the functions for login and logout and also passed them to the context so that they can be used in components without code duplication.

## Navigation

Web app navigation made using **React Router Dom**.
The AppRouter component contains paths to such components:

- Home Page
- Rocket Forms (Dragon description form)
- Register Forms
- Profile Container

### Navbar

![NavBar](https://i.ibb.co/NYYdvvC/2022-10-05-12-54-39.png)

The links to the routes are in the NavBar Component. NavBar renders a list of links to the Home, Login and Dragon Pages.
Links are the React Router components that are represented as pictures.
Because the list of Dragons is small, then this representation seemed optimal to me. Of course, if the list grows enough, then the NavBar will have to be converted to a regular list of links.

Login Form is a modal form which pops up when you click on the login button: ![Login Button](https://i.ibb.co/zs9G3cD/2022-10-05-12-46-33.png)

In case of successful authentication, the login button changes to a profile button (link) to the user's profile page. ![Profile Button](https://i.ibb.co/DtD7FNN/2022-10-05-12-49-34.png)

If the user does not have an account, then in the Login Form there is a link to the registration page.
After registration, the user is automatically authorized in the system. In order to log out, you need to go to the Profile page and click **Exit**.
![Login Form](https://i.ibb.co/TPmS7r9/2022-10-05-13-05-08.png)

## Rocket Form (Dragon form)

Rocket Form consists of React Bootstrap components.
The Card is inside of Container. The Card consists of a Slider to display a carousel of pictures and Title to display information about the dragon and button link to Wikipedia.
![Rocket Form](https://i.ibb.co/y0w1HNM/2022-10-05-13-49-06.png)

## Formatters & Validators

### RocketDataFormatter

Because the Dragon API is a rather voluminous json file with a lot of
information that is not needed in the state, I made a rocketDataFormatter. This is a function that takes as an argument an array of data objects for each dragon.
It selects the information which is needed to display in the component, and returns an array of objects with formatted data.

### Validators

Validators are functions that compare a Regex with the data the user has entered. They check that the password is long enough or that the userpic URL is not broken.

## CI / CD

The CI of this project is provided with Github Actions.
Because Since I did not write tests for this project, the `.github/workflows` folder contains only a command to check the code with Linter when push request was made.

The CD was made on a platform **Netlify**.
Link to the project deploy can be found in Feedback.
If you want to make deploy by your own you need:

- Finish instructions how to **Run Locally**
- Push the project to your gitHub repository
- Connect your gitHub account to Netlify account
- Choose repository with project and follow the Netlify' steps to deploy

## Run Locally

Clone the project

```bash
  git clone git@github.com:tresor13/spaceX-app.git
```

Go to the project directory

```bash
  cd spaceX-app
```

Install dependencies

```bash
  npm install
  npm link
```

Start the "local-server"

```bash
  npm run start
```

## Feedback

If you have any feedback, please reach out to me at chicanodima@gmail.com
or https://www.linkedin.com/in/dmytro-los/

Thank you for your time!
