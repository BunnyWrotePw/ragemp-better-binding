const {Keys} = require('./Keys');

class BetterBinding {
  constructor() {
    this.pressedKeys = {};
    this.binds = {};
    this.keyListeners = {};
    this.modifiers = [
        Keys['ctrl'],
        Keys['alt'],
        Keys['shift'],
        Keys['a'],
    ];
  }

  _handleKeyDown(keyCode) {
    this.pressedKeys[keyCode] = true;

    Object.values(this.binds).filter(b => !b.onUp && (b.modifiers.includes(keyCode) || b.key === keyCode)).forEach(bind => {
      if((bind.modifiers.length > 0 && bind.modifiers.filter(m => !this.pressedKeys[m]).length === 0 && this.pressedKeys[bind.key]) || bind.modifiers.length === 0) {
        bind.handlers.filter(h => typeof h === 'function').forEach(h => h());
      }
    });
  }

  _handleKeyUp(keyCode) {
    delete this.pressedKeys[keyCode];

    Object.values(this.binds).filter(b => b.onUp && b.key === keyCode).forEach(bind => {
      bind.handlers.filter(h => typeof h === 'function').forEach(h => h());
    });
  }


  bind(keys, handler, onUp) {
    let modifiers = keys.split(/\+/);
    let key = modifiers.pop();

    if(Keys[key]) {
      key = Keys[key];
    } else {
      throw new Error(`${key} is not a valid key!`);
    }

    for(let i = 0; i < modifiers.length; i++) {
      if (Keys[modifiers[i]] && this.modifiers.includes(Keys[modifiers[i]])) {
        modifiers[i] = Keys[modifiers[i]];
      } else {
        throw new Error(`${modifiers[i]} is not a valid modifier!`);
      }
    }

    if(onUp && modifiers.length > 0) {
      throw new Error("The keyup-event doesn't support modifiers!");
    }

    if(this.binds[keys]) {
      this.binds[keys].handlers.push(handler);
    } else {
      [...modifiers, key].filter(k => !this.keyListeners.hasOwnProperty(k)).forEach(k => this._startKeyListener(k));

      this.binds[keys] = {
        onUp: onUp || false,
        modifiers,
        key,
        handlers: [handler],
      };
    }

    return () => {
      this.unbind(keys, handler);
    }
  }

  unbind(keys, handler) {
    let bind = this.binds[keys];
    if(bind) {
      let indexToDelete = bind.handlers.indexOf(handler);
      if(indexToDelete !== -1) {
        bind.handlers.splice(indexToDelete, 1);
        if(bind.handlers.length === 0) {
          delete this.binds[keys];
          this._cleanKeyListeners([...bind.modifiers, bind.key]);
        }
      }
    }
  }

  _startKeyListener(keyCode) {
    this.keyListeners[keyCode] = {
      downHandler: () => {
        this._handleKeyDown(keyCode);
      },
      upHandler: () => {
        this._handleKeyUp(keyCode);
      },
    };

    mp.keys.bind(keyCode, true, this.keyListeners[keyCode].downHandler);
    mp.keys.bind(keyCode, false, this.keyListeners[keyCode].upHandler);
  }

  _stopKeyListener(keyCode) {
    if(this.keyListeners[keyCode]) {
      mp.keys.unbind(keyCode, true, this.keyListeners[keyCode].downHandler);
      mp.keys.unbind(keyCode, false, this.keyListeners[keyCode].upHandler);
      delete this.keyListeners[keyCode];
    }
  }

  _cleanKeyListeners(keys) {
    keys.filter(key => Object.values(this.binds).filter(b => b.modifiers.includes(key) || b.key === key).length === 0).forEach(key => {
      this._stopKeyListener(key);
    });
  }

}

const betterBinding = new BetterBinding();

exports = betterBinding;
