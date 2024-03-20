# Homepage

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Code Annotation Examples





### Codeblocks
This is a test of javascript  `code` 

```js title="atk.js"

    attacks.forEach(a => {
        if(rollingMethod === 'Straight') {
            outputText += `Attack ${a.attackNumber}\nRoll: ${a.roll1}\n(Adjusted Roll: ${a.adjustedRoll})\n`;
        } else {
            outputText += `Attack ${a.attackNumber}\nRoll 1: ${a.roll1}\nRoll 2: ${a.roll2} \n(Adjusted Roll: ${a.adjustedRoll})\n`;
        }
        if (a.isHit) {
            outputText += ` Hit - Damage: ${a.damage}\n`;
            if (a.isCrit) {
                outputText += ` Critical Hit!\n`;
            }
        } else {
            outputText += ` Miss\n`;
        }
        outputText += '\n';
    });

```

