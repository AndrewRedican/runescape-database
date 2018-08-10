# RuneScape Database

A hobby project coding project. I use this project to practice coding techniques I have learned while also developing new cod that I could potentially use on the professional scope.

## Project Description

Develop a single-page web application that provides a single admin user (me), the abbility to collect data from [**RuneScape**](http://runescape.com)'s Grand Exchange. 

I find this an interesting project because:
A) A BIG fan of RuneScape myself.
B) RuneScape's the Grand Exchange, is one of the most advance exchange mechanisms any game / MMORPG has ever provided. The value of items are determined by supply/demand. In other wors, prices are not fixed, and vary over time based on the RuneScape community. This exchange mechanism simulates (sort-of) what a real Stock Exchange would look like. It is an excellent way to practice for the real thing.
C) Firebase functions, server side functions, scheduled tasks, are one of the most recent thing I've learned. I am hoping I can develop a framework that could allow me to run and control serverside functions better. For example. I'd like to be able to:

1. Trigger execution of server side operations from client side.
2. Abbility to log normal messages, errors, and warnings, similar to console.log(). At the moment I have found the firebase console lacking. This is especially true for the next reason below.
3. Firebase function does not support the latest node version, nor the bleeding edge ES syntax. There codes needs to be transpiled to the version of node and syntax it can understand. When it comes to debugging it makes it much harded because you will not see the original code, but the transpiled version instead.
4. I would like to be able to start, pause, cancel, delay, schedule, and keep notification of progress for each function.
5. Should other scheduled functions scope overlap, function should not run simultaneously but rather wait, and run synchronously. 
6. Functions should use atomicUpdates whenever possible, but also break writes into separate tasks should it be deemed necessary.

Server side functions will call [**Grand Exchange Database API**](http://runescape.wikia.com/wiki/Application_programming_interface) periodically to retrieve the most recent information. It will then compare the existing prices and update the current price and add to a historical log of price from which a tendency can be constructed.

This web application should let anyone navigate information/contents. Users a limited only to read information.
A single user recognized as admin (me) should have control over application settings.
For this purpose a login mechanism using Firebase Auth with Google has been provided.

## Live Project At

[**https://runescape-database.firebaseapp.com**](https://runescape-database.firebaseapp.com)