// import { Directive, HostListener, Input, ElementRef } from '@angular/core';
// import { ScrollManagerDirective } from './scroll-manager.directive';
// import { ScrollSectionDirective } from './scroll-section.directive';
// import { ScrollManagerDirective } from './scroll-manager.directive';

// @Directive({
//     selector: '[appScrollAnchor]',
//     selector: '[appScrollManager]',
//     selector: '[appScrollSection]',
//   })


//   export class ScrollAnchorDirective {
//     @Input('appScrollAnchor') id: string | number;
  
//     constructor(private manager: ScrollManagerDirective) {}
  
//     @HostListener('click')
//     scroll() {
//       this.manager.scroll(this.id);
//     }
//   }

agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-rating', [],
        function (dep) {
            return {
                transclude: true,
                controller: "common.RatingController",
                templateUrl: '/App/common/directives/common.rating.html',
            };
        },
        {
            ratingValue: '=',
        })
    .defineController('common.RatingController', [],
        function (vm, dep, tool) {
            vm.colors = [
                   '#BBB',
                   '#BBB',
                   '#BBB',
                   '#BBB',
                   '#BBB'
            ];
            var colorSet = ['#BBB', '#C5BB9F', '#CFBB83', '#D6BB70', '#DDBB5E', '#E4BB4B', '#EBBB38', '#F1BB25', '#F8BB13', '#FB0', '#FB0'];

            tool.onRendered(function () {
                var values = [];
                for (var i = 0; i < 5; i++) {
                    var remaining = vm.ratingValue - i;

                    if (remaining > 1) {
                        remaining = 1;
                    }else if (remaining < 0) {
                        remaining = 0;
                    }
                    values.push(colorSet[Math.floor(remaining * 10)]);
                }
                vm.colors = values;
            });
        });