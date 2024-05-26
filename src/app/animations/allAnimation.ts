import { trigger, transition, style, animate } from "@angular/animations";


export const enterAnimations = trigger('enterAnimations', [
    transition(':enter', [
        style({ opacity: 0, }),
        animate('1s ease-in-out', style({ opacity: 1, })),

    ])
])
export const leaveAnimation = trigger('leaveAnimation', [
    transition(':leave', [
        style({ opacity: 1 }),
        animate('.3s ease-in-out', style({ opacity: 0}))
    ])
])
export const modalEnterAnimation = trigger('modalEnterAnimation', [
    transition(':enter', [
        style({ opacity: 0, }),
        animate('.6s ease-in-out', style({ opacity: 1, })),
    ])
])
export const modalleaveAnimation = trigger('modalleaveAnimation', [
    transition(':leave', [
        style({ opacity: 1, }),
        animate('.5s ease-in-out', style({ opacity: 0, })),
    ])
])
export const profileEnterAnimation = trigger('profileEnter', [
    transition(':enter', [
        style({ opacity: 0, }),
        animate('.3s ease-in-out', style({ opacity: 1, })),
    ])
])
export const profileLeaveAnimation = trigger('profileLeave', [
    transition(':leave', [
        style({ opacity: 1, }),
        animate('.5s ease-in-out', style({ opacity: 0, })),
    ])
])