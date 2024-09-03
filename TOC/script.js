let states = ['q0', 'q1', 'q2'];

function generateStates() {
    const stateTransitions = document.getElementById('stateTransitions');
    stateTransitions.innerHTML = '';

    states.forEach((state) => {
        const div = document.createElement('div');
        div.classList.add('form-group');
        
        const label = document.createElement('label');
        label.textContent = `Transitions for ${state}`;
        div.appendChild(label);
        
        ['a', 'b'].forEach(symbol => {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `${symbol} -> State`;
            input.dataset.state = state;
            input.dataset.symbol = symbol;
            input.addEventListener('input', renderAutomatonDiagram);  // Attach event listener
            div.appendChild(input);
        });

        stateTransitions.appendChild(div);
    });

    renderAutomatonDiagram(); // Initial rendering
}

function renderAutomatonDiagram() {
    const transitions = {};
    document.querySelectorAll('#stateTransitions input').forEach(input => {
        const state = input.dataset.state;
        const symbol = input.dataset.symbol;
        const targetState = input.value || state;
        if (!transitions[state]) transitions[state] = {};
        transitions[state][symbol] = targetState;
    });

    const diagram = document.getElementById('automatonDiagram');
    diagram.innerHTML = `
        <svg width="400" height="200">
            <!-- State q0 -->
            <circle cx="50" cy="100" r="30" stroke="black" stroke-width="2" fill="white"/>
            <text x="42" y="105" font-size="20" fill="black">q0</text>

            <!-- State q1 -->
            <circle cx="200" cy="100" r="30" stroke="black" stroke-width="2" fill="white"/>
            <text x="192" y="105" font-size="20" fill="black">q1</text>

            <!-- State q2 (Accepting State) -->
            <circle cx="350" cy="100" r="30" stroke="black" stroke-width="2" fill="white"/>
            <circle cx="350" cy="100" r="25" stroke="black" stroke-width="2" fill="none"/>
            <text x="342" y="105" font-size="20" fill="black">q2</text>

            <!-- Transitions -->
            <!-- q0 to q1 -->
            <line x1="80" y1="100" x2="170" y2="100" stroke="black" stroke-width="2"/>
            <polygon points="170,95 170,105 160,100" fill="black"/>
            <text x="125" y="90" font-size="15" fill="green">${transitions['q0']['a'] || 'q1'}</text>

            <!-- q1 to q2 -->
            <line x1="230" y1="100" x2="320" y2="100" stroke="black" stroke-width="2"/>
            <polygon points="320,95 320,105 310,100" fill="black"/>
            <text x="275" y="90" font-size="15" fill="green">${transitions['q1']['a'] || 'q2'}</text>

            <!-- q1 to q0 -->
            <path d="M 200,70 Q 125,0 50,70" fill="none" stroke="black" stroke-width="2"/>
            <polygon points="56,70 50,70 53,62" fill="black"/>
            <text x="125" y="40" font-size="15" fill="green">${transitions['q1']['b'] || 'q0'}</text>

            <!-- q2 to q0 -->
            <path d="M 350,70 Q 275,0 200,70" fill="none" stroke="black" stroke-width="2"/>
            <polygon points="206,70 200,70 203,62" fill="black"/>
            <text x="275" y="40" font-size="15" fill="green">${transitions['q2']['b'] || 'q0'}</text>
        </svg>
    `;
}

function checkAutomaton() {
    const inputString = document.getElementById('inputString').value;
    let currentState = 'q0';
    
    const transitions = {};
    document.querySelectorAll('#stateTransitions input').forEach(input => {
        const state = input.dataset.state;
        const symbol = input.dataset.symbol;
        const targetState = input.value || state;
        if (!transitions[state]) transitions[state] = {};
        transitions[state][symbol] = targetState;
    });
    
    for (let char of inputString) {
        if (char !== 'a' && char !== 'b') {
            document.getElementById('result').textContent = 'Invalid input string!';
            return;
        }
        currentState = transitions[currentState][char];
    }

    document.getElementById('result').textContent = currentState === 'q2' ? 'String accepted!' : 'String not accepted!';
}

document.getElementById('numStates').addEventListener('input', () => {
    const numStates = parseInt(document.getElementById('numStates').value);
    states = Array.from({length: numStates}, (_, i) => `q${i}`);
    generateStates();
});

generateStates(); // Initializes the states and transitions
