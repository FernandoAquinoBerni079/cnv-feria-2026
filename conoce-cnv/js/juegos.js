// 2. JUEGO 1: TRIVIA HISTÓRICA (10 PREGUNTAS ALEATORIAS)
        // ==========================================
        const quizDatabase = [
            {
                q: "¿En qué fecha exacta fue fundado el Colegio Nacional de Villarrica?",
                options: ["14 de mayo de 1970", "15 de agosto de 1989", "12 de junio de 1935", "14 de mayo de 1811"],
                answer: 0,
                exp: "Fue fundado el 14 de mayo de 1970 en coincidencia con el 400.º aniversario de Villarrica del Espíritu Santo."
            },
            {
                q: "¿Quién fue el profesor reconocido como primer director e impulsor principal de la institución?",
                options: ["Prof. Ramón Indalecio Cardozo", "Prof. Pedro Rubén 'Pibe' Cáceres", "Manuel Ortiz Guerrero", "Efraím Cardozo"],
                answer: 1,
                exp: "El Prof. Pedro Rubén Cáceres ('Pibe') fue el gestor pedagógico y director fundador en 1970."
            },
            {
                q: "¿Cuál fue el nombre inicial que llevó el colegio durante sus primeros años (1970-1988)?",
                options: ["Colegio Nacional del Guairá", "Colegio Nacional Gral. Alfredo Stroessner", "Colegio Atanasio Riera", "Colegio Espíritu Santo"],
                answer: 1,
                exp: "Llevó el nombre de Colegio Nacional 'Gral. Alfredo Stroessner' hasta la transición democrática de 1989."
            },
            {
                q: "¿En qué año se oficializó el cambio de denominación a 'Colegio Nacional de Villarrica'?",
                options: ["Año 1989", "Año 1975", "Año 2000", "Año 2020"],
                answer: 0,
                exp: "En 1989, tras la instauración de la democracia en Paraguay, se adoptó formalmente su nombre actual."
            },
            {
                q: "¿Qué gran hito comunitario celebró el colegio en el año 2020?",
                options: ["Sus Bodas de Plata (25 años)", "Sus Bodas de Oro (50 años)", "Sus Bodas de Diamante (75 años)", "Su primer año"],
                answer: 1,
                exp: "El 14 de mayo de 2020 el colegio conmemoró 50 años de trayectoria educativa en el Guairá."
            },
            {
                q: "¿Quién fue la primera Directora del Colegio Nacional de Villarrica?",
                options: ["Lic. Deicy Verdecchia", "Lic. Asunción Buscio de Cáceres", "Ángel Roa", "Ramón Indalecio Cardozo"],
                answer: 1,
                exp: "Asunción Buscio de Cáceres figura en la historia recopilada por el grupo como primera directora del colegio."
            },
            {
                q: "¿Qué especialidad técnica del colegio desarrolló este portal educativo?",
                options: ["Bachillerato Técnico en Contabilidad", "Bachillerato Técnico en Informática (BTI)", "Bachillerato en Salud", "Mecánica Automotriz"],
                answer: 1,
                exp: "El portal 'Conoce CNV' fue desarrollado por los alumnos del 1.º Curso del BTI para la Feria de Informática 2026."
            },
            {
                q: "¿Cuáles son los colores representativos de la identidad del colegio?",
                options: ["Rojo y Blanco", "Verde y Dorado", "Azul y Blanco", "Negro y Amarillo"],
                answer: 2,
                exp: "El Azul y Blanco son los colores oficiales que simbolizan serenidad, lealtad y transparencia."
            },
            {
                q: "¿Qué acontecimiento histórico local motivó la elección de la fecha de fundación en 1970?",
                options: ["El Cuatricentenario de la fundación de Villarrica", "La Guerra del Chaco", "La inauguración de la plaza central", "Un congreso educativo"],
                answer: 0,
                exp: "Se hizo coincidir con los 400 años de Villarrica del Espíritu Santo (1570-1970)."
            },
            {
                q: "¿Cuál es el propósito principal de este proyecto estudiantil 'Conoce CNV'?",
                options: ["Sustituir la web del gobierno", "Revalorizar la historia e identidad escolar con rigor técnico e histórico", "Vender productos", "Crear una red social"],
                answer: 1,
                exp: "Es un proyecto pedagógico del BTI enfocado en la investigación histórica y el desarrollo web."
            }
        ];

        let currentQuizData = [];
        let currentQuestionIdx = 0;
        let quizScore = 0;

        function shuffleArray(arr) {
            return arr.sort(() => Math.random() - 0.5);
        }

        function initQuiz() {
            currentQuizData = shuffleArray([...quizDatabase]);
            currentQuestionIdx = 0;
            quizScore = 0;
            document.getElementById('quiz-score').innerText = quizScore;
            document.getElementById('quiz-body').style.display = 'block';
            document.getElementById('quiz-results').style.display = 'none';
            showQuestion();
        }

        function showQuestion() {
            const qData = currentQuizData[currentQuestionIdx];
            document.getElementById('quiz-question-text').innerText = `${currentQuestionIdx + 1}. ${qData.q}`;
            
            const optionsContainer = document.getElementById('quiz-options-container');
            optionsContainer.innerHTML = '';

            const explanationBox = document.getElementById('quiz-explanation');
            explanationBox.style.display = 'none';
            document.getElementById('quiz-next-btn').style.display = 'none';

            qData.options.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.innerText = optText;
                btn.onclick = () => selectOption(idx);
                optionsContainer.appendChild(btn);
            });
        }

        function selectOption(selectedIdx) {
            const qData = currentQuizData[currentQuestionIdx];
            const options = document.querySelectorAll('.quiz-option');
            
            options.forEach(btn => btn.disabled = true);

            const explanationBox = document.getElementById('quiz-explanation');
            explanationBox.style.display = 'block';

            if (selectedIdx === qData.answer) {
                options[selectedIdx].classList.add('correct');
                explanationBox.style.background = '#D1FAE5';
                explanationBox.style.color = '#065F46';
                explanationBox.innerHTML = `<strong>¡Correcto!</strong> ${qData.exp}`;
                quizScore++;
                document.getElementById('quiz-score').innerText = quizScore;
            } else {
                options[selectedIdx].classList.add('incorrect');
                options[qData.answer].classList.add('correct');
                explanationBox.style.background = '#FEE2E2';
                explanationBox.style.color = '#991B1B';
                explanationBox.innerHTML = `<strong>Incorrecto.</strong> ${qData.exp}`;
            }

            document.getElementById('quiz-next-btn').style.display = 'inline-flex';
        }

        function nextQuestion() {
            currentQuestionIdx++;
            if (currentQuestionIdx < currentQuizData.length) {
                showQuestion();
            } else {
                showQuizResults();
            }
        }

        function showQuizResults() {
            document.getElementById('quiz-body').style.display = 'none';
            document.getElementById('quiz-results').style.display = 'block';
            document.getElementById('final-score').innerText = quizScore;

            const feedback = document.getElementById('quiz-feedback-text');
            if (quizScore >= 8) {
                feedback.innerText = "¡Excelente conocimiento sobre la historia institucional del CNV!";
            } else if (quizScore >= 5) {
                feedback.innerText = "Buen intento. Te invitamos a repasar las secciones de Historia y Línea de Tiempo.";
            } else {
                feedback.innerText = "Sigue explorando el sitio para conocer más sobre la trayectoria del colegio.";
            }
        }

        // ==========================================
        // 3. JUEGO 2: ORDENAR LÍNEA DE TIEMPO
        // ==========================================
        const timelineEvents = [
            { id: 1, year: 1970, text: "Fundación e Inauguración oficial del colegio (14 de Mayo)." },
            { id: 2, year: 1980, text: "Consolidación de las primeras promociones de Bachilleres." },
            { id: 3, year: 1989, text: "Redenominación oficial a 'Colegio Nacional de Villarrica'." },
            { id: 4, year: 2020, text: "Celebración de las Bodas de Oro (50.º Aniversario)." },
            { id: 5, year: 2026, text: "Presentación del proyecto 'Conoce CNV' en la Feria de Informática." }
        ];

        let currentTimelineOrder = [];

        function initTimelineGame() {
            currentTimelineOrder = shuffleArray([...timelineEvents]);
            renderTimelineGame();
            document.getElementById('timeline-feedback').style.display = 'none';
        }

        function renderTimelineGame() {
            const listContainer = document.getElementById('reorder-list');
            listContainer.innerHTML = '';

            currentTimelineOrder.forEach((evt, idx) => {
                const item = document.createElement('div');
                item.className = 'reorder-item';
                item.innerHTML = `
                    <span style="font-size: 0.9rem; font-weight: 600;">${evt.text}</span>
                    <div class="reorder-actions">
                        <button class="reorder-btn" onclick="moveTimelineItem(${idx}, -1)" aria-label="Mover arriba" ${idx === 0 ? 'disabled' : ''}><span aria-hidden="true">↑</span></button>
                        <button class="reorder-btn" onclick="moveTimelineItem(${idx}, 1)" aria-label="Mover abajo" ${idx === currentTimelineOrder.length - 1 ? 'disabled' : ''}><span aria-hidden="true">↓</span></button>
                    </div>
                `;
                listContainer.appendChild(item);
            });
        }

        function moveTimelineItem(idx, direction) {
            const newIdx = idx + direction;
            if (newIdx >= 0 && newIdx < currentTimelineOrder.length) {
                const temp = currentTimelineOrder[idx];
                currentTimelineOrder[idx] = currentTimelineOrder[newIdx];
                currentTimelineOrder[newIdx] = temp;
                renderTimelineGame();
            }
        }

        function checkTimelineOrder() {
            let isCorrect = true;
            for (let i = 0; i < currentTimelineOrder.length - 1; i++) {
                if (currentTimelineOrder[i].year > currentTimelineOrder[i + 1].year) {
                    isCorrect = false;
                    break;
                }
            }

            const feedback = document.getElementById('timeline-feedback');
            feedback.style.display = 'block';

            if (isCorrect) {
                feedback.style.background = '#D1FAE5';
                feedback.style.color = '#065F46';
                feedback.innerHTML = '<strong>¡Perfecto!</strong> Has ordenado cronológicamente todos los hitos históricos correctamente.';
            } else {
                feedback.style.background = '#FEE2E2';
                feedback.style.color = '#991B1B';
                feedback.innerHTML = '<strong>El orden no es correcto aún.</strong> Revisa las fechas e intenta ajustar la secuencia.';
            }
        }

        // ==========================================

document.addEventListener("DOMContentLoaded", () => { initQuiz(); initTimelineGame(); });
