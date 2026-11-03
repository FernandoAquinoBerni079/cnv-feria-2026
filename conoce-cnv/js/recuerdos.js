// 4. MURO DE RECUERDOS (LOCALSTORAGE)
        // ==========================================
        function loadMemories() {
            const container = document.getElementById('memories-container');
            const saved = localStorage.getItem('cnv_memories');
            const memories = saved ? JSON.parse(saved) : [
                { author: "Exalumno Promoción 1995", text: "Inolvidables recuerdos de las Fiestas Patrias y el desfile sobre la calle General Díaz.", date: "14/05/2024" }
            ];

            container.innerHTML = '';
            memories.forEach(m => {
                const card = document.createElement('div');
                card.style.background = '#F8FAFC';
                card.style.border = '1px solid var(--cnv-border)';
                card.style.padding = '1rem';
                card.style.borderRadius = '8px';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--cnv-text-muted); margin-bottom: 0.25rem;">
                        <strong>${escapeHTML(m.author)}</strong>
                        <span>${m.date}</span>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--cnv-text-dark);">${escapeHTML(m.text)}</p>
                `;
                container.appendChild(card);
            });
        }

        function saveMemory(e) {
            e.preventDefault();
            const author = document.getElementById('mem-author').value.trim();
            const text = document.getElementById('mem-text').value.trim();

            if (!author || !text) return;

            const saved = localStorage.getItem('cnv_memories');
            const memories = saved ? JSON.parse(saved) : [];

            memories.unshift({
                author: author,
                text: text,
                date: new Date().toLocaleDateString()
            });

            localStorage.setItem('cnv_memories', JSON.stringify(memories));
            document.getElementById('memory-form').reset();
            loadMemories();
        }

        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }

        // ==========================================

document.addEventListener("DOMContentLoaded", () => { loadMemories(); });
