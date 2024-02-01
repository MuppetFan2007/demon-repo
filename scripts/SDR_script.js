// SRD_script.js
document.getElementById('calculateButton').addEventListener('click', calculateAttack);
document.getElementById('resetButton').addEventListener('click', resetFields);

function rollDice(sides, numDice) {
    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}

function calculateAttack() {
    const numRolls = parseInt(document.getElementById('numRolls').value) || 0;
    const BonusMod = parseInt(document.getElementById('BonusMod').value) || 0;
    const rollingMethod = document.getElementById('rollingMethod').value;

    let rolls = [];

    for (let i = 0; i < numRolls; i++) {
        const roll1 = rollDice(20, 1);
        const roll2 = rollDice(20, 1);
        let roll = roll1;

        if (rollingMethod === 'Advantage') {
            roll = Math.max(roll1, roll2);
        } else if (rollingMethod === 'Disadvantage') {
            roll = Math.min(roll1, roll2);
        }

        const adjustedRoll = roll + BonusMod;
        rolls.push({ roll1, roll2, adjustedRoll });
    }

    // Sort rolls by adjustedRoll
    rolls.sort((a, b) => a.adjustedRoll - b.adjustedRoll);

    let outputText = '';

    rolls.forEach(r => {
        if(rollingMethod === 'Straight') {
            outputText += `Roll: ${r.roll1}\n(Adjusted Roll: ${r.adjustedRoll})\n`;
        } else {
            outputText += `Roll 1: ${r.roll1}\nRoll 2: ${r.roll2} \n(Adjusted Roll: ${r.adjustedRoll})\n`;
        }
        outputText += '\n';
    });

    document.getElementById('outputText').innerText = outputText;
}


function resetFields() {
    document.getElementById('numRolls').value = '';
    document.getElementById('BonusMod').value = '';
    document.getElementById('rollingMethod').selectedIndex = 0;
    document.getElementById('outputText').innerText = '';
    document.getElementById('totalDamageText').innerText = '';
}
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('change');
    document.querySelector('.menu-content').style.display = this.classList.contains('change') ? 'block' : 'none';
});