document.getElementById('calculateButton').addEventListener('click', calculateAttack);
document.getElementById('resetButton').addEventListener('click', resetFields);

function rollDice(sides, numDice) {
    let total = 0;
    let rolls = [];
    for (let i = 0; i < numDice; i++) {
        let roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        total += roll;
    }
    return { total, rolls };
}

function calculateAttack() {
    const numAttacks = parseInt(document.getElementById('numAttacks').value) || 0;
    const bonusDamage = parseInt(document.getElementById('bonusDamage').value) || 0;
    const numHitDice = parseInt(document.getElementById('numHitDice').value) || 0;
    const hitDiceSides = parseInt(document.getElementById('hitDiceSides').value) || 0;

    let outputText = '<ul>';
    let totalDamage = 0;

    for (let i = 0; i < numAttacks; i++) {
        const { total, rolls } = rollDice(hitDiceSides, numHitDice);
        const damage = total + bonusDamage;
        totalDamage += damage;
        outputText += `<li>Attack ${i + 1}: <br> - Dice Roll(s): [${rolls.join(", ")}] <br> - Bonus Damage: ${bonusDamage} <br> - Total Damage: ${damage}</li>`;
    }


    document.getElementById('outputText').innerHTML = outputText;
    document.getElementById('totalDamageText').innerText = `Total Damage: ${totalDamage}`;
}

function resetFields() {
    document.getElementById('numAttacks').value = '';
    document.getElementById('bonusDamage').value = '';
    document.getElementById('hitDiceSides').value = '';
    document.getElementById('outputText').innerText = '';
}
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('change');
    document.querySelector('.menu-content').style.display = this.classList.contains('change') ? 'block' : 'none';
});