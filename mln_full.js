  "use strict";
  (function($)
  {
    $.fn.mln_full = function(opcoes)
    {
      return this.each (function(i,v)
      {
        //HTML
        var menu = '<nav id="menu_dir" class=""><ul>';
        $(opcoes.target).each(function( index, element )
        {
          if(index == '0')
          {
            var menu_text = opcoes.itens[index];
            if(menu_text)
            {
              menu += '<li data-page="'+index+'"><div></div><span id="menupage'+index+'" class="show">'+menu_text+'</span></li>';            }
          }
          else
          {
            var menu_text = opcoes.itens[index];
            if(menu_text)
            {
            menu += '<li data-page="'+index+'"><div></div><span id="menupage'+index+'" style="display: "none";">'+menu_text+'</span></li>';
          }
        }
        });
        menu += '</ul></nav>';
        $('body').prepend(menu);
        
        //CSS
        var css = '<style type="text/css">';
        css += '.hide{display: none !important;}';
        css += '.show{display: block !important;}';
        css += 'nav#menu_dir {position: fixed; right: 10px; top: 50%; height: 260px; margin-top: -130px; z-index: 99; }';
        css += 'nav#menu_dir ul {float: left; width: 140px; }';
        css += 'nav#menu_dir ul li {float: left; width: 100%; cursor: pointer; cursor: hand; color: '+opcoes.color+'; font-size: 13px; padding: 3px 0px;}';
        css += 'nav#menu_dir li span { float: right; display: none; text-align: right; margin-right: 10px; margin-top: -3px; }';
        css += 'nav#menu_dir li div { float: right; height: 17px; width: 17px; background-color: '+opcoes.color+'; border-radius: 50%; -moz-border-radius: 50%; }';
        css += 'nav#menu_dir li div.sel { background-color: '+opcoes.hover+'; }';
        css += '</style>';
        $('body').prepend(css);

        //JS
        var mln_pag_atual = 1;
        var mln_tela_atual = 0;
        var mln_tela_atual = 0;
        var mln_alturas = new Array();

        //add classes de controle
        $('.mln_sec').each(function(a,b)
        {
          $(b).addClass('mln_full'+a);
          $(b).attr('data-page',a);
        });

        //tamanho da tela
        function mln_resize()
        {
          if(opcoes.full)
          {
            //$(opcoes.target).css('height', $(window).height()+'px');
            $(opcoes.target).css('height', window.innerHeight +'px');
          }

          $('.mln_sec').each(function(a,b)
          {
            mln_alturas[a] = $(b).outerHeight();
          });
          console.log(mln_alturas);
        }

        $(window).resize(function()
        { 
          mln_resize(); 
        });
        mln_resize();

        //calcular abrir menu lateral
        $(window).scroll(function () 
        {
          var top = $(window).scrollTop();
          //top = top + 300;

          var aux_tela = 0;
          var total_height = 0;
          var i = 0;
          for(i; i < mln_alturas.length; i++)
          {
            total_height += mln_alturas[i];
            if(top < total_height)
            {
              mln_tela_atual = i;
              break;
            }
          }

          //var dif = (mln_tela_atual+1);
          var dif = mln_tela_atual;
          
          if(dif != mln_pag_atual)
          {
            mln_pag_atual = dif;

              $('nav#menu_dir').removeClass('hide');
              $('nav#menu_dir li span').removeClass('show');
              $('nav#menu_dir li div').removeClass('sel');
              $('#menupage'+mln_pag_atual).addClass('show');
              $('#menupage'+mln_pag_atual).parent().find('div').addClass('sel');
          }               
        });

        //clique no menu
        $("nav#menu_dir li").click(function() 
        {
          var page = $(this).attr('data-page');
          $('html, body').animate({
            scrollTop: $('.mln_full'+page).offset().top
          }, 1000);
        });

        //open menu
        $('nav#menu_dir li div').hover(function()
        {
          $(this).next().css('display', 'block');
          $(this).addClass('sel');
        },
        function()
        {
        });

        $('nav#menu_dir li').hover(function()
        {
        },
        function()
        {
          $(this).find('span').css('display', 'none');
          $(this).find('div').removeClass('sel');
        });

      });
    }
  })( jQuery );





  // Vik

  /*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

  'use strict';
  
  // class helper functions from bonzo https://github.com/ded/bonzo
  
  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }
  
  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;
  
  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }
  
  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }
  
  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };
  
  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( classie );
  } else {
    // browser global
    window.classie = classie;
  }
  
  })( window );
  // EventListener | @jon_neal | //github.com/jonathantneal/EventListener
  !window.addEventListener && window.Element && (function () {
      function addToPrototype(name, method) {
          Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
      }
   
      var registry = [];
   
      addToPrototype("addEventListener", function (type, listener) {
          var target = this;
   
          registry.unshift({
              __listener: function (event) {
                  event.currentTarget = target;
                  event.pageX = event.clientX + document.documentElement.scrollLeft;
                  event.pageY = event.clientY + document.documentElement.scrollTop;
                  event.preventDefault = function () { event.returnValue = false };
                  event.relatedTarget = event.fromElement || null;
                  event.stopPropagation = function () { event.cancelBubble = true };
                  event.relatedTarget = event.fromElement || null;
                  event.target = event.srcElement || target;
                  event.timeStamp = +new Date;
   
                  listener.call(target, event);
              },
              listener: listener,
              target: target,
              type: type
          });
   
          this.attachEvent("on" + type, registry[0].__listener);
      });
   
      addToPrototype("removeEventListener", function (type, listener) {
          for (var index = 0, length = registry.length; index < length; ++index) {
              if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
                  return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
              }
          }
      });
   
      addToPrototype("dispatchEvent", function (eventObject) {
          try {
              return this.fireEvent("on" + eventObject.type, eventObject);
          } catch (error) {
              for (var index = 0, length = registry.length; index < length; ++index) {
                  if (registry[index].target == this && registry[index].type == eventObject.type) {
                      registry[index].call(this, eventObject);
                  }
              }
          }
      });
  })();
  

  //for the menue button
  (function(){

    var button = document.getElementById('cn-button'),
      wrapper = document.getElementById('cn-wrapper'),
      overlay = document.getElementById('cn-overlay');
  
    //open and close menu when the button is clicked
    var open = false;
    button.addEventListener('click', handler, false);
    button.addEventListener('focus', handler, false);
    wrapper.addEventListener('click', cnhandle, false);
  
    function cnhandle(e){
      e.stopPropagation();
    }
  
    function handler(e){
      if (!e) var e = window.event;
      e.stopPropagation();//so that it doesn't trigger click event on document
  
        if(!open){
          openNav();
        }
      else{
          closeNav();
        }
    }
    function openNav(){
      open = true;
        // button.innerHTML = "-";
        classie.add(overlay, 'on-overlay');
        classie.add(wrapper, 'opened-nav');
    }
    function closeNav(){
      open = false;
      // button.innerHTML = "+";
      classie.remove(overlay, 'on-overlay');
      classie.remove(wrapper, 'opened-nav');
    }
    document.addEventListener('click', closeNav);
  
  })();


  function typeEffect(element, speed) {
    var text = $(element).text();
    $(element).html('');
    
    var i = 0;
    var timer = setInterval(function() {
            if (i < text.length) {
              $(element).append(text.charAt(i));
              i++;
            } else {
              clearInterval(timer);
            }
          }, speed);
  }
  
  (function() {
    var speed = 75;
    var delay = $('#page1_line_one').text().length * speed + speed;
    typeEffect($('#page1_line_one'), speed);
    // setTimeout(function(){
    //   $('#type-name').css('display', 'inline-block');
    //   typeEffect($('#type-name'), speed);
    // }, delay);
  })();


  $(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('000');
            $('.filter').filter('.'+value).show('000');
            
        }
    });

});


