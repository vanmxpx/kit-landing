import { query, transition, trigger, state, style, sequence, animate, keyframes, group } from '@angular/animations';

export const bubbleAnimation = trigger('bubbleAnimation', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
        query('.bubble-top, .bubble-bottom',
            style({
                position: 'absolute',
                width: '140%',
                height: '100%',
                left: '-10%',
                transition: 'all ease-in-out 0.5s',
                backgroundRepeat: 'no-repeat',
                display: 'none',
            })
        ),
        query('.bubble-top',
            style({
                top: '-75%',
                backgroundImage:
                   `radial-gradient(circle, #ff0081 20%, transparent 20%),
                    radial-gradient(circle, transparent 20%, #ff0081 20%, transparent 30%),
                    radial-gradient(circle, #ff0081 20%, transparent 20%),
                    radial-gradient(circle, #ff0081 20%, transparent 20%),
                    radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%),
                    radial-gradient(circle, #ff0081 20%, transparent 20%),
                    radial-gradient(circle, #ff0081 20%, transparent 20%),
                    radial-gradient(circle, #ff0081 20%, transparent 20%),
                    radial-gradient(circle, #ff0081 20%, transparent 20%)`,
                backgroundSize: '10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%'
            }),
        ),
        query('.bubble-bottom',
            style({
                bottom: '-75%',
                backgroundImage:
                    `radial-gradient(circle, #ff0081 20%, transparent 20%),
                     radial-gradient(circle, #ff0081 20%, transparent 20%),
                     radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%),
                     radial-gradient(circle, #ff0081 20%, transparent 20%),
                     radial-gradient(circle, #ff0081 20%, transparent 20%),
                     radial-gradient(circle, #ff0081 20%, transparent 20%),
                     radial-gradient(circle, #ff0081 20%, transparent 20%)`,
                backgroundSize: '15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%'
            }),
        ),
        group([
            animate('0.75s ease-in-out', keyframes([
                style({
                    offset: 0,
                    transform: 'scale(1)'
                }),
                style({
                    offset: 0.1,
                    transform: 'scale(0.9)'
                }),
                style({
                    offset: 0.7,
                    transform: 'scale(1)'
                })
            ])),
            query('.bubble-top', animate('0.75s ease-in-out', keyframes([
                style({ display: 'block',
                        backgroundPosition: '5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%' }),
                style({ backgroundPosition: '0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%'}),
                style({ backgroundPosition: '0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%',
                        backgroundSize: '0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%'})
            ]))),
            query('.bubble-bottom', animate('0.75s ease-in-out', keyframes([
                style({ display: 'block',
                        backgroundPosition: '10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%' }),
                style({ backgroundPosition: '0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%' }),
                style({ backgroundPosition: '0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%',
                        backgroundSize: '0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%'
                })
            ])))
        ])
    ])
]);
