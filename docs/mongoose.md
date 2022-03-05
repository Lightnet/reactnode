



https://masteringjs.io/tutorials/mongoose/save#:~:text=save()%20is%20a%20method,Mongoose%20insert%20a%20new%20document.


```js
const person = await Person.findOne();
person.name; // 'Will Riker'

// Mongoose _tracks changes_ on documents. Mongoose
// tracks that you set the `rank` property, and persists
// that change to the database.
person.rank = 'Captain';
await person.save();

// Load the document from the database and see the changes
const docs = await Person.find();

docs.length; // 1
docs[0].rank; // 'Captain'
```
