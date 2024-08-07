const { I } = inject();
const Joi = require('joi');

var endpoint;

//-----------------
//Reusable steps
//-----------------

When('I send a GET request', () => {
  I.sendGetRequest(endpoint);
});

Then('I should receive a {int} OK response', () => {
  I.seeResponseCodeIs(200);
});

Then('I should receive a {int} Created response', () => {
  I.seeResponseCodeIs(201);
});


//-----------------
//Test Definitions
//-----------------

//----------------------------------------------------------------------------------------
//Feature: Posts
//Scenario: GET all posts

Given('I want to GET all posts', () => {
  endpoint = '/posts';
});

Then('the response body should contain a list of all posts', () => {
  var postsSchema = Joi.array().items(Joi.object({
    userId: Joi.number().required(),
    id: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
  }));
  I.seeResponseMatchesJsonSchema(postsSchema);
});

//----------------------------------------------------------------------------------------
//Feature: Posts
//Scenario: GET posts by id

Given('I want to GET a post by id {int}', (id) => {
  endpoint = `/posts/${id}`;
});

Then('the response body should contain data for that id {int} post', (id) => {
  var postSchema = Joi.object({
    userId: Joi.number().required(),
    id: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required()
  });
  I.seeResponseMatchesJsonSchema(postSchema);
  I.seeResponseContainsJson({ id: parseInt(id) });
});

//----------------------------------------------------------------------------------------
//Feature: Posts
//Scenario: GET posts by userId

Given('I want to GET all posts by userId {int}', (userId) => {
  endpoint = `/posts?userId=${userId}`
});

Then('the response body should contain data for the posts of userId {int}', (userId) => {
  var postsSchema = Joi.array().items(Joi.object({
    userId: Joi.number().required().valid(userId),
    id: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
  }));
  I.seeResponseMatchesJsonSchema(postsSchema);
  I.seeResponseContainsJson({ userId: parseInt(userId) });
});


//----------------------------------------------------------------------------------------
//Feature: Users
//Scenario: GET all users

Given('I want to GET all users', () => {
  endpoint = '/users';
});

Then('the response body should contain a list of all users', () => {
  var usersSchema = Joi.array().items(Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.object({
      street: Joi.string().required(),
      suite: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
      geo: Joi.object({
        lat: Joi.string().required(),
        lng: Joi.string().required()
      }).required()
    }).required(),
    phone: Joi.string().required(),
    website: Joi.string().required(),
    company: Joi.object({
      name: Joi.string().required(),
      catchPhrase: Joi.string().required(),
      bs: Joi.string().required()
    }).required()
  }));
  I.seeResponseMatchesJsonSchema(usersSchema);
});

//----------------------------------------------------------------------------------------
//Feature: Users
//Scenario: CREATE a new user

Given('I want to create a new user', () => {
  endpoint = '/users';
});

When('I send a POST request', () => {
  var userPayload = {
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    address: {
      street: "123 Main St",
      suite: "Apt. 101",
      city: "Anytown",
      zipcode: "12345",
      geo: {
        lat: "37.7749",
        lng: "-122.4194"
      }
    },
    phone: "555-1234",
    website: "johndoe.com",
    company: {
      name: "Doe Enterprises",
      catchPhrase: "Innovating the Future",
      bs: "business solutions"
    }
  };
  I.sendPostRequest(endpoint, userPayload);
});

Then('the response body should contain the user data', () => {
  var userSchema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.object({
      street: Joi.string().required(),
      suite: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
      geo: Joi.object({
        lat: Joi.string().required(),
        lng: Joi.string().required()
      }).required()
    }).required(),
    phone: Joi.string().required(),
    website: Joi.string().required(),
    company: Joi.object({
      name: Joi.string().required(),
      catchPhrase: Joi.string().required(),
      bs: Joi.string().required()
    }).required()
  });

  I.seeResponseMatchesJsonSchema(userSchema);
  I.seeResponseContainsJson({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
  });
});

//----------------------------------------------------------------------------------------
//Feature: Users
//Scenario: UPDATE a user

let userId;

Given('I want to update a user {int}', (id) => {
  userId = id; // Atribua o id recebido à variável userId
  endpoint = `/users/${userId}`;
});

When('I send a PUT request', () => {
  var updatedUserPayload = {
    name: "John Doe Updated",
    username: "johndoeupdated",
    email: "john.doe.updated@example.com",
    address: {
      street: "123 Updated St",
      suite: "Apt. 101",
      city: "Updatedtown",
      zipcode: "54321",
      geo: {
        lat: "37.7749",
        lng: "-122.4194"
      }
    },
    phone: "555-4321",
    website: "johndoeupdated.com",
    company: {
      name: "Updated Enterprises",
      catchPhrase: "Innovating the Future Updated",
      bs: "updated business solutions"
    }
  };
  I.sendPutRequest(endpoint, updatedUserPayload);
});

Then('the response body should contain the updated user data', () => {
  var updatedUserSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.object({
      street: Joi.string().required(),
      suite: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
      geo: Joi.object({
        lat: Joi.string().required(),
        lng: Joi.string().required()
      }).required()
    }).required(),
    phone: Joi.string().required(),
    website: Joi.string().required(),
    company: Joi.object({
      name: Joi.string().required(),
      catchPhrase: Joi.string().required(),
      bs: Joi.string().required()
    }).required()
  });

  I.seeResponseMatchesJsonSchema(updatedUserSchema);
  I.seeResponseContainsJson({
    id: userId,
    name: "John Doe Updated",
    username: "johndoeupdated",
    email: "john.doe.updated@example.com"
  });
});

//----------------------------------------------------------------------------------------
//Feature: Users
//Scenario: DELETE a user

Given('I want to DELETE a user {int}', (id) => {
  userId = id;
  endpoint = `/users/${userId}`;
});

When('I send a DELETE request', () => {
  I.sendDeleteRequest(endpoint);
});


  



