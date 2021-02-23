// test/posts.js
const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require("../models/post");
const User = require("../models/user");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(app);

describe("Posts", function () {
  const agent = chai.request.agent(server);
  // Post that we'll use for testing purposes
  const newPost = {
    title: "post title",
    url: "https://www.google.com",
    subreddit: "poststests",
    summary: "post summary",
  };
  const user = {
    username: "poststest",
    password: "testposts",
  };
  before(function (done) {
    agent
      .post("/auth/sign-up")
      .set("content-type", "application/x-www-form-urlencoded")
      .send(user)
      .then(function (res) {
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
  it("Should create with valid attributes at POST /posts/new", function (done) {
    // Checks how many posts there are now
    Post.estimatedDocumentCount()
      .then(function (initialDocCount) {
        agent
          .post("/posts/new")
          // This line fakes a form post,
          // since we're not actually filling out a form
          .set("content-type", "application/x-www-form-urlencoded")
          // Make a request to create another
          .send(newPost)
          .then(function (res) {
            Post.estimatedDocumentCount()
              .then(function (newDocCount) {
                // Check that the status code is OK
                expect(res).to.have.status(200);
                // Check that the database has one more post in it
                expect(newDocCount).to.be.equal(initialDocCount + 1);
                //Check that the body is an object
                expect(res.body).to.be.an("object");
                console.log(newPost.id);
                done();
              })
              .catch(function (err) {
                done(err);
              });
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });
  // login
  it("should be able to login", function (done) {
    agent
      .post("/auth/login")
      .send({ username: "poststest", password: "testposts" })
      .end(function (err, res) {
        res.should.have.status(200);
        agent.should.have.cookie("nToken");
        done();
      });
  });
  // logout
  it("should be able to logout", function (done) {
    agent.get("/auth/logout").end(function (err, res) {
      res.should.have.status(200);
      agent.should.not.have.cookie("nToken");
      done();
    });
  });
  after(function (done) {
    Post.findOneAndDelete(newPost)
      .then(function (res) {
        agent.close();

        User.findOneAndDelete({
          username: user.username,
        })
          .then(function (res) {
            done();
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });
});
