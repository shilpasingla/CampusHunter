/*
 * jQuery selectbox plugin
 *
 * Copyright (c) 2007 Sadri Sahraoui (brainfault.com)
 * Licensed under the GPL license and MIT:
 *   http://www.opensource.org/licenses/GPL-license.php
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * The code is inspired from Autocomplete plugin (http://www.dyve.net/jquery/?autocomplete)
 *
 * Revision: $Id$
 * Version: 0.5
 * 
 * Changelog :
 *  Version 0.5 
 *  - separate css style for current selected element and hover element which solve the highlight issue 
 *  Version 0.4
 *  - Fix width when the select is in a hidden div   @Pawel Maziarz
 *  - Add a unique id for generated li to avoid conflict with other selects and empty values @Pawel Maziarz
 */
jQuery.fn.extend({selectbox:function(e){return this.each(function(){new jQuery.SelectBox(this,e)})}});if(!window.console)var console={log:function(e){}};jQuery.SelectBox=function(e,t){function l(){o=0,a.hide()}function c(){a.append(y(f.attr("id"))).hide();var e=f.css("width");a.width(e)}function h(e){var t=document.createElement("div");return a=$(t),a.attr("id",r+"_container"),a.addClass(e.containerClass),a}function p(e){var t=document.createElement("input"),n=$(t);return n.attr("id",r+"_input"),n.attr("type","text"),n.addClass(e.inputClass),n.attr("autocomplete","off"),n.attr("readonly","readonly"),n.attr("tabIndex",u.attr("tabindex")),n}function d(e){var t=$("li",a);if(!t)return;i+=e,i<0?i=0:i>=t.size()&&(i=t.size()-1),t.removeClass(n.hoverClass),$(t[i]).addClass(n.hoverClass)}function v(){var e=$("li."+n.currentClass,a).get(0),t=(""+e.id).split("_"),r=t[t.length-1];return u.val(r),f.val($(e).html()),!0}function m(){return u.val()}function g(){return f.val()}function y(e){var t=new Array,r=document.createElement("ul");return u.children("option").each(function(){var t=document.createElement("li");t.setAttribute("id",e+"_"+$(this).val()),t.innerHTML=$(this).html(),$(this).is(":selected")&&(f.val($(this).html()),$(t).addClass(n.currentClass)),r.appendChild(t),$(t).mouseover(function(e){o=1,n.debug&&console.log("over on : "+this.id),jQuery(e.target,a).addClass(n.hoverClass)}).mouseout(function(e){o=-1,n.debug&&console.log("out on : "+this.id),jQuery(e.target,a).removeClass(n.hoverClass)}).click(function(e){var t=$("li."+n.hoverClass,a).get(0);n.debug&&console.log("click on :"+this.id),$("li."+n.currentClass).removeClass(n.currentClass),$(this).addClass(n.currentClass),v(),l()})}),r}var n=t||{};n.inputClass=n.inputClass||"selectbox",n.containerClass=n.containerClass||"selectbox-wrapper",n.hoverClass=n.hoverClass||"current",n.currentClass=n.selectedClass||"selected",n.debug=n.debug||!1;var r=e.id,i=-1,s=!1,o=0,u=$(e),a=h(n),f=p(n);u.hide().before(f).before(a),c(),f.click(function(){s||a.toggle()}).focus(function(){a.not(":visible")&&(s=!0,a.show())}).keydown(function(e){switch(e.keyCode){case 38:e.preventDefault(),d(-1);break;case 40:e.preventDefault(),d(1);break;case 13:e.preventDefault(),$("li."+n.hoverClass).trigger("click");break;case 27:l()}}).blur(function(){a.is(":visible")&&o>0?n.debug&&console.log("container visible and has focus"):l()})};