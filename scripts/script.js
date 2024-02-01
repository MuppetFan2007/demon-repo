// script.js
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
    const numAttacks = parseInt(document.getElementById('numAttacks').value) || 0;
    const ac = parseInt(document.getElementById('ac').value) || 0;
    const plusToHit = parseInt(document.getElementById('plusToHit').value) || 0;
    const bonusDamage = parseInt(document.getElementById('bonusDamage').value) || 0;
    const numHitDice = parseInt(document.getElementById('numHitDice').value) || 0;
    const hitDiceSides = parseInt(document.getElementById('hitDiceSides').value) || 0;
    const rollingMethod = document.getElementById('rollingMethod').value;

    let attacks = [];
    let totalDamage = 0;
    let totalHits = 0;
    let totalCrits = 0;

    for (let i = 0; i < numAttacks; i++) {
        const roll1 = rollDice(20, 1);
        const roll2 = rollDice(20, 1);
        let roll = roll1;
        let isHit = false;
        let isCrit = false;
        let damage = 0;

        if (rollingMethod === 'Advantage') {
            roll = Math.max(roll1, roll2);
        } else if (rollingMethod === 'Disadvantage') {
            roll = Math.min(roll1, roll2);
        }

        const adjustedRoll = roll + plusToHit;

        if (ac !== 0 && adjustedRoll >= ac) {
            isHit = true;
            totalHits += 1;
            const damageRoll = rollDice(hitDiceSides, numHitDice);
            damage = damageRoll + bonusDamage;
            totalDamage += damage;

            if (roll === 20) {
                isCrit = true;
                totalCrits += 1;
                const critDamageRoll = rollDice(hitDiceSides, numHitDice);
                const critDamage = critDamageRoll + hitDiceSides;
                totalDamage += critDamage;
                damage += critDamage;
            }
        }

        attacks.push({ attackNumber: i + 1, roll1, roll2, adjustedRoll, isHit, isCrit, damage });
    }

    // Sort attacks by adjustedRoll
    attacks.sort((a, b) => a.adjustedRoll - b.adjustedRoll);

    let outputText = '';

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

    document.getElementById('outputText').innerText = outputText;
    document.getElementById('totalDamageText').innerText = `Total Hits: ${totalHits}\nTotal Crits: ${totalCrits}\nTotal Damage: ${totalDamage}`;
}

function resetFields() {
    document.getElementById('numAttacks').value = '';
    document.getElementById('ac').value = '';
    document.getElementById('plusToHit').value = '';
    document.getElementById('bonusDamage').value = '';
    document.getElementById('numHitDice').value = '';
    document.getElementById('hitDiceSides').selectedIndex = 0;
    document.getElementById('rollingMethod').selectedIndex = 0;
    document.getElementById('outputText').innerText = '';
    document.getElementById('totalDamageText').innerText = '';
}
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('change');
    document.querySelector('.menu-content').style.display = this.classList.contains('change') ? 'block' : 'none';
});