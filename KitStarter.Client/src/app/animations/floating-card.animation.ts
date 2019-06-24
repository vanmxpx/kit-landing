import { query, transition, trigger, state, style, sequence, animate } from '@angular/animations';

export const rippleAnimation = trigger('rippleAnimation', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
        query('.ripple',
            style({
                border: '0px solid #5ae4aa',
                borderRadius: '50%',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                opacity: 0,
                transform: 'scale(0.001, 0.001)'
            }),
        ),

        sequence([
            query('.ripple', animate('0.01s linear', style({
                opacity: 0.7,
                borderWidth: 30,
            }))),
            query('.ripple', animate('0.2s linear', style({

                transform: 'scale(1, 1)'
            }))),
            query('.ripple', animate('0.3s ease-out', style({
                opacity: 0,
                borderWidth: 1,
                transform: 'scale(1.5, 1.5)'
            })))
        ])
    ])
]);
