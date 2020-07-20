'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import "formdata-polyfill";
import 'es6-promise';
import 'fetch-polyfill';


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandPhotos from './modules/commandPhotos';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
let idInterval = setInterval(countTimer, 1000, '22 july 2021');

// Menu
toggleMenu();

// popup
togglePopUp();

// Табы
tabs();

// Слайдер
slider();

// Наша Команда
// Необходимо реализовать, чтобы по наведению мышкой менялись фотографии,
//  а если увести мышку с элемента то возвращается прежнее фото.
commandPhotos();  

// калькулятор
calc(100);

// send-ajax-form
sendForm();