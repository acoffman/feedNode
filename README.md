# feedNode

What is this?
---------------

This is a demo newsfeed application created using node.js and socket.io. It was created out of a desire to learn how both technologies worked. It is not yet suitable for use in a production environment - but it provides a decent overview of how to set up and create a node.js application that uses socket.io for "comet" style data pushing.

In its current form the application allows for clients to POST messages to the server using an application specific key and those messages will in turn be pushed out to all clients viewing the news feed and color coded according to the application that sent them. 


Installation
------------

Install [node.js](http://nodejs.org/)  
Install [node package manager](http://npmjs.org/) (this step is optional but makes installing node.js plugins much easier)


Install the following node.js plugins. You can either use npm or install them manually  
[socket.io](http://socket.io/)  
[jade](http://jade-lang.com/)  
[express](http://expressjs.com/)


Usage
------------

Any client that can send a POST request can send messages to the newsfeed. There is a sample ruby client included in the source.

In order to add an application to the server you must add an entry in the applications.json file. There you will give your application a name, a token and a display color. Once the server is started up you may send messages to it in the following format: POST http://server/application token/message
Make sure you URI escape your message.


Security
-------

As stated earlier - this app isn't suitable for a production environment yet. No attempt was made to ensure the security of the app and thusly there are several possible exploits. For starters the POST data is in the URL rather than the body and is not sent over https therefore anyone with a packet sniffer and 2 minutes of time could discern your "secret" application tokens and send messages to the server themselves. Additionally no attempts were made to escapge messages sent in to the server - they will be added to the DOMs of the client pages essentially "as is" opening up all sorts of fun injection avenues. Making the changes needed to close these holes wouldn't be difficult - but wasn't nesscary for my purposes.

Author
-------

* [Adam Coffman](http://thecoffman.com) :: coffman.adam@gmail.com


License
-------

Copyright (c) 2010 Adam Coffman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

