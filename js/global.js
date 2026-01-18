
document.addEventListener('DOMContentLoaded', function() {
    const corpsPage = document.body;

    // Effets jetons

    const totalJetons = Math.floor(Math.random() * (20 - 10 + 1)) + 10; 

    function creerUnJeton() {
        const jeton = document.createElement('img');
        jeton.classList.add('jeton-poker-global'); 
        jeton.src = window.location.origin + `/images/${Math.random() < 0.5 ? 'jeton_rouge.jpg' : 'jeton_noir.jpg'}`;
        
        jeton.style.left = `${Math.random() * 95}vw`; 
        jeton.style.top = `-60px`; 
        
        const taille = Math.random() * (45 - 25) + 25;
        jeton.style.width = `${taille}px`;
        jeton.style.height = `${taille}px`; 
        
        const temps = 12000 + Math.random() * 6000; // Merci chatgpt pour m'avoir aider à modifier le temps de chute
        jeton.style.animation = `animationChuteGlobale ${temps}ms linear 0ms forwards`;
        
        // supr les derniers jetons et en recrée
        jeton.addEventListener('animationend', () => { 
            jeton.remove(); 
            creerUnJeton(); 
        });
        
        corpsPage.appendChild(jeton);
    }

    // Lancement initial décalé pour ne pas tout faire tomber d'un coup
    for (let i = 0; i < totalJetons; i++) { 
        setTimeout(creerUnJeton, i * 250); 
    }


    // Effet curseur
    let ancX = 0, ancY = 0;
    const symboles = ['♠️', '♥️', '♣️', '♦️'];

    document.addEventListener('mousemove', function(e) {
        // Minimum de 30 pixeels pour générer l'anim
        if (Math.hypot(e.clientX - ancX, e.clientY - ancY) > 30) {
            const trace = document.createElement('div');
            trace.classList.add('carte-souris-globale');
            trace.innerText = symboles[Math.floor(Math.random() * symboles.length)];
            
            trace.style.left = `${e.clientX}px`;
            trace.style.top = `${e.clientY}px`;
            
            // Randomise la direction des symboles
            trace.style.setProperty('--depX', `${(Math.random() - 0.5) * 100}px`);
            trace.style.setProperty('--depY', `${50 + Math.random() * 100}px`);
            trace.style.setProperty('--rotFin', `${(Math.random() - 0.5) * 360}deg`);
            
            trace.style.animation = 'flottementCarteGlobal 0.9s ease-out forwards';
            
            corpsPage.appendChild(trace);
            
            // Supr
            setTimeout(() => trace.remove(), 900);
            
            ancX = e.clientX; 
            ancY = e.clientY;
        }
    });
});