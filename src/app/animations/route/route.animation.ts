import { trigger, query, style, transition, animate, group } from "@angular/animations";

export const routeAnimation = trigger('routeAnimation',[
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%',
                top: 0,
                left: 0,
            })
        ], { optional: true }),
        
        group([
            query(':leave', [
                animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0}))
            ], { optional: true }),
            query(':enter', [
                style({ transform: 'translateX(-100%)', opacity: 0}),
                animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1}))
            ], { optional: true }),
        ])
    ])
]);