// Expose global to element
// TODO: animations should be exposed as urban-anims
var frames;

(function() {

    frames = {
        show: new KeyframeEffect([
            { opacity: '0', transform: 'scale(.8,.8) translateY( 20 )' },
            { opacity: '1', transform: 'scale(1,1), translateY( 0 )' }
        ]),

        hide: new KeyframeEffect([
            { opacity: '1', transform: 'scale(1,1), translateY( 0 )' },
            { opacity: '0', transform: 'scale(.8,.8) translateY( -10 )' }
        ]),

        // Controls the actual bar sliding in and out
        in: new KeyframeEffect([
            { transform: 'translate3d(0,-100%,0)' },
            { transform: 'translate3d(0,0,0)' }
        ]),

        out: new KeyframeEffect([
            { transform: 'translate3d(0,0,0)' },
            { transform: 'translate3d(0,-100%,0)' }
        ])
    };

})();
