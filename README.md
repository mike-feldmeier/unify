unify
=====

unify is a small jQuery plugin that unifies mouse and touch events into a single simplified and contextual model.

Installation
------------

Just include unify.js after jQuery

    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/unify.js"></script>

Usage
-----

Simply call the unify method on your selector and pass it a handler.  The handler will receive a single event argument:

    $("#target").unify(function(e){
      console.dir(e);
    });

The Event Object
----------------

The event object looks like this:

    {
      source: "mouse | touch",
      type: "begin | move | drag | end",
      current: { x: 0, y: 0 },
      origin: { x: 0, y: 0 },
      travel: { x: 0, y: 0 },
      delta: { x: 0, y: 0 }
    }

### source

The source property will be either "mouse" or "touch", indicating what type of input originated the event.

### type

The type property will be one of the following types:

- begin: a mousedown or touchstart has occurred
- move: a mousemove has occurred (there is no corresponding touch event)
- drag: a move has been performed through a touch, or through a mouse with the mousedown active
- end: a mouseup or touchend has occurred

### current

The current property contains x and y subproperties.  This is equivalent to clientX/clientY on a raw event, indicating where the cursor is right now.

### origin

The origin property contains x and y subproperties.  This is equivalent to clientX/clientY on a raw event, indicating where the cursor was when a drag activity was begun.  These will both be 0 for begin and move activities.

### travel

The travel property contains x and y subproperties.  This is the difference between the origin and current properties, indicating how much the cursor has moved since the beginning of the drag activity.  These will both be 0 for begin and move activities.

### delta

The delta property contains x and y subproperties.  This is the difference between the last and current properties, indicating how much the cursor has moved since the last move of the drag activity.  These will both be 0 for begin and move activities.
















