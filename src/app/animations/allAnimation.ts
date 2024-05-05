import { trigger, transition, style, animate } from "@angular/animations";


export const enterAnimations = trigger('enterAnimations', [
    transition( ':enter', [
        style({ opacity: 0,  }),
        animate('1s ease-in-out', style({opacity: 1, })),
    
    ])
])
export const leaveAnimation = trigger('leaveAnimation', [
    transition( ':leave', [
        style({ opacity: 1}),
        animate('.3s ease-in-out', style({opacity: 0, transform: ' translate(-100%)'}))
    ])
])