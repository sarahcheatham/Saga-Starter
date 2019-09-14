Run yarn to install all the dependencies
yarn start to spin this up
built using only create-react-app

This repo is an example of the use redux. 
As a data layer state management tool, it's very easy to get
started.

This repo also uses Sagas to deploy its asynchronous calls to the
store. There are many options available for this layer of an
apps code base, but for now, I prefer redux-saga and its 
effects. 

Saga will take async code and make it feel and run more
synchronous. Although it's no more synchronous than a JS
promise or a thunk, (which is just a promise), it's concise
and easy to read & easy to test too. 