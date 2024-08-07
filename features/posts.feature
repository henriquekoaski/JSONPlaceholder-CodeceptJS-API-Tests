Feature: Posts
  
  Scenario: GET all posts
    Given I want to GET all posts
    When I send a GET request
    Then I should receive a 200 OK response
    And the response body should contain a list of all posts


  Scenario Outline: GET posts by id
    Given I want to GET a post by id <id>
    When I send a GET request
    Then I should receive a 200 OK response
    And the response body should contain data for that id <id> post

    Examples:
      |  id  |
      |  1   |
      |  5   |
      |  25  |
      |  50  |
      |  100 |



  Scenario Outline: GET posts by userId
    Given I want to GET all posts by userId <userId>
    When I send a GET request
    Then I should receive a 200 OK response
    And the response body should contain data for the posts of userId <userId>

    Examples:
      |  userId  |
      |  1       |
      |  2       |
      |  3       |
      |  4       |
      |  5       |
         


