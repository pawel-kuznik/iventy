import { Designator } from "../build/lib/Designator";

describe('Designator', () => {

    describe('.name', () => {

        it('should return name', () => {

            // create a designator with a test string
            const d = new Designator('test');

            // expect the name to be the test string
            expect(d.name).toEqual('test');
        });

        it('should not include tags', () => {

            // create a designator
            const d = new Designator('test.tag');

            // expect the name not contain a tag or dot
            expect(d.name).not.toContain('tag');
            expect(d.name).not.toContain('.');
        });
    });

    describe('.extend()', () => {

        it('should preserve the name', () => {

            // the initial instance and the extended one
            const d = new Designator('test');
            const d2 = d.extend('tag');

            // the name should be the same
            expect(d.name).toEqual(d2.name);
        });

        it('should contain the new tag', () => {

            // the initial instance and the extended one
            const d = new Designator('test');
            const d2 = d.extend('tag');

            // the name should be the same
            expect(d2.has('tag')).toEqual(true);
            expect(d.has('tag')).toEqual(false);
        });
    });

    describe('.reduce()', () => {

        it('should preserve the name', () => {

            // the initial instance and the reduced one
            const d = new Designator('test.tag');
            const d2 = d.reduce('tag');

            // name should be preserved
            expect(d.name).toEqual(d2.name);
        });

        it('should contain the new tag', () => {

            // the initial instance and the reduced one
            const d = new Designator('test.tag');
            const d2 = d.reduce('tag');

            // the tag should be missing
            expect(d2.has('tag')).toEqual(false);
            expect(d.has('tag')).toEqual(true);
        });
    });

    describe('.has()', () => {

        it('should say yes if the tag is there', () => {

            // the new designator
            const d = new Designator('test.tag');

            // should be there
            expect(d.has('tag')).toEqual(true);
        });

        it('should say no if the tag is not there', () => {

            // the new designator
            const d = new Designator('test.tag');

            // should not be there
            expect(d.has('blabla')).toEqual(false);
        });
    });

    describe('.isWithin()', () => {

        it('should match on names', () => {

            // create 2 designators
            const d1 = new Designator('test');
            const d2 = new Designator('test');

            // d1 should be in d2 (cause names match)
            expect(d1.isWithin(d2)).toEqual(true);
        });

        it('should tell that a smaller designator is witing a larger one', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('test.tag.another-tag');

            // d1 should be in d2 (cause it's smaller)
            expect(d1.isWithin(d2)).toEqual(true);
        });

        it('should not match if the other one has a missing tag', () => {

            // create 2 designators
            const d1 = new Designator('test.tag.missing');
            const d2 = new Designator('test.tag');

            // d1 should not be in d2
            expect(d1.isWithin(d2)).toEqual(false);
        });

        it('should not match if names do not match even when tags match', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('different.tag');

            // d1 should not be in d2
            expect(d1.isWithin(d2)).toEqual(false);
        });
    });

    describe('.equals()', () => {

        it('should match on names', () => {

            // create 2 designators
            const d1 = new Designator('test');
            const d2 = new Designator('test');

            // d1 should be equal d2 (cause names match)
            expect(d1.equals(d2)).toEqual(true);
        });

        it('should match with tags', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('test.tag');

            // d1 should be equal d2
            expect(d1.equals(d2)).toEqual(true);
        });

        it('should not match if tag is missing from first one', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('test.tag.addintional');

            // d1 should not be in d2
            expect(d1.equals(d2)).toEqual(false);
        });

        it('should not match if tag is missing from second one', () => {

            // create 2 designators
            const d1 = new Designator('test.tag.addintional');
            const d2 = new Designator('test.tag');

            // d1 should not be in d2
            expect(d1.equals(d2)).toEqual(false);
        });

        it('should not match if names do not match even when tags match', () => {

            // create 2 designators
            const d1 = new Designator('test.tag');
            const d2 = new Designator('different.tag');

            // d1 should not be in d2
            expect(d1.equals(d2)).toEqual(false);
        });
    });
});
