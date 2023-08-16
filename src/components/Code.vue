<template>
  <pre>
    <code class="language-js">/*
 * This is how to press some code to opt GAMES:
 *  S: Start Game!
 *  CODE: Enter like A3 to play chess!
 *  E: Modify Chess Color!
 *  TODO: ↓
 *  R: Apply for a new game!
 *  C: Apply to switch to another color of the chess piece!
 * Note: The following code is irrelevant, please ignore it!
 */</code></pre>
  <pre
    contenteditable
  ><code class="language-js">import * as templates from './somewhere';
import Musician from './musician';
import Artist from './artist';

const something = true;
export let blah = 123;
var somethingElse = false;

function test() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

class SomeClass {
    render() {
        return templates.helloWorld();
    }
}

class TaylorSwift extends Musician {
    constructor(position) {
        super(position);
    }

    get yearOfBirth() {
        return 1989;
    }

    perform(song) {
        this.sing(song)
    }
}

class LiBai extends Artist {
    constructor(position) {
        super(position);
    }

    get yearOfBirth() {
        return 1989;
    }

    perform(song) {
        this.sing(song)
    }
}

export default Paul;</code></pre>
</template>
<style>
pre {
  background-color: var(--background-color);
  white-space: pre-wrap;
  outline: none;
  margin: 0;
}

pre > :deep(*) {
  background-color: var(--background-color) !important;
}
</style>