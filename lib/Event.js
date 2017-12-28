/**
 *  This is a class to acompany the Emitter class. The Event has important
 *  properties:
 *
 *  type:string             The type of the event (basically the event/chanel name)
 *  data:mixed              The additional data assigned to the event.
 *  target:Emitter          The emitter that ignited the event.
 *  currentTarget:Emitter   The last emitter in bubble chaing
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

module.exports = class {

    /**
     *  The constructor
     */
    constructor(type, data) {

        // store the type and data
        this.type = type;
        this.data = data;
    }
};
