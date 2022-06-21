agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.HeaderController", [],
    function (vm, dep, tool) {

        
        tool.onRendered(function(){
            $(document).ready(function(){
  
                //fixed secondary nav
                
                var secondaryHead = $('nav');
                 var secondaryHeadTopPosition = secondaryHead.offset().top;
                $(window).on('scroll', function(){
                      if($(window).scrollTop() > secondaryHeadTopPosition ) {
                          secondaryHead.addClass('fixed-nav');	
                    $(".logo").addClass("fixed-logo");
                    $(".logo-title").addClass("fixed-logo");
                    $(".logo-box").addClass("fixed-logo-box");
                    $("nav ul").addClass("fixed-links");
                    $(".snd-menu").addClass("snd-menu-fx"); 
                          
                      } 
                  else {
                          secondaryHead.removeClass('fixed-nav');
                    $(".logo").removeClass("fixed-logo");
                    $(".logo-title").removeClass("fixed-logo");
                    $(".logo-box").removeClass("fixed-logo-box");
                    $("nav ul").removeClass("fixed-links");
                    $(".snd-menu").removeClass("snd-menu-fx"); 
                      }
                  });
                
              //   header shrink	 
              });
        })

        tool.initialize(function () {
            
        });
    })
    .defineDirectiveForE("agm-landing-header", [],
    function () {
        return {
            controller: "agm.landing.HeaderController",
            templateUrl: "/App/landing/directives/landing.header.html"
        };
    },
    {
        showLogoOnly: "=?",
        showSubMenu: "=?",
        showDarkMenu: "=?"
    });