# Better Bindings for RageMP

A small module that helps you to manage keybinds

## Installation

```bash
npm install ragemp-better-bindings --save
// or
yarn ragemp-better-bindings --save
```

## Usage

You can easily create keybinds like 'ctrl+a' (modifier+key).

For a combination like 'a+b' you need to add a modifier to the modifier-array.

For the whole key-list take a look into the file 'Keys.js'

```js
import keyBinder from 'ragemp-better-bindings';

keyBinder.modifiers.push(keyBinder.Keys['a']);
```

### Bind

```js
bind(key, handler, onRelease); 
```
The third argument is optional. If you pass `true` it will fire the handler on relase.
This binds dont support multibinds!

```js
import keyBinder from 'ragemp-better-bindings';

keyBinder.bind('ctrl+n', () => {
    mp.gui.chat.push("ctrl+n");
});

keyBinder.bind('ctrl+b', () => {
    mp.gui.chat.push("ctrl+b");
});

keyBinder.bind('ctrl+shift+b', () => {
    mp.gui.chat.push("ctrl+shift+b");
});

keyBinder.bind('o', () => {
    mp.gui.chat.push("o - released");
}, true); 

```
