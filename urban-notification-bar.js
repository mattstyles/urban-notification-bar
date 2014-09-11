(function( root ) {

    var ANIM_OUT_SPD = 100,
        ANIM_IN_SPD = 200,
        ANIM_DELAY = 50,
        ANIM_DELAY_MAG = .8;


    Polymer( 'urban-notification-bar', {

        /**
         * Published properties
         */
        publish: {
            /**
             * Is the element showing
             *
             * @property _showing
             * @type boolean
             */
            _showing: false
        },


        /*-----------------------------------------------------------*\
         *
         *  Polymer lifecycle events
         *
        \*-----------------------------------------------------------*/

        /**
         * Fired when Polymer has got the element ready
         */
        ready: function() {
            this.super();
            // this.classList.add( 'transition' );
        },


        /*-----------------------------------------------------------*\
         *
         *  State Management
         *
        \*-----------------------------------------------------------*/


        /**
         * Shows the whole element and starts the 'in' animation
         *
         * @param animate {Boolean} determines if the animation fires or not
         * @event - emits a 'show' event
         */
        show: function( immediate ) {
            if ( this._showing ) return;

            var anims = [];
            anims.push( new Animation(
                this,
                frames.in, {
                    duration: ANIM_IN_SPD,
                    fill: 'forwards'
                }
            ));

            this.contents.forEach( function( el, index ) {
                anims.push( new Animation(
                    el,
                    frames.show, {
                        duration: ANIM_IN_SPD,
                        // delay: ANIM_DELAY * index,
                        delay: ANIM_DELAY * ( Math.sqrt( index ) * ANIM_DELAY_MAG ) + ( ANIM_IN_SPD * .4 ),
                        fill: 'forwards'
                    }
                ));
            });

            var anim = document.timeline.play( new AnimationGroup( anims ) );

            anim.onfinish = function( event ) {
                this.fire( 'showEnd' );
            }.bind( this );

            this._showing = true;
            this.fire( 'showStart' );
        },


        /**
         * Hides the whole element and starts the 'out' animation
         *
         * @event - emits a 'hide' event
         */
        hide: function() {
            if ( !this._showing ) return;

            var anims = [];
            this.contents.forEach( function( el, index ) {
                anims.push( new Animation(
                    this.contents[ this.contents.length - index - 1 ],
                    frames.hide, {
                        duration: ANIM_OUT_SPD,
                        // delay: ANIM_DELAY * index,
                        delay: ANIM_DELAY * ( Math.sqrt( index ) * ANIM_DELAY_MAG ),
                        fill: 'forwards'
                    }
                ));
            }, this );

            anims.push( new Animation(
                this,
                frames.out, {
                    duration: ANIM_OUT_SPD,
                    delay: ANIM_OUT_SPD,
                    fill: 'forwards'
                }
            ));

            var anim = document.timeline.play( new AnimationGroup( anims ) );
            this.fire( 'hideStart' );

            // Last to start will be last to finish so listen for the last one
            anim.onfinish = function( event ) {
                this._showing = false;
                this.fire( 'hideEnd' );
            }.bind( this );
        }

    });


})( this );
