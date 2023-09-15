const request = require("supertest");
const app = require("../app");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    adminToken
} = require("../routes/_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('partial update', function () {
    test("partial update company", async function () {
        const resp = await request(app)
            .patch("/companies/c1")
            .send({
              name: "C4"
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            company: {
                handle: 'c1',
                name: "C4",
                numEmployees: 1,
                description: "Desc1",
                logoUrl: "http://c1.img"
            }
        });
      });
    test("partial update user", async function () {
        const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "first",
        })
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
          user: {
            username: "u1",
            firstName: "first",
            lastName: "U1L",
            email: "user1@user.com",
            isAdmin: false,
          },
        });
    })
})