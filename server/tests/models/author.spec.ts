process.env.NODE_ENV = "testing";

import { Author, IAuthor } from "../../models/models";
import * as chai from "chai";

const expect = chai.expect;

describe("Models Author", () => {

    let authorObject: IAuthor;

    it("should insert new author", (done: Function) => {

        const author = new Author();
        author.name = "John";
        author.age = 30;
        author.description = "He is writer";

        author.save((err: Error, res: IAuthor) => {

           authorObject = res;

           expect(res).to.be.an("object");
           expect(res.name).to.be.equal("John");
           done();
        });

    });

    it("should update user", async(done: Function) => {
        const results: { nModified: number} = await Author.updateAuthor(authorObject._id, "He is not writer");

        expect(results.nModified).to.be.equal(1);
        done();
    });

    it("should update by age", async(done: Function) => {
        const results: { nModified: number} = await Author.updateByAge(21, "Good one :)");
        const author: IAuthor = await Author.findById(authorObject._id).exec();

        expect(author.description).to.be.equal("Good one :)");
        expect(results.nModified).to.be.equal(1);
        done();
    });
});