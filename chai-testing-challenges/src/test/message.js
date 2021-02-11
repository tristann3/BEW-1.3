require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})


describe('Message API endpoints', () => {
    beforeEach((done) => {
        // TODO: add any beforeEach code here
        const sampleMessage = new Message({
          title: 'messageTitle',
          body: 'messageBody',
          author: '000000000000000000000000'
      })
      sampleMessage.save()
      .then(() => {
          done()
      })
    })

    afterEach((done) => {
        // TODO: add any afterEach code here
        Message.deleteMany({ title: { $ne: ''} }).then(() => {
          done()
        })
    })

    it('should load all messages', (done) => {
        // TODO: Complete this
        chai.request(app)
          .get('/messages/')
          .end((error, response) => {
            if (error) done(error);
            expect(response).to.have.status(200);
            done();
          })
    })

    it('should get one specific message', (done) => {
        // TODO: Complete this
        done()
    })

    it('should post a new message', (done) => {
      // TODO: Complete this
      const message = new Message({
        title: 'messageTitle',
        body: 'messageBody',
        author: '60189f975561f51e8ef4e9df'
      })
      chai.request(app)
        .post('/messages/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(message)
        .end((error, response) => {
          if(error) done(error);
          expect(response).to.have.status(200);
          console.log(sampleMessage.id)
          done();
        })
    })

    it('should update a message', (done) => {
        // TODO: Complete this
        done()
    })

    it('should delete a message', (done) => {
        // TODO: Complete this
        done()
    })
})
