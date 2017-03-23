import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

export const Animations = {
    fadeInX:
    trigger('fadeInX', [
        state('in', style({ opacity: 1, transform: 'translateX(0)' })),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateX(-30px)'
            }),
            animate('0.4s cubic-bezier(0.075, 0.82, 0.165, 1)')
        ])
    ])
    ,
    fadeOutX:
    trigger('fadeOutX', [
        state('false', style({ opacity: 1, transform: 'translateX(0px)' })),
        state('true', style({ opacity: 0, transform: 'translateY(50px)' })),
        transition('0 => 1', animate('0.6s ease-out')),
        transition('1 => 0', [
            animate('2.6s ease-out'),
            style({
                opacity: 0,
                transform: 'translateY(50px)'
            })
        ])
    ])
    ,
    fadeInOutX:
    trigger('fadeInOutX', [
        state('in', style({ opacity: 1, transform: 'translateX(0)' })),
        transition('void => *', [
            style({ opacity: 0, transform: 'translateX(-50px)' }),
            animate('0.2s ease-out')
        ]),
        transition('* => void', [
            animate('0.2s ease-out', style({ opacity: 0, transform: 'translateX(50px)' }))
        ])
    ])
    ,
    fadeInYBottom:
    trigger('fadeInYBottom', [
        state('in', style({ opacity: 1, transform: 'translateY(0)' })),
        transition('void => *', [
            style({
                opacity: 0,
                transform: 'translateY(100%)'
            }),
            animate('.2s ease')
        ]),
        transition('* => void', [
            animate('.2s ease', style({
                opacity: 0,
                transform: 'translateY(100%)'
            }))
        ])
    ])
}