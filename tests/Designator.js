/**
 *  This is a test file for the Designator class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the testing method
const expect = require('chai').expect;

// the Designator class to text
const Designator = require('../build/lib/Designator.js').Designator;

describe('Designator', () => {

    describe('.name', () => {

        it('should return name', () => {

            // create a designator with a test string
            const d = new Designator('test');

            // expect the name to be the test string
            expect(d.name).to.be.equal('test');
        });

        it('should not include tags', () => {

            // create a designator
            const d = new Designator('test.tag');

            // expect the name not contain a tag or dot
            expect(d.name).to.not.contain('tag');
            expect(d.name).to.not.contain('.');
        });
    });

    describe('.extend()', () => {

        it('should preserve the name', () => {

            // the initial instance and the extended one
            const d = new Designator('test');
            const d2 = d.extend('tag');

            // the name should be the same
            expect(d.name).to.equal(d2.name);
        });

        it('should contain the new tag', () => {

            // the initial instance and the extended one
            const d = new Designator('test');
            const d2 = d.extend('tag');

            // the name should be the same
            expect(d2.has('tag')).to.be.true;
            expect(d.has('tag')).to.be.false;
        });
    });

    describe('.reduce()', () => {

        it('should preserve the name', () => {

            // the initial instance and the reduced one
            const d = new Designator('test.tag');
            const d2 = d.reduce('tag');

            // name should be preserved
            expect(d.name).to.equal(d2.name);
        });

        it('should contain the new tag', () => {

            // the initial instance and the reduced one
            const d = new Designator('test.tag');
            const d2 = d.reduce('tag');

            // the tag should be missing
            expect(d2.has('tag')).to.be.false;
            expect(d.has('tag')).to.be.true;
        });
    });

    describe('.has()', () => {

        it('should say yes if the tag is there', () => {

            // the new designator
            const d = new Designator('test.tag');

            // should be there
            expect(d.has('tag')).to.be.true;
        });

        it('should say no if the tag is not there', () => {

            // the new designator
            const d = new Designator('test.tag');

            // should not be there
            expect(d.has('blabla')).to.be.false;
        });
    });

    describe('.isWithin()', () => {

        it('should match on names', () => {

            // create 2 designators
            const d1 = new Designator('test');
            const d2 = new Designator('test');

            // d1 should be in d2 (cause names match)
            expect(d1.isWithin(d2)).to.be.true;
        });

        it('should tell that a smaller designator is witing a larger one', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('test.tag.another-tag');

            // d1 should be in d2 (cause it's smaller)
            expect(d1.isWithin(d2)).to.be.true;
        });

        it('should not match if the other one has a missing tag', () => {

            // create 2 designators
            const d1 = new Designator('test.tag.missing');
            const d2 = new Designator('test.tag');

            // d1 should not be in d2
            expect(d1.isWithin(d2)).to.be.false;
        });

        it('should not match if names do not match even when tags match', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('different.tag');

            // d1 should not be in d2
            expect(d1.isWithin(d2)).to.be.false;
        });
    });

    describe('.equals()', () => {

        it('should match on names', () => {

            // create 2 designators
            const d1 = new Designator('test');
            const d2 = new Designator('test');

            // d1 should be equal d2 (cause names match)
            expect(d1.equals(d2)).to.be.true;
        });

        it('should match with tags', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('test.tag');

            // d1 should be equal d2
            expect(d1.equals(d2)).to.be.true;
        });

        it('should not match if tag is missing from first one', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('test.tag.addintional');

            // d1 should not be in d2
            expect(d1.equals(d2)).to.be.false;
        });

        it('should not match if tag is missing from second one', () => {

            // create 2 designators
            const d1 = new Designator('test.tag.addintional');
            const d2 = new Designator('test.tag');

            // d1 should not be in d2
            expect(d1.equals(d2)).to.be.false;
        });

        it('should not match if names do not match even when tags match', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('different.tag');

            // d1 should not be in d2
            expect(d1.equals(d2)).to.be.false;
        });
    });
});
