<h1 align="center">
  RageMP: Better Bindings
</h1>

<h4 align="center">
  Fast and easy bindings in RageMP
</h4>

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)

## Install

### Yarn

```bash
yarn add ragemp-better-bindings
```

### NPM

```bash
npm install ragemp-better-bindings
```

## Usage

### Binding

```js
import KeyBinder from 'ragemp-better-bindings';

// Binding a key (on key down)
KeyBinder.bind('g', () => {
  mp.gui.chat.push("Key 'g'");
});

// Binding a key (on key up)
KeyBinder.bind('g', () => {
  mp.gui.chat.push("Key 'g' [released]");
}, true);

// Binding multiple keys 
KeyBinder.bind('ctrl+g', () => {
  mp.gui.chat.push("Key 'ctrl' + 'g'");
}, true);
```

### Unbinding

```js
import BetterBindings from 'ragemp-better-bindings';

// Way 1
const bindHandler = () => {};

BetterBindings.bind('g', bindHandler);
BetterBindings.unbind('g', bindHandler);

// Way 2
const unbinder = BetterBindings.bind('g', () => {});
unbinder();
```

### Adding/Removing modifiers

```js
import BetterBindings from 'ragemp-better-bindings';

BetterBindings.removeModifier('ctrl');
BetterBindings.addModifier('space');

BetterBindings.bind('space+g', () => {});
```

## API

### bind(key, handler, onRelease): unbinder

Binding a key, or keys. <br>
If you bind multiple keys the onRelease=true is not supported! <br>
This method returns a function that unbinds your bind on execution.

- key: string
    - All keys except the last one have to be modifiers! Default Modifiers: (ctrl, shift, alt)
- handler: function
- onRelease?: boolean (Default: false)

### unbind(key, handler)

Unbinding a key, or keys. <br>

- key: string
- handler: function

### addModifier(key)

Adds a new modifier to the modifier list.

- key: string

### delModifier(key)

Deletes a modifier from the modifier list.

- key: string


