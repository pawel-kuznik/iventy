/**
 *  This is a class that handles an event designator. An event designator is
 *  a string that deifnes event name and tags. This is very important cause the
 *  whole event system works on the idea of a event/channel name and set of
 *  tags that provide additional meta data about the event or handler association.
 *
 *  The format that the designator can take is :
 *
 *      channel-name.tag1.tag2.tagX
 *
 *  The first part is the channel name and then there is a list of dot-separated
 *  tags that define meta information about the event or channel handler.
 *
 *  @author Paweł Kuźnik <pawel.kuznik@cgmail.com>
 */

/**
 *  Helper function to turn a name and array of tags into a string version of
 *  the designator.
 */
function constructString(name:string, tags:Array<string>) : string {

    // output the name and then glue all tags with dots between
    return name + (tags ? '.' + tags.join('.') : '');
}

// export the class
export class Designator {

    /**
     *  The name of the event.
     *  @var string
     */
    private readonly _type:string;

    /**
     *  The set of tags.
     *  @var Set
     */
    private readonly _tags:Set<string>;

    /**
     *  The constructor.
     *  @param  sting   The input string
     */
    constructor(designator:string) {

        // split the string into type and tags
        let [type, ...tags] = designator.split('.');

        // assign type and tags. The set will make sure that the tags are unique
        this._type = type;
        this._tags = new Set(tags);
    }

    /**
     *  Get access to the event name.
     *  @return string
     */
    get name() : string {

        // return the type as name
        return this._type;
    }

    /**
     *  Get access to an array of tags associated with this designator.
     *  @return Array
     */
    get tags() : Array<string> {

        // copy an array so nobody can modify it
        return Array.from(this._tags);
    }

    /**
     *  Extend the designator with a specific tag.
     *  @param  string  Tag string
     *  @return Designator
     */
    extend(tag:Array<string>) : Designator;

    /**
     *  Extend the designator with a specific tag.
     *  @param  string  Tag string
     *  @return Designator
     */
    extend(tag:string) : Designator;

    // the implementation
    extend(t:any) : Designator {

        // not an array? then wrap it in an array
        if (!Array.isArray(t)) t = [ t ];

        // construct new designator based on a string. It doesn't really matter
        // the tags are unique or not cause our constructor will make sure that
        // they are.
        return new Designator(constructString(this._type, [...t, ...this._tags]));
    }

    /**
     *  Reduce the designatro by a specific tag.
     *  @param  sting   Tag string
     *  @return Designator
     */
    reduce(tag:string) : Designator {

        // clone tags
        const newTags = new Set(this._tags);

        // remove the tag to reduce
        newTags.delete(tag);

        // return new designator based on string
        return new Designator(constructString(this._type, [...newTags]));
    }

    /**
     *  Check if the designator has a specific tag.
     *  @param  string the tag
     *  @return bool
     */
    has(tag:string) : boolean {

        // check if we have a tag
        return this._tags.has(tag);
    }

    /**
     *  Does this designator is withing another designator? The name must match
     *  and the other one should have all of tags that this one has (at least).
     *  @param Designator   The other designator.
     *  @return bool
     */
    isWithin(other:Designator) : boolean {

        // names don't match? then they don't match
        if (this._type != other._type) return false;

        // we have more tags than the other one? then no way we can match
        if (this._tags.size > other._tags.size) return false;

        // we want to check if all our tags are witin the other one
        for (let tag of this._tags) {

            // the other one doesn't have one of our tags? then no match
            if (!other._tags.has(tag)) return false;
        }

        // we pass all the checks, we are within the other one
        return true;
    }

    /**
     *  Does other designator matches this one? The name must match and it should
     *  have same tags (both tags lists much contains same number of tags and have
     *  same tags. The don't have to be in the same order).
     *  @param  Designator  The other desinator
     *  @return bool
     */
    equals(other:Designator) : boolean {

        // names don't match? then they don't match
        if (this._type != other._type) return false;

        // the size of tags need to be exactly the same
        if (this._tags.size != other._tags.size) return false;

        // we want to check if all our tags are witin the other one
        for (let tag of this._tags) {

            // the other one doesn't have one of our tags? then no match
            if (!other._tags.has(tag)) return false;
        }

        // we pass all the checks, we are within the other one
        return true;
    }

    /**
     *  Create a string representation of the designator.
     *  @return string
     */
    toString() : string {

        // construct string version
        return constructString(this._type, Array.from(this._tags));
    }
}
